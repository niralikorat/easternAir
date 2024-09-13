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
