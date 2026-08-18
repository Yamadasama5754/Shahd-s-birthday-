const introScreen = document.querySelector('.intro-screen');
const progressBar = document.getElementById('progressBar');
const loadingPercent = document.getElementById('loadingPercent');
const loadingStatus = document.getElementById('loadingStatus');
const loadingButton = document.getElementById('loadingButton');
const loadingButtonText = document.getElementById('loadingButtonText');
const language = localStorage.getItem('bday_lang') === 'en' ? 'en' : 'ar';
let hasEnteredSite = false;
let progress = 0;

const copy = {
    ar: {
        kicker: 'لحظة جميلة',
        title: 'نجهّز لك المفاجأة',
        subtitle: 'ثوانٍ قليلة ونبدأ أجمل لحظات عيد الميلاد',
        status: 'جاري تجهيز المفاجأة...',
        ready: 'المفاجأة جاهزة!',
        wait: 'انتظري قليلًا',
        enter: 'اضغطي للدخول'
    },
    en: {
        kicker: 'A beautiful moment',
        title: 'Preparing your surprise',
        subtitle: 'Just a few seconds until the birthday magic begins',
        status: 'Getting everything ready...',
        ready: 'The surprise is ready!',
        wait: 'Just a moment',
        enter: 'Click to enter'
    }
}[language];

document.documentElement.lang = language;
document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
document.getElementById('loaderKicker').textContent = copy.kicker;
document.getElementById('loaderTitle').textContent = copy.title;
document.getElementById('loaderSubtitle').textContent = copy.subtitle;
loadingStatus.textContent = copy.status;
loadingButtonText.textContent = copy.wait;

function enterSite() {
    if (hasEnteredSite) return;
    hasEnteredSite = true;
    introScreen.classList.add('is-ending');
    setTimeout(() => {
        if (window.spaNavigate) { window.spaNavigate('countdown'); }
        else { window.location.replace('countdown.html'); }
    }, 420);
}

loadingButton.addEventListener('click', enterSite);

const startTime = performance.now();
const loadingDuration = 3000;

function animateLoader(now) {
    const elapsed = now - startTime;
    progress = Math.min(100, Math.round((elapsed / loadingDuration) * 100));
    progressBar.style.width = `${progress}%`;
    loadingPercent.textContent = `${progress}%`;

    if (progress < 100) {
        requestAnimationFrame(animateLoader);
        return;
    }

    loadingStatus.textContent = copy.ready;
    loadingButton.disabled = false;
    loadingButton.classList.add('is-ready');
    loadingButtonText.textContent = copy.enter;
    setTimeout(enterSite, 650);
}

requestAnimationFrame(animateLoader);