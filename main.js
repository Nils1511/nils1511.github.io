// Main JavaScript functionality for Nirmal Solanki's portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTypewriter();
    initScrollReveal();
    initSmoothScrolling();
    initSkillCards();
    initProjectCards();
    
    console.log('Portfolio initialized successfully');
});

// Typewriter effect for hero section
function initTypewriter() {
    const typed = new Typed('#typed-name', {
        strings: ['Nirmal Solanki', 'ML Engineer', 'AI Innovator', 'Problem Solver'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Interactive skill cards with hover effects
function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        // Stagger animation on load
        anime({
            targets: card,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: index * 200,
            duration: 800,
            easing: 'easeOutQuart'
        });
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Project cards with advanced interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Entrance animation
        anime({
            targets: card,
            opacity: [0, 1],
            translateY: [50, 0],
            delay: 1000 + (index * 200),
            duration: 1000,
            easing: 'easeOutQuart'
        });
        
        // 3D hover effect
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            anime({
                targets: this,
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        // Mouse move effect for 3D transformation
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
    });
}

// Navigation background opacity on scroll
function initNavigationEffects() {
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Background opacity based on scroll position
        const opacity = Math.min(currentScrollY / 100, 1);
        nav.style.backgroundColor = `rgba(255, 255, 255, ${0.9 * opacity})`;
        
        // Hide/show nav on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Particle system for hero background
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero-bg');
    
    if (!heroSection) return;
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    
    heroSection.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Performance optimization
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate layouts if needed
            console.log('Window resized, recalculating layouts...');
        }, 250);
    });
}

// Initialize additional effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigationEffects();
    initParticleSystem();
    initPerformanceOptimizations();
});

// Export functions for use in other pages
window.PortfolioUtils = {
    initScrollReveal,
    initSkillCards,
    initProjectCards,
    initSmoothScrolling
};