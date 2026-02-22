// ===== Hamburger Menu Functionality =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

/**
 * Toggle mobile navigation menu
 */
function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Project Filter Functionality =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

/**
 * Filter projects by category
 * @param {string} category - Category to filter by
 */
function filterProjects(category) {
    projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            // Trigger animation
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeIn 0.3s ease-in';
            }, 10);
        } else {
            card.classList.add('hidden');
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        const category = button.dataset.filter;
        filterProjects(category);
    });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== Lightbox Functionality =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');

/**
 * Open lightbox with image
 * @param {string} imageSrc - Image source URL
 */
function openLightbox(imageSrc) {
    lightboxImage.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Add click event to project images
projectCards.forEach(card => {
    const img = card.querySelector('img');
    if (img) {
        img.addEventListener('click', () => {
            openLightbox(img.src);
        });
    }
});

lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== Form Validation =====
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message for form field
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function showError(input, message) {
    input.classList.add('error');
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear error message for form field
 * @param {HTMLElement} input - Input element
 */
function clearError(input) {
    input.classList.remove('error');
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

/**
 * Validate form inputs
 * @returns {boolean} - True if all validations pass
 */
function validateForm() {
    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validate email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validate subject
    if (subjectInput.value.trim() === '') {
        showError(subjectInput, 'Subject is required');
        isValid = false;
    } else if (subjectInput.value.trim().length < 3) {
        showError(subjectInput, 'Subject must be at least 3 characters');
        isValid = false;
    } else {
        clearError(subjectInput);
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError(messageInput);
    }

    return isValid;
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() !== '') {
        validateForm();
    }
});

emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() !== '') {
        validateForm();
    }
});

subjectInput.addEventListener('blur', () => {
    if (subjectInput.value.trim() !== '') {
        validateForm();
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim() !== '') {
        validateForm();
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous success message
    successMessage.textContent = '';

    if (validateForm()) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            // Success message
            successMessage.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
            successMessage.style.color = 'var(--success-color)';

            // Reset form
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Clear error states
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                clearError(input);
            });

            // Clear success message after 5 seconds
            setTimeout(() => {
                successMessage.textContent = '';
            }, 5000);
        }, 1500);
    }
});

// ===== Debugging Console =====
console.log('Portfolio website loaded successfully');
console.log('Features active:');
console.log('✓ Mobile navigation');
console.log('✓ Project filtering');
console.log('✓ Lightbox gallery');
console.log('✓ Form validation');