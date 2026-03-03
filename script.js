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

    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // ---- Theme Toggle ----
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlEl = document.documentElement;

    // Check local storage or system preference
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

    // ---- Portfolio Filtering ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'All' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ---- Reviews Carousel ----
    const reviewsData = [
        {
            id: 1,
            name: "Priya Sharma",
            role: "Software Engineer",
            company: "Google",
            avatar: "https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMG9mZmljZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjQ3Mjg2M3ww&ixlib=rb-4.1.0&q=80&w=400",
            rating: 5,
            review: "I was struggling with my resume for months. After working with ResumeCraft, I got 5 interview calls in just 2 weeks! The resume was beautifully formatted and perfectly highlighted my skills. Worth every penny.",
        },
        {
            id: 2,
            name: "Rahul Mehta",
            role: "Investment Analyst",
            company: "Goldman Sachs",
            avatar: "https://images.unsplash.com/photo-1664101606938-e664f5852fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNsaWVudCUyMGJ1c2luZXNzJTIwbWFuJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjUzNTQ4M3ww&ixlib=rb-4.1.0&q=80&w=400",
            rating: 5,
            review: "Absolutely professional service! My resume went from being ignored to landing me at Goldman Sachs. The attention to detail, the clean layout, and the perfect use of action words made all the difference.",
        },
        {
            id: 3,
            name: "Sarah Kaur",
            role: "Marketing Director",
            company: "Unilever",
            avatar: "https://images.unsplash.com/photo-1765005204058-10418f5123c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBqb2IlMjBpbnRlcnZpZXclMjBwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NzI1MzU0ODJ8MA&ixlib=rb-4.1.0&q=80&w=400",
            rating: 5,
            review: "I was making a career switch and had no idea how to present my experience. The team understood my goal immediately and crafted a compelling narrative. I had 3 interviews within a week of sending it out!",
        },
        {
            id: 4,
            name: "James Thompson",
            role: "CTO",
            company: "TechStart Inc.",
            avatar: "https://images.unsplash.com/photo-1758876204244-930299843f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90JTIwc21pbGluZ3xlbnwxfHx8fDE3NzI0MDk0NDZ8MA&ixlib=rb-4.1.0&q=80&w=400",
            rating: 5,
            review: "Even at the executive level, crafting the right resume matters. ResumeCraft helped me present my leadership story in a way that resonated with the board. Exceptional work and very responsive throughout.",
        },
        {
            id: 5,
            name: "Ananya Roy",
            role: "Clinical Research Associate",
            company: "Pfizer",
            avatar: "https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMG9mZmljZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjQ3Mjg2M3ww&ixlib=rb-4.1.0&q=80&w=400",
            rating: 5,
            review: "The resume was incredibly well-structured for the healthcare sector. It passed ATS screening every time and I got calls from top pharma companies. I'm now at Pfizer thanks to this fantastic work!",
        }
    ];

    let currentReviewIndex = 0;

    // DOM Elements for Featured Review
    const fRevText = document.getElementById('featured-review-text');
    const fRevAvatar = document.getElementById('featured-review-avatar');
    const fRevName = document.getElementById('featured-review-name');
    const fRevRole = document.getElementById('featured-review-role');
    const fRevStarsContainer = document.getElementById('featured-review-stars');

    const btnPrev = document.getElementById('review-prev');
    const btnNext = document.getElementById('review-next');
    const dotsContainer = document.getElementById('review-dots');

    // Mini reviews specific items
    const miniReviews = document.querySelectorAll('.mini-review');

    function renderStars(count, container) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            container.insertAdjacentHTML('beforeend', svg);
        }
    }

    function updateFeaturedReview(index) {
        const review = reviewsData[index];

        fRevText.textContent = `"${review.review}"`;
        fRevAvatar.src = review.avatar;
        fRevAvatar.alt = review.name;
        fRevName.textContent = review.name;
        fRevRole.textContent = `${review.role} · ${review.company}`;

        renderStars(review.rating, fRevStarsContainer);

        // Update dots
        document.querySelectorAll('.review-dot').forEach((dot, idx) => {
            if (idx === index) dot.classList.add('active');
            else dot.classList.remove('active');
        });

        // Update mini reviews active state
        miniReviews.forEach((mr, idx) => {
            if (idx === index) mr.classList.add('active');
            else mr.classList.remove('active');
        });
    }

    // Create dots
    reviewsData.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'review-dot' + (idx === currentReviewIndex ? ' active' : '');
        dot.addEventListener('click', () => {
            currentReviewIndex = idx;
            updateFeaturedReview(currentReviewIndex);
        });
        dotsContainer.appendChild(dot);
    });

    // Navigation Buttons
    btnPrev.addEventListener('click', () => {
        currentReviewIndex = currentReviewIndex === 0 ? reviewsData.length - 1 : currentReviewIndex - 1;
        updateFeaturedReview(currentReviewIndex);
    });

    btnNext.addEventListener('click', () => {
        currentReviewIndex = currentReviewIndex === reviewsData.length - 1 ? 0 : currentReviewIndex + 1;
        updateFeaturedReview(currentReviewIndex);
    });

    // Mini reviews click handling
    miniReviews.forEach((mr, idx) => {
        mr.addEventListener('click', () => {
            currentReviewIndex = idx;
            updateFeaturedReview(currentReviewIndex);
        });
    });

    // Initial render
    updateFeaturedReview(currentReviewIndex);
});
