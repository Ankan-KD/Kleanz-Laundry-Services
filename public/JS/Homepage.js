document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const cta = document.querySelector('.ctaHome');

    // IntersectionObserver to trigger animation when in view
    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        heroContent.classList.add('active');
        cta.classList.add('active');
        }
    });
    }, { threshold: 0.5 });

    observer.observe(heroContent);
});




/* Service section */
document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.getElementById('services');
    const services = document.querySelectorAll('.service');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in the section
                servicesSection.style.opacity = 1;

                // Add 'show' class to each service for animation
                services.forEach((service, index) => {
                    setTimeout(() => {
                        service.classList.add('show');
                    }, index * 100); // Stagger the animations
                });
            } else {
                // Fade out the section
                servicesSection.style.opacity = 0;

                // Remove 'show' class for fade-out effect
                services.forEach(service => {
                    service.classList.remove('show');
                });
            }
        });
    });
    observer.observe(servicesSection);
});


//image slider
const images = document.querySelectorAll('.slider-img');
let currentIndexx = 0;

function showNextImage() {
    images.forEach((img, index) => {
        img.style.opacity = index === currentIndexx ? 1 : 0;
    });

    currentIndexx = (currentIndexx + 1) % images.length;
}

setInterval(showNextImage, 1500); // Change image every 1.5 seconds




//Testimonial slider
const testimonialSlider = document.getElementById('testimonialSlider');
const testimonials = document.querySelectorAll('.testimonial-box');
const totalTestimonials = testimonials.length;
const testimonialsToShow = 3; // Number of testimonials to show at a time
let currentIndex = 0;

function updateSlider() {
    const percentageMove = 100 / testimonialsToShow; // Calculate percentage to move
    testimonialSlider.style.transform = `translateX(-${currentIndex * percentageMove}%)`;
}

function showNextTestimonials() {
    // Only allow movement if remaining testimonials exceed visible testimonials
    if (currentIndex < totalTestimonials - testimonialsToShow) {
        currentIndex++; // Move to the next set of testimonials
    } else {
        currentIndex = 0; // Reset to the first set
    }
    updateSlider();
}

function showPrevTestimonials() {
    if (currentIndex > 0) {
        currentIndex--; // Move to the previous set of testimonials
    } else {
        currentIndex = totalTestimonials - testimonialsToShow; // Go back to the last set
    }
    updateSlider();
}

// Event listeners for buttons
document.getElementById('nextButton').addEventListener('click', showNextTestimonials);
document.getElementById('prevButton').addEventListener('click', showPrevTestimonials);
