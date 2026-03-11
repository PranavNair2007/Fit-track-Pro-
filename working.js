document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('#mobileMenu');
    const navLinks = document.querySelector('#navLinks');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    const stepInput = document.querySelector('#stepInput');
    const updateBtn = document.querySelector('#updateSteps');
    const stepDisplay = document.querySelector('#stepCountDisplay');
    const resetBtn = document.querySelector('#resetSteps');
    const mainRingProgress = document.querySelector('.main-ring-card .ring-progress');
    const badgeStatus = document.querySelector('#badgeStatus');

    if (updateBtn && stepInput && stepDisplay && mainRingProgress) {
        let totalSteps = 8432; // Sync with initial HTML value
        const GOAL = 10000;
        const CIRCUMFERENCE = 596.9; // 2 * PI * 95

        updateBtn.addEventListener('click', () => {
            const addedSteps = parseInt(stepInput.value);

            if (!isNaN(addedSteps) && addedSteps >= 0) {
                totalSteps += addedSteps;
                stepDisplay.innerText = totalSteps.toLocaleString();

                const percentage = Math.min((totalSteps / GOAL) * 100, 100);
                const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
                mainRingProgress.style.strokeDashoffset = offset;

                if (badgeStatus) {
                    if (totalSteps >= GOAL) {
                        badgeStatus.innerHTML = "🏆 <strong>Milestone Reached: Marathoner!</strong>";
                        badgeStatus.style.color = "#e67e22";
                    } else if (totalSteps >= 5000) {
                        badgeStatus.innerText = "Keep going! You're halfway there.";
                    }
                }

                stepInput.value = '';
            } else {
                alert("Please enter a valid step count.");
            }
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm("Are you sure you want to reset your daily steps to 0?")) {
                    totalSteps = 0;
                    stepDisplay.innerText = "0";
                    mainRingProgress.style.strokeDashoffset = CIRCUMFERENCE;
                    if (badgeStatus) {
                        badgeStatus.innerText = "Keep moving to earn badges!";
                        badgeStatus.style.color = "var(--text-dim)";
                    }
                }
            });
        }
    }

    const dashStepInput = document.querySelector('#dashStepInput');
    const dashUpdateBtn = document.querySelector('#dashUpdateBtn');
    const dashStepDisplay = document.querySelector('#dashSteps');
    const dashResetBtn = document.querySelector('#dashResetBtn');
    const todayBar = document.querySelector('#todayBar');

    if (dashUpdateBtn && dashStepInput && dashStepDisplay) {
        let dashSteps = 8432;
        const DASH_GOAL = 10000;

        dashUpdateBtn.addEventListener('click', () => {
            const added = parseInt(dashStepInput.value);
            if (!isNaN(added) && added > 0) {
                dashSteps += added;
                dashStepDisplay.innerText = dashSteps.toLocaleString();

                const percentage = Math.min((dashSteps / DASH_GOAL) * 100, 100);
                const circle = document.querySelector('.stat-card:first-child .progress-circle');
                if (circle) {
                    circle.style.setProperty('--p', percentage.toFixed(0));
                    circle.innerText = `${percentage.toFixed(0)}%`;
                }

                if (todayBar) {
                    const barHeight = Math.min(percentage, 100);
                    todayBar.style.height = `${barHeight}%`;
                    const barValue = todayBar.querySelector('.bar-value');
                    if (barValue) {
                        barValue.innerText = `${(dashSteps / 1000).toFixed(1)}k`;
                    }
                }

                dashStepInput.value = '';
            } else {
                alert("Please enter a valid step count.");
            }
        });

        if (dashResetBtn) {
            dashResetBtn.addEventListener('click', () => {
                if (confirm("Are you sure you want to reset your dashboard progress to 0?")) {
                    dashSteps = 0;
                    dashStepDisplay.innerText = "0";
                    const circle = document.querySelector('.stat-card:first-child .progress-circle');
                    if (circle) {
                        circle.style.setProperty('--p', '0');
                        circle.innerText = "0%";
                    }
                    if (todayBar) {
                        todayBar.style.height = "0%";
                        const barValue = todayBar.querySelector('.bar-value');
                        if (barValue) {
                            barValue.innerText = "0k";
                        }
                    }
                }
            });
        }
    }

    const heroSection = document.querySelector('#heroSection');
    const prevHeroBtn = document.querySelector('#prevHeroBtn');
    const nextHeroBtn = document.querySelector('#nextHeroBtn');

    if (heroSection && (prevHeroBtn || nextHeroBtn)) {
        const images = [
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1350&q=80'
        ];

        let currentImgIndex = 0;

        const updateHeroBackground = (index) => {
            const newImg = images[index];
            heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${newImg}')`;
        };

        if (nextHeroBtn) {
            nextHeroBtn.addEventListener('click', () => {
                currentImgIndex = (currentImgIndex + 1) % images.length;
                updateHeroBackground(currentImgIndex);
            });
        }

        if (prevHeroBtn) {
            prevHeroBtn.addEventListener('click', () => {
                currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
                updateHeroBackground(currentImgIndex);
            });
        }
    }
});