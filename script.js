document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile nav if open
            const navbar = document.querySelector('.navbar');
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        hamburger.classList.toggle('active'); // Optional: for animating the hamburger icon
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value to control when the link becomes active
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Basic form submission for booking (client-side only)
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Booking request submitted! Our team will contact you shortly to confirm your appointment.');
            bookingForm.reset();
        });
    }

    // --- Animations and Transitions (Placeholder for enhancements) ---
    // You can add more complex animations here using JavaScript and CSS.
    // Examples: fade-in sections on scroll, parallax effects, interactive elements.

    // Example: Fade-in sections on scroll
    const animatedElements = document.querySelectorAll('.section h2,.section p,.service-item,.gallery-grid img,.booking-form,.contact-details,.contact-map');

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start animation slightly before element enters viewport
    });

    animatedElements.forEach(element => {
        element.classList.add('animate-hidden'); // Add a class to hide initially
        animateOnScroll.observe(element);
    });
});