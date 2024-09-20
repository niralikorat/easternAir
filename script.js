document.addEventListener("DOMContentLoaded", function () {
  // Function to handle intersection changes for animations
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add 'active' class to start the animation
        entry.target.classList.add('animateShowUp');
        // Stop observing the current target element
        observer.unobserve(entry.target);
      }
    });
  };

  // Create a new Intersection Observer instance
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1 // Trigger when at least 10% of the element is visible
  });

  // Select all elements to animate
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });

  // Second Intersection Observer for different animations
  const handleVanIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add 'vanAnimation' class to start the animation
        entry.target.classList.add('vanAnimation');
        // Stop observing the current target element
        observer.unobserve(entry.target);
      }
    });
  };

  // Create a new Intersection Observer instance for the van animation
  const vanObserver = new IntersectionObserver(handleVanIntersection, {
    threshold: 0.1 // Trigger when at least 10% of the element is visible
  });

  // Select all elements to animate with vanAnimation
  const elementsToAnimateVan = document.querySelectorAll('.animateVan');
  elementsToAnimateVan.forEach(element => {
    vanObserver.observe(element);
  });

  // Function to check if the user is on a mobile device
  function isMobileDevice() {
    return window.innerWidth <= 768; // Define mobile as screens smaller than or equal to 768px
  }

  // Function to apply behavior for changing images and handling paragraph visibility
  function applyBehavior() {
    const stepBoxes = document.querySelectorAll('.stepBox');
    const stepPara = document.querySelectorAll('.stepBoxPara')
    const stepImage = document.querySelector('#stepImage');
    if (stepBoxes.length > 0) {
      const firstStepBox = stepBoxes[0];
      const firstStepPara = stepPara[0]
      firstStepBox.classList.add('stepBoxBg');
      const firstImageSrc = firstStepBox.getAttribute('data-image');
      stepImage.src = firstImageSrc;
      firstStepPara.style.display = 'block'
    }
    
    stepBoxes.forEach(stepBox => {
      stepBox.addEventListener('click', function() {
        // Update the image based on the data-image attribute of the clicked stepBox
        stepBoxes.forEach(box => {
          box.classList.remove('stepBoxBg');
        });
        const imageSrc = stepBox.getAttribute('data-image');
        stepImage.src = imageSrc;
        stepBox.classList.add('stepBoxBg')

        if (isMobileDevice()) {
          // Hide all paragraphs if on mobile
          document.querySelectorAll('.stepBoxPara').forEach(para => {
            para.style.display = 'none';
          });

          // Show the paragraph for the clicked stepBox
          const para = stepBox.querySelector('.stepBoxPara');
          para.style.display = 'block';
        }
      });
    });
  }

  // Run on initial load
  applyBehavior();

  // Re-run if the screen is resized
  window.addEventListener('resize', function() {
    applyBehavior();
  });
});




const burgerMenu = document.getElementById('burger-menu');
const mobileNav = document.getElementById('mobileNav');

burgerMenu.addEventListener('click', () => {
  mobileNav.classList.toggle('active');  // Toggle the active class on the mobile nav
});




let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonialBox');
const totalTestimonials = testimonials.length;
let startX = 0, endX = 0;  // Swipe detection variables

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        const offset = (i - index) * 100;  // Offset by 100% vertically for each testimonial
        const pixelOffset = 40;  // 40px extra offset
        testimonial.style.transform = `translateX(calc(${offset}%)`; 
        testimonial.style.transition = 'transform 0.5s ease';  // Smooth transition
    });
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
}

function prevTestimonial() {
    currentIndex = (currentIndex === 0) ? totalTestimonials - 1 : currentIndex - 1;
    showTestimonial(currentIndex);
}

// Add event listeners for buttons
document.querySelector('.prev').addEventListener('click', prevTestimonial);
document.querySelector('.next').addEventListener('click', nextTestimonial);
const autoSlide = setInterval(() => {
  nextTestimonial();
}, 3000);
// Swipe detection
const testimonialContainer = document.querySelector('.testimonialWrapper');
testimonialContainer.addEventListener('touchstart', (e) => startX = e.touches[0].clientY);  // Changed to Y for vertical swipe
testimonialContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientY;  // Changed to Y for vertical swipe
    if (startX - endX > 50) nextTestimonial();   // Swipe up
    if (endX - startX > 50) prevTestimonial();   // Swipe down
});

// Initial display
showTestimonial(currentIndex);
