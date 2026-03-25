document.addEventListener('DOMContentLoaded', () => {
    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Mobile Menu Toggle ----
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // ---- Theme Toggle ----
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        htmlEl.setAttribute('data-theme', 'light');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    // ---- LinkedIn Reviews Slideshow (1 review per slide, square card) ----
    const reviewsData = [
        "Screenshot 2026-03-26 at 12.48.24 AM.png",
        "Screenshot 2026-03-26 at 12.48.36 AM.png",
        "Screenshot 2026-03-26 at 12.48.52 AM.png",
        "Screenshot 2026-03-26 at 12.49.10 AM.png",
        "Screenshot 2026-03-26 at 12.49.23 AM.png",
        "Screenshot 2026-03-26 at 12.49.35 AM.png",
        "Screenshot 2026-03-26 at 12.49.52 AM.png",
        "Screenshot 2026-03-26 at 12.50.04 AM.png",
        "Screenshot 2026-03-26 at 12.50.18 AM.png",
        "Screenshot 2026-03-26 at 12.50.33 AM.png",
        "Screenshot 2026-03-26 at 12.50.45 AM.png",
        "Screenshot 2026-03-26 at 12.51.01 AM.png",
        "Screenshot 2026-03-26 at 12.51.21 AM.png",
        "Screenshot 2026-03-26 at 12.51.33 AM.png",
        "Screenshot 2026-03-26 at 12.51.45 AM.png",
        "Screenshot 2026-03-26 at 12.51.57 AM.png",
        "Screenshot 2026-03-26 at 12.52.18 AM.png"
    ];

    const track = document.getElementById('slideshow-track');
    const dotsContainer = document.getElementById('slideshow-dots');

    let currentSlide = 0;
    let autoSlideInterval;

    // Build square slides — 1 image per slide, vertical centered
    function buildSlides() {
        track.innerHTML = '';
        reviewsData.forEach((imgName, idx) => {
            const card = document.createElement('div');
            card.className = 'slide-card';

            card.innerHTML = `
                <div class="review-image-card">
                    <img src="images/${imgName}" alt="Client Review ${idx + 1}" loading="lazy" />
                    
                    <div class="review-image-arrows">
                        <button class="review-arrow prev-arrow" aria-label="Previous review">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <button class="review-arrow next-arrow" aria-label="Next review">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>
            `;

            track.appendChild(card);
        });

        // Re-attach event listeners to the new inline arrows
        document.querySelectorAll('.prev-arrow').forEach(btn => {
            btn.addEventListener('click', () => {
                currentSlide--;
                updateSlideshow();
                resetAutoSlide();
            });
        });
        document.querySelectorAll('.next-arrow').forEach(btn => {
            btn.addEventListener('click', () => {
                currentSlide++;
                updateSlideshow();
                resetAutoSlide();
            });
        });
    }

    // Build dots
    function buildDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < reviewsData.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'slideshow-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlideshow();
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlideshow() {
        const totalSlides = reviewsData.length;
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;

        if (track.children.length > 0) {
            const slideWidth = track.children[0].offsetWidth;
            track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }

        document.querySelectorAll('.slideshow-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    }

    // Ensure slideshow recalculates pixel translation on window resize
    window.addEventListener('resize', () => {
        // Remove animation to prevent jank during resize
        track.style.transition = 'none';
        updateSlideshow();
        // Restore animation
        setTimeout(() => {
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide++;
            updateSlideshow();
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Touch / Swipe support
    let touchStartX = 0;
    const trackContainer = document.querySelector('.slideshow-track-container');
    if (trackContainer) {
        trackContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        trackContainer.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                currentSlide += diff > 0 ? 1 : -1;
                updateSlideshow();
                resetAutoSlide();
            }
        }, { passive: true });
    }

    // Initialize
    buildSlides();
    buildDots();
    updateSlideshow();
    startAutoSlide();
    // ---- Number Counter Animation ----
    const numberElements = document.querySelectorAll('.stat-number');

    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const targetEl = entry.target;
            const decimals = parseInt(targetEl.getAttribute('data-decimals')) || 0;
            
            if (entry.isIntersecting) {
                const targetValue = parseFloat(targetEl.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentVal = (easeOutQuart * targetValue).toFixed(decimals);
                    
                    targetEl.textContent = currentVal;
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        targetEl.textContent = targetValue.toFixed(decimals);
                    }
                };
                
                window.requestAnimationFrame(step);
            } else {
                targetEl.textContent = (0).toFixed(decimals);
            }
        });
    }, { threshold: 0.1 });

    numberElements.forEach(el => countUpObserver.observe(el));

    // ---- Scroll Spy (Active Section Highlighting) ----
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => link.classList.remove('active'));
                
                navLinks.forEach(link => {
                    const onclickAttr = link.getAttribute('onclick');
                    if (onclickAttr && onclickAttr.includes(`#${id}`)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(section => scrollSpyObserver.observe(section));

    // ---- Visual Reveal On Scroll (Lazy Loading UI) ----
    const revealElements = document.querySelectorAll('section > .container, .service-card, .team-card, .slideshow-wrapper');
    revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
            } else {
                entry.target.classList.remove('is-revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
});
