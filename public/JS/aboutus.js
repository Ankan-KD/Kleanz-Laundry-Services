//ABOUT US SECTION

document.addEventListener("DOMContentLoaded", function () {
  const features = document.querySelectorAll('.feature');

  const observerOptions = {
      root: null, // Use the viewport as the root
      threshold: 0.1 // Trigger when 10% of the element is in view
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible'); // Add visible class
              observer.unobserve(entry.target); // Stop observing once it becomes visible
          }
      });
  }, observerOptions);

  features.forEach(feature => {
      observer.observe(feature); // Observe each feature element
  });
});


//INCREMENT AUTO

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            counter.innerText = '0';

            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                const increment = target / 200;

                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
            observer.unobserve(counter); // Stop observing after the animation starts
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the counter is visible

counters.forEach(counter => {
    counterObserver.observe(counter);
});



//FEATURE BOXES ANIMATION


const features = document.querySelectorAll('.feature');

function checkVisibility() {
  const triggerBottom = window.innerHeight / 5 * 4; // Adjust trigger point

  features.forEach((feature) => {
    const boxTop = feature.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      feature.classList.add('visible');
    } else {
      feature.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility); // Check on page load








