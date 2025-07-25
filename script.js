// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    // Shrinking navbar and logo on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
        // Always keep the blue background, just adjust opacity if desired
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(25, 118, 178, 0.98)';
        } else {
            navbar.style.background = 'rgba(25, 118, 178, 0.90)';
        }
    });

    // Add animation to room cards on scroll
    const roomCards = document.querySelectorAll('.room-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initialize room cards with opacity 0 and translateY
    roomCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });



    // About image modal accessibility
    const aboutModal = document.getElementById('about-modal');
    const aboutModalImg = document.getElementById('about-modal-img');
    const aboutModalClose = document.getElementById('about-modal-close');
    const aboutImageBtn = document.querySelector('.about-image-btn');
    let lastFocusedAbout = null;

    function trapAboutFocus(e) {
        const focusableEls = aboutModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            } else {
                if (document.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            }
        }
        if (e.key === 'Escape') {
            closeAboutModal();
        }
    }

    function openAboutModal() {
        lastFocusedAbout = document.activeElement;
        aboutModal.classList.add('open');
        aboutModal.setAttribute('aria-hidden', 'false');
        aboutModal.focus();
        document.addEventListener('keydown', trapAboutFocus);
    }

    function closeAboutModal() {
        aboutModal.classList.remove('open');
        aboutModal.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', trapAboutFocus);
        if (lastFocusedAbout) lastFocusedAbout.focus();
    }

    if (aboutImageBtn) {
        aboutImageBtn.addEventListener('click', openAboutModal);
        aboutImageBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openAboutModal();
            }
        });
    }
    if (aboutModalClose) {
        aboutModalClose.addEventListener('click', closeAboutModal);
    }
    if (aboutModal) {
        aboutModal.addEventListener('click', function(e) {
            if (e.target === aboutModal) {
                closeAboutModal();
            }
        });
    }

    // Gallery modal/lightbox functionality
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImg = document.getElementById('gallery-modal-img');
    const galleryModalClose = document.getElementById('gallery-modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item[data-image]');
    let lastFocusedGallery = null;

    function trapGalleryFocus(e) {
        const focusableEls = galleryModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            } else {
                if (document.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            }
        }
        if (e.key === 'Escape') {
            closeGalleryModal();
        }
    }

    function openGalleryModal(imgSrc) {
        lastFocusedGallery = document.activeElement;
        galleryModalImg.src = imgSrc;
        galleryModal.classList.add('open');
        galleryModal.setAttribute('aria-hidden', 'false');
        galleryModal.focus();
        document.addEventListener('keydown', trapGalleryFocus);
    }

    function closeGalleryModal() {
        galleryModal.classList.remove('open');
        galleryModalImg.src = '';
        galleryModal.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', trapGalleryFocus);
        if (lastFocusedGallery) lastFocusedGallery.focus();
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = item.getAttribute('data-image');
            if (imgSrc) {
                openGalleryModal(imgSrc);
            }
        });
        
        // Keyboard accessibility
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const imgSrc = item.getAttribute('data-image');
                if (imgSrc) {
                    openGalleryModal(imgSrc);
                }
            }
        });
        
        // Make items focusable
        item.setAttribute('tabindex', '0');
    });

    if (galleryModalClose) {
        galleryModalClose.addEventListener('click', closeGalleryModal);
    }
    if (galleryModal) {
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }

    // Remove any previous navLinks declarations in this scope
    const hamburger = document.getElementById('hamburger');
    const navLinksMenu = document.getElementById('nav-links');

    if (hamburger && navLinksMenu) {
        hamburger.addEventListener('click', function() {
            const isOpen = navLinksMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
    }
}); 