document.addEventListener("DOMContentLoaded", function () {
    // Function to handle intersection changes
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
  
    // Observe each element
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  });
  