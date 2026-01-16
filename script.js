// Lucas Taylor Portfolio Clone Script

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll for Navigation and Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navMobile = document.querySelector('.nav-mobile');
                navMobile.classList.remove('active');
                
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMobile.classList.toggle('active');
        });
    }

    // 3. Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If the entry is a stat counter, trigger the counter animation
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('.stat-number');
                    if (counter && !counter.classList.contains('counted')) {
                        animateCounter(counter);
                        counter.classList.add('counted');
                    }
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 4. Animated Stats Counter
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = 20; // Update every 20ms
        const increment = target / (duration / step);
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            // Keep the plus sign
            el.innerHTML = Math.floor(current) + '<span class="plus">+</span>';
        }, step);
    }

    // 5. Service Tabs Switching
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');
    
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            serviceTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all contents
            serviceContents.forEach(content => {
                content.classList.remove('active');
                setTimeout(() => {
                     if(!content.classList.contains('active')) {
                         content.style.display = 'none';
                     }
                }, 300); // fade out duration
            });
            
            // Show target content
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
                // Trigger reflow to enable transition
                void targetContent.offsetWidth; 
                targetContent.classList.add('active');
            }
        });
    });

    // 6. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items (optional: remove this loop if you want multiple open)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 7. Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 8. Sticky Navbar Effect (optional shadow on scroll)
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 100%)';
            navbar.style.borderBottom = 'none';
        }
    });

});
