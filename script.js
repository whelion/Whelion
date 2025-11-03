document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Page Loader ---
    // Hides the loader once the main content is loaded
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('loader-hidden');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    if (mobileMenuBtn && mobileMenu && iconOpen && iconClose) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden'); // 'hidden' is a Tailwind class
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        });
        
        // Close menu when a link inside it is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
            });
        });
    }

    // --- 3. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Check if this item is already open
                const isAlreadyOpen = item.classList.contains('open');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                });
                
                // If it wasn't already open, open it
                if (!isAlreadyOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

    // --- 4. Page Navigation (SPA-like) ---
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const pageContents = document.querySelectorAll('.page-content');
    const allNavLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            
            // Hide all pages
            pageContents.forEach(page => {
                if (!page.classList.contains('hidden')) {
                    page.classList.add('hidden');
                }
            });
            
            // Show target page
            const targetPage = document.getElementById(pageId + '-content');
            if (targetPage) {
                targetPage.classList.remove('hidden');
            }
            
            // Update active nav link status
            allNavLinks.forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll(`.nav-link[data-page="${pageId}"]`).forEach(activeLink => {
                activeLink.classList.add('active');
            });

            // Scroll to the top of the new page
            window.scrollTo(0, 0);
        });
    });

    // --- 5. Smooth Scroll-to-Section Links ---
    const scrollLinks = document.querySelectorAll('.nav-link[data-scroll-to], .data-scroll-to');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            let targetId;
            if (link.hasAttribute('data-scroll-to')) {
                targetId = link.getAttribute('data-scroll-to');
            } else if (link.getAttribute('href')) {
                targetId = link.getAttribute('href').substring(1); // Get id from href="#contact"
            } else {
                return;
            }

            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Check if we are on the home page, if not, switch to it first
                const homePage = document.getElementById('home-content');
                if (homePage && homePage.classList.contains('hidden')) {
                    // Find and click the home nav link to switch pages
                    const homeLink = document.querySelector('.nav-link[data-page="home"]');
                    if (homeLink) {
                        homeLink.click();
                    }
                }

                // Wait a tiny bit for the page to switch if needed, then scroll
                setTimeout(() => {
                    const header = document.getElementById('main-header');
                    const headerHeight = header ? header.offsetHeight : 72; // Get header height
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 50); // 50ms delay
            }
        });
    });

    // --- 6. Scroll Reveal Animation ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // --- 7. Footer: Set Current Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});