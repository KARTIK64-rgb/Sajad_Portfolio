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
        {
            name: "Juztine Jay A.",
            title: "Resume Writing",
            rating: 5,
            date: "March 24, 2026",
            review: "He made my resume looks clean and updated. Would definitely recommend him if you are in need of a quick resume writing.",
            initials: "JA"
        },
        {
            name: "William L.",
            title: "Sales Consultant | Relationship-Driven Selling | Luxury & High-Value Retail | Customer Loyalty & Revenue Growth",
            rating: 4.5,
            date: "March 23, 2026",
            review: "I hired Sahil Sajad to revamp my resume, and I'm thrilled with the results! They took the time to understand my career goals, industry, and achievements, then crafted a polished, ATS-friendly CV that truly highlights my strengths. The turnaround was fast, communication was clear, and they incorporated my feedback seamlessly.",
            initials: "WL"
        },
        {
            name: "Roshan Das",
            title: "Luxury Hotel Development & Construction Leader | Ex-@Marriott, @Hyatt, @Westin | 19+ yrs in Hospitality | Building My Own Hotel Venture | Open to Global & NRI Investment",
            rating: 5,
            date: "February 15, 2026",
            review: "Excellent work by Sahil. My resume now presents my experience, leadership, and achievements with clarity and strong positioning. Professional, impactful, and truly executive-level. Highly recommended.",
            initials: "RD"
        },
        {
            name: "Nikhil Gupta",
            title: "Founder & CEO | Leadership Advisor | Business-Aligned CXO & Senior Leadership Decisions",
            rating: 5,
            date: "February 15, 2026",
            review: "Sahil did an excellent job refining my LinkedIn profile with clarity and strategic positioning. He aligned the narrative with my leadership advisory focus and ensured the profile reflected depth, credibility, and purpose. Professional and thoughtful in his approach.",
            initials: "NG"
        },
        {
            name: "Dileep Chippa",
            title: "Food and beverage Attendant",
            rating: 5,
            date: "February 10, 2026",
            review: "Sahil did a great job in restructuring resume into new way of ATS free resume. Thankyou for your service.",
            initials: "DC"
        },
        {
            name: "Shubham Patel",
            title: "CX Analyst @ Wipro | Business Analysis, Customer Experience Analysis",
            rating: 5,
            date: "January 29, 2026",
            review: "Sahil did a fantastic work and always maintain time bound response and always implemented the feedback very well.",
            initials: "SP"
        },
        {
            name: "Walker Nyachowe, ACMA, CGMA",
            title: "Founder & Managing Director | Tax & Cross-Border Investment Advisory | Regulatory Strategy | Energy, Mining & Infrastructure (US$300M+ Projects)",
            rating: 5,
            date: "January 29, 2026",
            review: "Sahil supported me with my executive CV, personal LinkedIn profile, and company LinkedIn page. His work was professional, well-structured, and aligned with senior consulting standards. I appreciated his clarity, responsiveness, and attention to detail. The overall quality exceeded expectations, and I would confidently recommend Sahil for executive branding and LinkedIn optimization.",
            initials: "WN"
        },
        {
            name: "Nitin Dahiya",
            title: "Cybersecurity Intern @AbyM | Ex-Intern at IFSO/NCFL, Delhi Police | Former Cybersecurity Trainee at IIT Guwahati | GRC | DevSecOps & Cybersecurity | Linux | Networking",
            rating: 5,
            date: "January 28, 2026",
            review: "Highly recommended. Excellent communication and great quality of work.",
            initials: "ND"
        },
        {
            name: "Jagjeet Singh",
            title: "Agile Project Management Professional",
            rating: 5,
            date: "January 27, 2026",
            review: "very professional and quick turnaround time",
            initials: "JS"
        },
        {
            name: "Mark Andrew Phillips",
            title: "Senior Cyber Security Services Specialist | Enterprise & Partner-Led GTM | CrowdStrike Ecosystem | UK & Nordics",
            rating: 5,
            date: "January 20, 2026",
            review: "Sahil was very professional throughout and will deliver exceptional results. (feedback edited)",
            initials: "MP"
        },
        {
            name: "Prabin Lamichhane",
            title: "Python & Django Developer | Backend Developer | Django REST Framework | MSc Computing",
            rating: 4.8,
            date: "January 15, 2026",
            review: "I really enjoyed working with Sahil. He helped me tailor my resume perfectly to my needs. I would definitely recommend his services.",
            initials: "PL"
        },
        {
            name: "Akhil Jadawala",
            title: "Working Student – Embedded Software | FPGA (VHDL/Verilog) | C/C++ | Real-Time Systems | Automotive & Mobility",
            rating: 5,
            date: "January 7, 2026",
            review: "I enjoyed working with Sahil. He is professional, responsive, and focused on delivering quality work.",
            initials: "AJ"
        },
        {
            name: "Praveen Karunakaran",
            title: "Sales Operations Manager | Deal Desk | Revenue Operations | Renewal Management | Process Improvement | ServiceNow",
            rating: 5,
            date: "December 21, 2025",
            review: "Sahid understood the requirement very well for my resume, Communication and responsiveness is top notch.",
            initials: "PK"
        },
        {
            name: "Manav Sikka",
            title: "Oil & Gas Retail | Wholesale & Retail convenience | Head of Network Expansion | Building & Mentoring diverse teams | Channel Dev. | P&L mgmt. | Start up | Sales & Operations | Real Estate | Life Coach Views are personal",
            rating: 5,
            date: "December 20, 2025",
            review: "Sahil understands the requirements quite diligently and delivers the end project as desired. I am quite impressed, and cost-wise, he is very competitive. He taught me some aspects that I was not aware off at all. I wish you the very best Sahil",
            initials: "MS"
        },
        {
            name: "Shaban Khan",
            title: "Sr. Dev @ Stikkman UX | React.js, Next.js , Node.js, TypeScript, AWS, Linux",
            rating: 5,
            date: "December 11, 2025",
            review: "Great experience working with Sahil. He transformed my resume professionally, improved my ATS score to 93, and delivered exactly what I needed. Highly skilled, responsive, and reliable. I definitely recommend his services.",
            initials: "SK"
        },
        {
            name: "Nataraja T. C.",
            title: "MTA, UGC-NET Qualified & pursuing Ph.D. Faculty at Dept. of PG Studies & Research in Tourism Administration(MBATTM) & Research Scholar, IMSR, Kuvempu University, Shivamogga",
            rating: 5,
            date: "November 18, 2025",
            review: "There was a good experience working with Sahil Sajad. The commitment with knowledge and experience is excellent. Thank you",
            initials: "NT"
        },
        {
            name: "Ali Fasil",
            title: "Content Creator",
            rating: 4.3,
            date: "October 24, 2025",
            review: "Sahil was a pleasure to work with. He is professional, attentive, and genuinely committed to helping you succeed. His clear guidance and positive approach made the project seamless and rewarding. Truly a collaborative and reliable partner.",
            initials: "AF"
        },
        {
            name: "Pradeep K.",
            title: "IT Finance & FP&A Leader | Partnering CIOs & CFOs to Govern Tech Spend at Scale | ERP | IFRS | $100M+ Value Creation",
            rating: 5,
            date: "March 23, 2026",
            review: "Sahil brought clarity and strong positioning to my CV and LinkedIn profile, with a clear focus on impact and executive presence. Highly recommended for senior professionals.",
            initials: "PK"
        },
        {
            name: "Nitish Alluri",
            title: "Software Engineer",
            rating: 5,
            date: "March 15, 2026",
            review: "Sahil was very communicative through out the process and delivered the files in time.",
            initials: "NA"
        },
        {
            name: "Shubham B.",
            title: "Lead Specialist at Gallagher Re | Professional in Operational Efficiency, Financial Insights, and Data Optimization",
            rating: 5,
            date: "March 11, 2026",
            review: "Sahil was pretty helpful with the project and communicated very effectively. Highly recommend him!",
            initials: "SB"
        },
        {
            name: "Anshuman Mishra",
            title: "Software Engineer | SDE | Backend Developer | Java | Spring Boot | AWS | MySQL",
            rating: 5,
            date: "February 21, 2026",
            review: "Sahil refined my resume and prepared a cover letter for me and I'm pretty satisfied with his work.",
            initials: "AM"
        },
        {
            name: "Vartika Jain",
            title: "Senior @ BSR & Co. LLP | ACCA Professional level",
            rating: 5,
            date: "February 16, 2026",
            review: "I had a great experience working with Sahil on my resume. He was extremely patient, detail-oriented, and truly understood my background and career goals. The final resume was well-structured, impactful, and much more aligned with what recruiters look for. Highly recommend their support to anyone looking to upgrade their resume.",
            initials: "VJ"
        },
        {
            name: "Ramandeep Kaur",
            title: "Senior Project Lead QA",
            rating: 5,
            date: "February 16, 2026",
            review: "Good Service, efficient and reliable.",
            initials: "RK"
        }
    ];

    const track = document.getElementById('slideshow-track');
    const dotsContainer = document.getElementById('slideshow-dots');

    let currentSlide = 0;
    let autoSlideInterval;

    // Render star SVGs
    function renderStars(rating) {
        let html = '';
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            html += '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></polygon></svg>';
        }
        if (hasHalf) {
            html += '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" style="opacity:0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></polygon></svg>';
        }
        return html;
    }

    // Build square slides — 1 review per slide, vertical centered
    function buildSlides() {
        track.innerHTML = '';
        reviewsData.forEach((review) => {
            const card = document.createElement('div');
            card.className = 'slide-card';

            // We use the image if it exists, otherwise fallback to initials
            // Let's assume images exist in images/ folder with the first name, lowercase.
            const firstName = review.name.split(' ')[0].toLowerCase();
            const avatarHtml = `<img src="images/${firstName}.png" alt="${review.name}" onerror="this.onerror=null; this.parentNode.innerHTML='<span class=\\'review-avatar-initials\\'>${review.initials}</span>';" />`;

            card.innerHTML = `
                <div class="review-square-card">
                    <div class="review-card-top">
                        <div class="stars">${renderStars(review.rating)}</div>
                        <div class="quote-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.3;"><path d="M10 11h-4a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h4v8zm10 0h-4a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h4v8z"/></svg>
                        </div>
                    </div>
                    
                    <blockquote class="review-quote">"${review.review}"</blockquote>
                    
                    <div class="review-card-bottom">
                        <div class="review-author-info">
                            <div class="review-avatar-circle">
                                ${avatarHtml}
                            </div>
                            <div>
                                <h4 class="review-client-name">${review.name}</h4>
                                <p class="review-client-title">${review.title}</p>
                            </div>
                        </div>
                        
                        <div class="review-nav-arrows">
                            <button class="review-arrow prev-arrow" aria-label="Previous review">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                            </button>
                            <button class="review-arrow next-arrow" aria-label="Next review">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </button>
                        </div>
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

        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        document.querySelectorAll('.slideshow-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    }

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
});
