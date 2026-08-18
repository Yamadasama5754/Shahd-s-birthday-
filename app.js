/*
 * Single-page router.
 * Keeps the whole site as ONE page (no real navigation / no page reloads),
 * so it never feels like the site is "hanging" between sections, and the
 * background music never restarts. Every original page/feature is kept —
 * this only changes HOW they're loaded, not what they contain.
 */
(function () {
    'use strict';

    const GLOBAL_CSS = new Set(['responsive.css']); // shared on every page, load once
    const loadedAssets = new Set(['start.css', 'app.js', 'start.js', 'music.js']);
    let currentPageAssets = []; // <link>/<style> tags belonging to the current page

    function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

    // ===== Track intervals started by a page's script so we can stop them
    // when the user moves on (otherwise old countdown/floating-emoji timers
    // from a previous section would keep running forever in the background).
    const realSetInterval = window.setInterval.bind(window);
    window.__pageIntervals = [];
    window.setInterval = function (fn, delay, ...rest) {
        const id = realSetInterval(fn, delay, ...rest);
        window.__pageIntervals.push(id);
        return id;
    };
    function clearPageIntervals() {
        window.__pageIntervals.forEach((id) => clearInterval(id));
        window.__pageIntervals = [];
    }

    function ensureGlobalScript(src) {
        if (loadedAssets.has(src)) return Promise.resolve();
        loadedAssets.add(src);
        return new Promise((resolve) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = resolve;
            document.head.appendChild(s);
        });
    }

    function runScript(code) {
        try {
            // Wrapped so each page's own `const`/`let`/`class` never collide
            // with a previous visit to the same page.
            (new Function(code))();
        } catch (e) {
            console.error('Page script error:', e);
        }
    }

    async function spaNavigate(page) {
        const app = document.getElementById('app');
        if (!app) { window.location.href = page + '.html'; return; }

        clearPageIntervals();
        app.style.opacity = '';
        app.classList.add('fade-out');
        await wait(220);

        let html;
        try {
            const res = await fetch(page + '.html', { cache: 'no-cache' });
            html = await res.text();
        } catch (e) {
            app.classList.remove('fade-out');
            return;
        }

        const doc = new DOMParser().parseFromString(html, 'text/html');

        // ----- swap out the previous page's own CSS -----
        currentPageAssets.forEach((el) => el.remove());
        currentPageAssets = [];

        doc.head.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
            if (node.tagName === 'LINK') {
                const href = node.getAttribute('href');
                if (GLOBAL_CSS.has(href) || loadedAssets.has(href)) {
                    if (!loadedAssets.has(href)) {
                        loadedAssets.add(href);
                        const l = document.createElement('link');
                        l.rel = 'stylesheet';
                        l.href = href;
                        document.head.appendChild(l);
                    }
                    return;
                }
                const l = document.createElement('link');
                l.rel = 'stylesheet';
                l.href = href;
                document.head.appendChild(l);
                currentPageAssets.push(l);
            } else {
                const st = document.createElement('style');
                st.textContent = node.textContent;
                document.head.appendChild(st);
                currentPageAssets.push(st);
            }
        });

        // ----- make sure shared head scripts (e.g. GSAP) are loaded once -----
        const headScripts = Array.from(doc.head.querySelectorAll('script[src]'));
        for (const s of headScripts) {
            await ensureGlobalScript(s.getAttribute('src'));
        }

        // ----- prepare the body: drop the page's own <audio>, the shell owns one persistent player -----
        const bodyEl = doc.body;
        const oldAudio = bodyEl.querySelector('#bgMusic');
        if (oldAudio) oldAudio.remove();

        const bodyScripts = Array.from(bodyEl.querySelectorAll('script'));
        bodyScripts.forEach((s) => s.remove());

        document.body.dataset.page = page;
        app.innerHTML = bodyEl.innerHTML;

        // ----- run this page's scripts, in original order -----
        for (const s of bodyScripts) {
            const src = s.getAttribute('src');
            if (src) {
                if (/^https?:\/\//.test(src)) {
                    await ensureGlobalScript(src);
                } else {
                    try {
                        const res = await fetch(src, { cache: 'no-cache' });
                        runScript(await res.text());
                    } catch (e) { /* ignore */ }
                }
            } else {
                runScript(s.textContent);
            }
        }

        app.style.opacity = '';
        app.classList.remove('fade-out');
        window.scrollTo(0, 0);
    }

    window.spaNavigate = spaNavigate;

    // Intercept the "back" links inside routed pages so they stay in the SPA
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a.back-btn');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        spaNavigate(href.replace(/\.html$/i, ''));
    });
})();
