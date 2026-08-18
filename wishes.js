// ===== CUSTOMIZE: Add your reasons here! =====
// Each reason has:
// - text: The message to display
// - emoji: An emoji shown before the text
// - gif: Animation file to show (optional, use animation-1.gif or animation-2.gif)
const reasons = [
    {
        text: {
            ar: "لأنك تعرفين دائمًا كيف ترسمين الابتسامة على وجهي! 💖",
            en: "Because you always know how to make me smile! 💖"
        },
        emoji: "✨",
        gif: "gif1.gif"
    },
    {
        text: {
            ar: "لأنك أفضل من يستمع إليّ! 🌸",
            en: "Because you're the best listener I know! 🌸"
        },
        emoji: "💫",
        gif: "gif2.gif"
    },
    {
        text: {
            ar: "لأن ضحكتك معدية! ✨",
            en: "Because your laugh is contagious! ✨"
        },
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: {
            ar: "لأنك تجعلين كل لحظة مميزة! 🎂",
            en: "Because you make every moment special! 🎂"
        },
        emoji: "💖",
        gif: "gif2.gif"
    },
    {
        text: {
            ar: "لأنك ببساطة رائعة! أتمنى لك عامًا جميلًا آخر! 🎉",
            en: "Because you're simply amazing! Here's to another wonderful year! 🎉"
        },
        emoji: "🎊",
        gif: "gif1.gif"
    }
    // Add more reasons as needed!
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    const currentLanguage = localStorage.getItem('bday_lang') === 'en' ? 'en' : 'ar';
    text.textContent = `${reason.emoji} ${reason.text[currentLanguage]}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Celebration">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        // Update counter
        reasonCounter.textContent = window.siteText('wishes.counter')
            .replace('{current}', currentReasonIndex + 1)
            .replace('{total}', reasons.length);

        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    // CUSTOMIZE: Change button text
                    shuffleButton.textContent = window.siteText('wishes.continue');
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('#app', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                if (window.spaNavigate) { window.spaNavigate('timeline'); } else { window.location.href = 'timeline.html'; }
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        if (window.spaNavigate) { window.spaNavigate("timeline"); } else { window.location.href = "timeline.html"; }
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);
