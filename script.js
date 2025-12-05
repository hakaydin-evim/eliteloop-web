/* ==========================================
   EliteLoop Website JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initScrollAnimations();
    initNavbar();
    initPricingToggle();
    initFAQ();
    initMobileMenu();
});

/* ==========================================
   Scroll Animations (AOS-like)
   ========================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================
   Navbar Scroll Effect
   ========================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/* ==========================================
   Pricing Toggle
   ========================================== */
function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const toggleLabels = document.querySelectorAll('.toggle-label');
    const monthlyPrices = document.querySelectorAll('.monthly-price, .monthly-period');
    const yearlyPrices = document.querySelectorAll('.yearly-price, .yearly-period');

    if (!toggle) return;

    toggle.addEventListener('change', function () {
        const isYearly = this.checked;

        // Update labels
        toggleLabels.forEach((label, index) => {
            if (index === 0) {
                label.classList.toggle('active', !isYearly);
            } else {
                label.classList.toggle('active', isYearly);
            }
        });

        // Update prices with animation
        monthlyPrices.forEach(el => {
            el.style.display = isYearly ? 'none' : 'inline';
        });

        yearlyPrices.forEach(el => {
            el.style.display = isYearly ? 'inline' : 'none';
        });

        // Add scale animation to price cards
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

/* ==========================================
   FAQ Accordion
   ========================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

/* ==========================================
   Mobile Menu
   ========================================== */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');

    if (!menuBtn) return;

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('menu-open');
        menuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

function closeMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    navbar.classList.remove('menu-open');
    menuBtn?.classList.remove('active');
    document.body.classList.remove('menu-open');
}

/* ==========================================
   Parallax Effect (subtle)
   ========================================== */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    const heroPhone = document.querySelector('.hero-phone');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
        heroContent.style.opacity = 1 - (scrollY * 0.001);
    }

    if (heroPhone) {
        heroPhone.style.transform = `translateY(calc(-50% + ${scrollY * 0.15}px))`;
    }
});

/* ==========================================
   Cursor Glow Effect (optional)
   ========================================== */
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card, .pricing-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/* ==========================================
   Counter Animation
   ========================================== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    updateCounter();
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/(\d+)/);
                if (match && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    // Keep original format (10K+, 50K+, etc.)
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

/* ==========================================
   Ripple Effect on Buttons
   ========================================== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

/* ==========================================
   Typed Text Effect for Hero (optional)
   ========================================== */
const typedTexts = ['Kahve ☕', 'Tenis 🎾', 'Yemek 🍽️', 'Seyahat ✈️', 'Spor 🏃'];
let currentIndex = 0;

function typeText() {
    const element = document.querySelector('.typed-text');
    if (!element) return;

    const text = typedTexts[currentIndex];
    let charIndex = 0;

    element.textContent = '';

    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            element.textContent += text[charIndex];
            charIndex++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % typedTexts.length;
                typeText();
            }, 2000);
        }
    }, 100);
}

// Initialize typed text if element exists
if (document.querySelector('.typed-text')) {
    typeText();
}

console.log('🚀 EliteLoop Website Loaded');
