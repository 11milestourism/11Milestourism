// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const mobileNav = document.querySelector('.nav-mobile');
    mobileNav.classList.toggle('active');
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const mobileNav = document.querySelector('.nav-mobile');
            mobileNav.classList.remove('active');
            const icon = document.querySelector('.mobile-menu i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(statsSection);

// Booking popup functions
function openBookingPopup(packageName = '') {
    const overlay = document.getElementById('bookingOverlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    if (packageName) {
        const packageSelect = document.getElementById('package');
        for (let option of packageSelect.options) {
            if (option.text.includes(packageName)) {
                option.selected = true;
                break;
            }
        }
    }
}

function closeBookingPopup() {
    const overlay = document.getElementById('bookingOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close popup when clicking outside
document.getElementById('bookingOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeBookingPopup();
    }
});

// Handle booking form submission
function handleBookingSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const bookingData = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your booking request! We will contact you within 24 hours to confirm your adventure.');
        closeBookingPopup();
        event.target.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .package-card, .testimonial-card, .blog-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
});

