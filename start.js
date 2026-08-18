document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bgMusic');
    const muteToggle = document.getElementById('muteToggle');
    const volumeSlider = document.getElementById('volumeSlider');

    // ===== Load saved settings =====
    const savedVolume = localStorage.getItem('bday_volume');
    const savedMuted = localStorage.getItem('bday_muted') === 'true';
    const savedLang = localStorage.getItem('bday_lang') || 'ar';

    music.volume = savedVolume !== null ? parseFloat(savedVolume) : 0.6;
    music.muted = savedMuted;
    volumeSlider.value = music.volume;

    const muteIcon = document.getElementById('muteIcon');
    function refreshMuteUI() {
        muteToggle.classList.toggle('is-muted', music.muted);
        muteToggle.setAttribute('aria-pressed', String(music.muted));
        muteIcon.textContent = music.muted ? '🔇' : '🔊';
    }
    refreshMuteUI();

    // Try to autoplay music (may be blocked until first interaction)
    const tryPlay = () => {
        music.play().then(() => {
            localStorage.setItem('musicPlaying', 'true');
        }).catch(() => {});
        document.removeEventListener('click', tryPlay);
    };
    document.addEventListener('click', tryPlay);

    // ===== Mute / Volume =====
    muteToggle.addEventListener('click', () => {
        music.muted = !music.muted;
        localStorage.setItem('bday_muted', music.muted);
        refreshMuteUI();
    });

    volumeSlider.addEventListener('input', () => {
        music.volume = parseFloat(volumeSlider.value);
        localStorage.setItem('bday_volume', volumeSlider.value);
    });

    // ===== Overlays open/close =====
    function openOverlay(id) {
        document.getElementById(id).classList.add('active');
    }
    function closeOverlay(id) {
        document.getElementById(id).classList.remove('active');
    }

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => closeOverlay(btn.dataset.close));
    });

    // ===== Buttons =====
    document.getElementById('btnStart').addEventListener('click', () => {
        if (window.spaNavigate) {
            window.spaNavigate('intro');
        } else {
            window.location.href = 'intro.html';
        }
    });

    document.getElementById('btnDesigns').addEventListener('click', () => openOverlay('designsOverlay'));
    document.getElementById('btnOpenDesigns2').addEventListener('click', () => {
        closeOverlay('settingsOverlay');
        openOverlay('designsOverlay');
    });

    document.getElementById('btnBirthday').addEventListener('click', () => openOverlay('birthdayOverlay'));

    document.getElementById('btnSettings').addEventListener('click', () => openOverlay('settingsOverlay'));

    document.getElementById('btnShare').addEventListener('click', async () => {
        const shareData = {
            title: 'عيد ميلاد شهد 💜',
            text: 'شوفي هذا اللي سويته لك 💜',
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                showToast();
            }
        } catch (e) {
            try {
                await navigator.clipboard.writeText(shareData.url);
                showToast();
            } catch (err) {}
        }
    });

    // "Exit" never actually closes or navigates away — it only shows the
    // goodbye image popup, per the important rule: never lose any page/feature.
    document.getElementById('btnExit').addEventListener('click', () => {
        document.getElementById('exitModal').classList.add('active');
    });

    document.getElementById('exitModal').addEventListener('click', (e) => {
        if (e.target.id === 'exitModal') {
            document.getElementById('exitModal').classList.remove('active');
        }
    });

    function showToast() {
        const toast = document.getElementById('shareToast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
    }

    // ===== Language switch =====
    const texts = {
        ar: {
            title: 'شهد',
            settingsTitle: 'الإعدادات',
            mute: 'كتم الصوت',
            volume: 'حجم الصوت',
            lang: 'اللغة / Language',
            designs: '🎨 عرض التصاميم',
            galleryTitle: 'تصاميمي لك 💜',
            dir: 'rtl'
        },
        en: {
            title: 'Shahd',
            settingsTitle: 'Settings',
            mute: 'Mute',
            volume: 'Volume',
            lang: 'اللغة / Language',
            designs: '🎨 Show Designs',
            galleryTitle: 'My designs for you 💜',
            dir: 'ltr'
        }
    };

    function applyLang(lang) {
        const t = texts[lang];
        document.documentElement.lang = lang;
        document.documentElement.dir = t.dir;
        document.getElementById('settingsTitle').textContent = t.settingsTitle;
        document.getElementById('lblMute').textContent = t.mute;
        document.getElementById('lblVolume').textContent = t.volume;
        document.getElementById('lblLang').textContent = t.lang;
        document.getElementById('lblDesigns').textContent = t.designs;
        document.querySelector('#designsOverlay .overlay-title').textContent = t.galleryTitle;

        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === lang);
        });
        localStorage.setItem('bday_lang', lang);
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });

    applyLang(savedLang);
});
