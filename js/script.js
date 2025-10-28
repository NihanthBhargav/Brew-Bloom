// ===== BREW & BLOOM COFFEE LAB - MAIN JAVASCRIPT =====

class CoffeeLab {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupHeroAnimations();
        this.setupProcessObserver();
        this.setupCreations();
        this.setupReservationForm();
        this.setupScrollEffects();
        this.loadCreationsData();
        
        console.log('🧪 Brew & Bloom Coffee Lab initialized');
    }

    // ===== NAVIGATION SETUP =====
    setupNavigation() {
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.glass-nav');

        this.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu?.classList.contains('active') &&
                !this.navMenu.contains(e.target) &&
                !this.mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        const isExpanded = this.navMenu.classList.contains('active');
        this.mobileToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.mobileToggle?.classList.remove('active');
        this.navMenu?.classList.remove('active');
        this.mobileToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // ===== HERO ANIMATIONS =====
    setupHeroAnimations() {
        this.animateStats();
        this.setupHeroButtons();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    setupHeroButtons() {
        const brewJourneyBtn = document.getElementById('brew-journey');
        const viewProcessBtn = document.getElementById('view-process');
        const exploreBtn = document.getElementById('explore-btn');

        brewJourneyBtn?.addEventListener('click', () => {
            this.scrollToSection('#creations');
            this.showNotification('Begin your coffee journey!', 'success');
        });

        viewProcessBtn?.addEventListener('click', () => {
            this.scrollToSection('#process');
        });

        exploreBtn?.addEventListener('click', () => {
            this.scrollToSection('#experience');
            this.showNotification('Welcome to our laboratory!', 'info');
        });
    }

    // ===== PROCESS SECTION OBSERVER =====
    // setupProcessObserver() {
    //     const processSteps = document.querySelectorAll('.process-step');
        
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 entry.target.classList.add('visible');
    //             }
    //         });
    //     }, { threshold: 0.3 });

    //     processSteps.forEach(step => observer.observe(step));
    // }

    // // ===== CREATIONS SYSTEM =====
    // setupCreations() {
    //     this.setupCreationFilters();
    // }

    // ===== PROCESS SECTION OBSERVER =====
    setupProcessObserver() {
        const processSteps = document.querySelectorAll('.process-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // REMOVE THIS LINE or comment it out
                    // entry.target.classList.remove('visible');
                }
            });
        }, { 
            threshold: 0.1,  // Changed from 0.3 to 0.1
            rootMargin: '0px 0px -50px 0px' // Adds some margin
        });

        processSteps.forEach(step => observer.observe(step));
    }

    setupCreationFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const creationCards = document.querySelectorAll('.creation-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                this.filterCreations(filter);
            });
        });

        // Animate creations on scroll
        const creationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        creationCards.forEach(card => creationObserver.observe(card));
    }

    filterCreations(filter) {
        const creations = document.querySelectorAll('.creation-card');
        
        creations.forEach(creation => {
            const category = creation.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                creation.style.display = 'block';
                setTimeout(() => creation.classList.add('visible'), 50);
            } else {
                creation.classList.remove('visible');
                setTimeout(() => creation.style.display = 'none', 300);
            }
        });

        this.showNotification(`Showing ${filter === 'all' ? 'all' : filter} creations`, 'info');
    }

    loadCreationsData() {
        const creations = [
            {
                name: "Molecular Espresso",
                category: "espresso",
                description: "Precision-extracted single origin with scientific accuracy",
                price: "$4.50",
                emoji: "⚗️"
            },
            {
                name: "Laboratory Cold Brew",
                category: "filter",
                description: "72-hour slow extraction with controlled temperature",
                price: "$5.75",
                emoji: "🧊"
            },
            {
                name: "Chemical Reaction Mocha",
                category: "signature",
                description: "Cocoa compounds reacting with our signature blend",
                price: "$6.25",
                emoji: "🧪"
            },
            {
                name: "Centrifuge Cappuccino",
                category: "espresso",
                description: "Perfectly balanced foam through centrifugal force",
                price: "$5.00",
                emoji: "🌀"
            },
            {
                name: "PH Balanced Pour Over",
                category: "filter",
                description: "Optimal acidity achieved through precise water chemistry",
                price: "$6.50",
                emoji: "⚖️"
            },
            {
                name: "Quantum Latte",
                category: "signature",
                description: "Superposition of flavors in a single cup",
                price: "$5.75",
                emoji: "🔬"
            }
        ];

        const grid = document.querySelector('.creations-grid');
        if (!grid) return;

        grid.innerHTML = creations.map(creation => `
            <div class="creation-card" data-category="${creation.category}">
                <div class="creation-header">
                    <h3 class="creation-name">${creation.emoji} ${creation.name}</h3>
                    <span class="creation-category">${creation.category}</span>
                </div>
                <p class="creation-description">${creation.description}</p>
                <div class="creation-details">
                    <span class="creation-price">${creation.price}</span>
                    <button class="add-to-lab" aria-label="Add ${creation.name} to lab">
                        <span>+</span>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to new buttons
        document.querySelectorAll('.add-to-lab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.creation-card');
                const name = card.querySelector('.creation-name').textContent;
                this.showNotification(`Added ${name} to your lab session`, 'success');
                
                // Add animation
                btn.style.transform = 'scale(1.3)';
                setTimeout(() => btn.style.transform = 'scale(1)', 300);
            });
        });

        // Re-observe new elements
        const creationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.creation-card').forEach(card => creationObserver.observe(card));
    }

    // ===== RESERVATION SYSTEM =====
    setupReservationForm() {
        const form = document.querySelector('.reservation-form');
        const counterBtns = document.querySelectorAll('.counter-btn');
        
        if (!form) return;

        // Counter functionality using event delegation (most robust)
        // Attach a single listener to the form and handle clicks for elements
        // with the `.counter-btn` class. This avoids issues when inner text
        // is clicked or when buttons are replaced dynamically.
        form.addEventListener('click', (e) => {
            const button = e.target.closest('.counter-btn');
            if (!button) return;

            const container = button.closest('.counter-input');
            if (!container) return;

            const input = container.querySelector('input[type="number"]');
            if (!input) return;

            const action = button.dataset.action;
            let value = parseInt(input.value, 10) || 0;

            if (action === 'increase') {
                const max = parseInt(input.max, 10) || Infinity;
                if (value < max) input.value = value + 1;
            } else if (action === 'decrease') {
                const min = parseInt(input.min, 10) || 0;
                if (value > min) input.value = value - 1;
            }

            // dispatch a real change event so other listeners respond
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleReservation(form);
        });

        // Form validation
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        this.clearFieldError(field);
        
        if (field.required && !field.value.trim()) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentElement.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async handleReservation(form) {
        const formData = new FormData(form);
        const reservationData = {
            sessionType: formData.get('session-type'),
            participants: formData.get('participants'),
            date: formData.get('date'),
            time: formData.get('time'),
            timestamp: new Date().toISOString()
        };

        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Please fill all required fields correctly', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading-spinner"></div> Processing...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        this.showNotification('Laboratory session reserved successfully! We\'ll contact you soon.', 'success');
        
        // Reset form
        form.reset();
        
        console.log('Reservation data:', reservationData);
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Navbar background on scroll
            if (scrollTop > 100) {
                this.navbar?.classList.add('scrolled');
            } else {
                this.navbar?.classList.remove('scrolled');
            }
            
            // Navbar hide/show
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                this.navbar?.style.transform = 'translateY(-100%)';
            } else {
                this.navbar?.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
            
            // Close mobile menu on scroll
            if (this.navMenu?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        }, { passive: true });
    }

    // ===== UTILITY FUNCTIONS =====
    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = this.navbar?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">×</button>
        `;

        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--lab-blue);
                    color: white;
                    padding: 1.5rem 2rem;
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-strong);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    max-width: 400px;
                    font-size: 1.4rem;
                }
                .notification-success { background: #27ae60; }
                .notification-error { background: #e74c3c; }
                .notification-info { background: var(--lab-blue); }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 0;
                    width: 2.5rem;
                    height: 2.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: var(--transition-fast);
                }
                .notification-close:hover {
                    background: rgba(255,255,255,0.2);
                }
                .loading-spinner {
                    width: 1.5rem;
                    height: 1.5rem;
                    border: 2px solid transparent;
                    border-top: 2px solid currentColor;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    display: inline-block;
                    margin-right: 0.5rem;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    new CoffeeLab();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoffeeLab;
}