(function () {
    const translations = {
        ar: {
            countdown: {
                pageTitle: 'عيد ميلاد سعيد',
                countdownTitle: 'العد التنازلي لعيد الميلاد',
                days: 'أيام',
                hours: 'ساعات',
                minutes: 'دقائق',
                seconds: 'ثواني',
                birthdayTitle: 'عيد ميلاد سعيد يا شهد 💗',
                nickname: 'لأجمل بنت في حياتي 💕',
                from: '- من شخص يحبك 💖',
                cta: 'اضغطي للدخول 💕',
                musicTitle: 'تشغيل أو إيقاف الموسيقى'
            },
            wishes: {
                pageTitle: 'أمنياتي لك 💖',
                backTitle: 'عودة',
                heading: 'كل عام وأنتِ بخير يا شهد 💖',
                shuffle: 'اضغطي هنا... 💕',
                ending: 'أنتِ الأفضل! 💖',
                counter: 'السبب {current} من {total}',
                continue: 'المتابعة إلى خطنا الزمني 💫',
                reasons: [
                    'لأنك تعرفين دائمًا كيف ترسمين الابتسامة على وجهي! 💖',
                    'لأنك أفضل من يستمع إليّ! 🌸',
                    'لأن ضحكتك معدية! ✨',
                    'لأنك تجعلين كل لحظة مميزة! 🎂',
                    'لأنك ببساطة رائعة! أتمنى لك عامًا جميلًا آخر! 🎉'
                ]
            },
            timeline: {
                pageTitle: 'رحلتنا معًا 💫',
                backTitle: 'عودة',
                subtitle: 'من أول نظرة إلى قلبي كله لكِ',
                dates: ['1 يناير 2023', '15 مارس 2023', '20 يونيو 2023', 'طوال الرحلة', '25 يناير 2025'],
                titles: ['أول لقاء', 'صرتِ حبيبتي', 'أول مغامرة', 'أيام جميلة وصعبة', 'عيد ميلادك!'],
                descriptions: [
                    'يوم التقينا لأول مرة! لم نكن نعرف أن هذه ستكون بداية أجمل قصة حب.',
                    'بدأ حبنا يكبر ويصبح أعمق، وبدأنا نقضي وقتًا أطول معًا يا شهودتي.',
                    'أول مغامرة لنا معًا! تجربة لا تُنسى جعلتنا أقرب.',
                    'مررنا بأيام جميلة وصعبة، لكننا كنا نجد طريقنا دائمًا لبعض. هذا هو الحب الحقيقي!',
                    'وها نحن نحتفل بكِ يا شهودتي! عام جديد من حبنا الجميل... 💖'
                ],
                receiptTitle: '🧾 إيصال الحب',
                receiptSubtitle: 'قلبي لكِ يا شهودتي',
                receiptLabels: ['سنوات الحب:', 'أول لقاء:', 'مغامراتنا معًا:', 'الضحكات المشتركة:', 'النكات الخاصة:', 'الذكريات التي صنعناها:'],
                receiptValues: ['أكثر من عامين', '1 يناير 2023', 'كثيرة 📍', 'لا تُحصى 😄', 'كثيرة جدًا!', '∞ لا تنتهي'],
                receiptTotal: 'قيمة حبنا: لا تُقدّر بثمن 💖',
                receiptFooter: 'شكرًا لأنكِ حبيبتي الرائعة يا شهودتي!<br>- من محبك 💖',
                next: 'شاهدِي ذكرياتنا 📸'
            },
            memories: {
                pageTitle: 'ذكرياتنا ✨',
                backTitle: 'عودة',
                heading: 'لحظاتنا الخاصة',
                intro: 'هناك لحظات تستحق أن تبقى في القلب. لكل الضحكات والأحاديث والأوقات التي لا تُنسى والتي عشناها معًا...',
                dates: ['يوم مميز', 'لحظات جميلة', 'أجواء عيد الميلاد'],
                captions: [
                    'أجمل الذكريات تُصنع مع أجمل الأشخاص. ممتن لكل لحظة نشاركها! 💫',
                    'تنشرين الإيجابية أينما ذهبتِ. استمري في التألق! ✨',
                    'عام آخر نحتفل فيه بكِ! أتمنى أن يكون عيد ميلادك أكثر تميزًا! 🎂💖'
                ],
                finalHeading: 'كل عام وأنتِ بخير يا شهد! 🎂',
                finalParagraphOne: 'من أول لقاء لنا إلى أن أصبحنا لا نفترق — يا لها من رحلة! 💫<br>في كل لحظة وكل ضحكة وكل ذكرى، كنتِ رائعة.<br>إلى عام جديد من صداقتنا الجميلة! 🎉',
                finalParagraphTwo: 'تستحقين كل السعادة في العالم. استمري في أن تكوني أنتِ! ✨',
                signature: '- مع كل الحب، من محبك 💖',
                celebrate: 'احتفلي معنا! 🎊',
                share: 'شاركِي هذا الرابط 💌'
            }
        },
        en: {
            countdown: {
                pageTitle: 'Happy Birthday',
                countdownTitle: 'Birthday Countdown',
                days: 'Days',
                hours: 'Hours',
                minutes: 'Minutes',
                seconds: 'Seconds',
                birthdayTitle: 'Happy Birthday, Shahd 💗',
                nickname: 'To the most beautiful girl in my life 💕',
                from: '- From someone who loves you 💖',
                cta: 'Click to enter 💕',
                musicTitle: 'Toggle music'
            },
            wishes: {
                pageTitle: 'Birthday Wishes 💖',
                backTitle: 'Go back',
                heading: 'Happy Birthday, Shahd 💖',
                shuffle: 'Click here... 💕',
                ending: "You're the BEST! 💖",
                counter: 'Reason {current} of {total}',
                continue: 'Continue to our timeline 💫',
                reasons: [
                    'Because you always know how to make me smile! 💖',
                    "Because you're the best listener I know! 🌸",
                    'Because your laugh is contagious! ✨',
                    'Because you make every moment special! 🎂',
                    "Because you're simply amazing! Here's to another wonderful year! 🎉"
                ]
            },
            timeline: {
                pageTitle: 'Our Journey Together 💫',
                backTitle: 'Go back',
                subtitle: 'From Strangers to My Whole Heart',
                dates: ['January 1, 2023', 'March 15, 2023', 'June 20, 2023', 'Through the Journey', 'January 25, 2025'],
                titles: ['First Meeting', 'You Became My Love', 'First Adventure', 'Ups and Downs', 'Your Birthday!'],
                descriptions: [
                    'The day we first met! Little did we know this would be the start of our love story.',
                    'Our love started feeling more real! We began spending more time together.',
                    'Our first adventure together! An unforgettable experience that brought us closer.',
                    "We've had our moments, but we always found our way back to each other. That's what real love is about!",
                    'And here we are, celebrating YOU! Another year of our beautiful love... 💖'
                ],
                receiptTitle: '🧾 LOVE RECEIPT',
                receiptSubtitle: 'My Heart, Yours Forever',
                receiptLabels: ['Years of Love:', 'First Meeting:', 'Adventures Together:', 'Laughs Shared:', 'Inside Jokes:', 'Memories Made:'],
                receiptValues: ['2+ years', 'Jan 1, 2023', 'Many 📍', 'Countless 😄', 'Too many!', '∞ Infinite'],
                receiptTotal: 'TOTAL LOVE VALUE: PRICELESS 💖',
                receiptFooter: 'Thank you for being my amazing love!<br>- From someone who loves you 💖',
                next: 'View Our Memories 📸'
            },
            memories: {
                pageTitle: 'Our Memories ✨',
                backTitle: 'Go back',
                heading: 'Our Special Moments',
                intro: "Some moments are just meant to be treasured. Here's to all the laughs, talks, and unforgettable times we've shared...",
                dates: ['A Special Day', 'Beautiful Moments', 'Birthday Vibes'],
                captions: [
                    'The best memories are made with the best people. So grateful for every moment we share! 💫',
                    'You radiate positivity wherever you go. Keep shining bright! ✨',
                    "Another year of celebrating you! Here's to making this birthday even more special! 🎂💖"
                ],
                finalHeading: 'Happy Birthday, Shahd! 🎂',
                finalParagraphOne: 'From our first meeting to becoming inseparable — what a journey! 💫<br>Through every moment, every laugh, every memory — you have been amazing.<br>Here’s to another year of our wonderful friendship! 🎉',
                finalParagraphTwo: 'You deserve all the happiness in the world. Keep being YOU! ✨',
                signature: '- With love, from someone who loves you 💖',
                celebrate: 'Celebrate with us! 🎊',
                share: 'Share this link 💌'
            }
        }
    };

    const lang = localStorage.getItem('bday_lang') === 'en' ? 'en' : 'ar';
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    const page = document.body.dataset.page;
    const current = translations[lang];

    window.siteLang = lang;
    window.siteTranslations = current;
    window.siteText = function (key) {
        return key.split('.').reduce((value, part) => value && value[part], current) || '';
    };

    document.documentElement.lang = lang;
    document.documentElement.dir = direction;

    if (page && current[page]) {
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n;
            const value = window.siteText(`${page}.${key}`);
            if (value) element.innerHTML = value;
        });

        document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
            const [attribute, key] = element.dataset.i18nAttr.split(':');
            const value = window.siteText(`${page}.${key}`);
            if (value) element.setAttribute(attribute, value);
        });
    }
})();