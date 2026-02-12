// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const mobileNav = document.querySelector('.nav-mobile');
    mobileNav.classList.toggle('active');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelector('.nav-mobile').classList.remove('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Booking Functions
function openBookingPopup(packageName = '') {
    const overlay = document.getElementById('bookingOverlay');
    overlay.style.display = 'flex';
    
    // Reset the view to show form first (in case it was closed after payment)
    document.querySelector('.booking-form').style.display = 'block';
    document.getElementById('payment-section').style.display = 'none';
    document.getElementById('success-message').style.display = 'none';

    if (packageName) {
        const packageSelect = document.getElementById('package');
        for (let option of packageSelect.options) {
            if (option.value === packageName) {
                option.selected = true;
                break;
            }
        }
    }
}

function closeBookingPopup() {
    document.getElementById('bookingOverlay').style.display = 'none';
}

// 1. Handle Submit -> Show QR Code
function handleBookingSubmit(event) {
    event.preventDefault();
    
    // Get package name
    const packageSelect = document.getElementById('package');
    const selectedText = packageSelect.options[packageSelect.selectedIndex].text;

    // Hide form, Show Payment
    document.querySelector('.booking-form').style.display = 'none';
    const paymentSection = document.getElementById('payment-section');
    paymentSection.style.display = 'block';
    
    // Update name
    document.getElementById('selected-package-name').innerText = selectedText;
}

// 2. Handle "I Have Paid" -> Fake Loading -> Show Success
function simulatePaymentCheck() {
    const btn = document.getElementById('pay-btn');
    const btnText = document.getElementById('pay-btn-text');

    // Button loading state
    btn.style.backgroundColor = "#f39c12"; 
    btnText.innerText = "Verifying Payment...";
    btn.disabled = true;

    // Wait 3 seconds
    setTimeout(function() {
        document.getElementById('payment-section').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
        
        // Reset button for next time
        btn.disabled = false;
        btn.style.backgroundColor = "#333";
        btnText.innerText = "I Have Paid";
    }, 3000);
}

// Close when clicking outside
document.getElementById('bookingOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeBookingPopup();
    }
});