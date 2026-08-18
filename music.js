(function () {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;

    const savedVolume = Number.parseFloat(localStorage.getItem('bday_volume'));
    const savedTime = Number.parseFloat(localStorage.getItem('musicCurrentTime'));
    const shouldPlay = localStorage.getItem('musicPlaying') === 'true';
    const toggle = document.getElementById('musicToggle');
    const icon = toggle ? toggle.querySelector('.music-icon') : null;

    audio.volume = Number.isFinite(savedVolume) ? savedVolume : 0.6;

    function restorePosition() {
        if (Number.isFinite(savedTime) && audio.duration && savedTime < audio.duration) {
            audio.currentTime = savedTime;
        }
    }

    function updateToggle() {
        if (!toggle) return;
        const isPlaying = !audio.paused;
        toggle.classList.toggle('playing', isPlaying);
        if (icon) icon.textContent = isPlaying ? '🎵' : '🔇';
    }

    function savePlayback() {
        if (Number.isFinite(audio.currentTime)) {
            localStorage.setItem('musicCurrentTime', String(audio.currentTime));
        }
    }

    function resumeMusic() {
        if (!shouldPlay) return;
        audio.play()
            .then(updateToggle)
            .catch(updateToggle);
    }

    audio.addEventListener('loadedmetadata', restorePosition, { once: true });
    audio.addEventListener('timeupdate', savePlayback);
    audio.addEventListener('play', updateToggle);
    audio.addEventListener('pause', updateToggle);
    window.addEventListener('pagehide', savePlayback);
    setInterval(savePlayback, 1000);

    if (toggle) {
        toggle.addEventListener('click', () => {
            if (audio.paused) {
                audio.play()
                    .then(() => {
                        localStorage.setItem('musicPlaying', 'true');
                        updateToggle();
                    })
                    .catch(updateToggle);
            } else {
                audio.pause();
                localStorage.setItem('musicPlaying', 'false');
                updateToggle();
            }
        });
    }

    if (shouldPlay) {
        resumeMusic();
        document.addEventListener('pointerdown', resumeMusic, { once: true });
        document.addEventListener('keydown', resumeMusic, { once: true });
    }

    updateToggle();
})();