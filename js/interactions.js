document.addEventListener('DOMContentLoaded', () => {
  // List of GIFs
  const gifs = [
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3BpamJpNTdydzBudDlldnFkZ3h2eDN0bXR5b3RzcHZobmJhZ3Z2ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q4ScVMm5oBP44/giphy.webp',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHBrdzQ0bzJocTZ1emtyYjBnZjJqaTk4dTZocWowb3JocXZybnZpaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TDMbOHni02MZM8fTgS/giphy.webp',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzkwZmIyM3pub3M1MDE2MG41NDB5MTFtZHJ3cmI2bHYxemN3d3Q4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dxHjAhJfqZnkQ/giphy.webp',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmh0ZzE2ejFwY2JjdXF2cDV2d3k3bXF3OWkxZ2lha21rYnIwZGZ4aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2jv1mNh5f7fgqAw6xt/giphy.webp',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTg4OWhuZTZ1YzJneGNybnd1aW5hYzlrYWNvajdrMXRzZmp1YTdreCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mBY7aqIWZQo74N3e2X/giphy.webp',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXpzdXR2Z3duNzF0OWZrdGh4a3R5Z3Vubjc0MHNlZmN0dWpuNHlscSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/flq2Aid9Vu8wfmQ1JB/giphy.webp',
  ];

  let currentGifIndex = 0;

  // DOM Elements
  const trigger = document.querySelector('.gif-trigger');
  const tooltip = document.querySelector('.gif');
  const tooltipImage = tooltip ? tooltip.querySelector('img') : null;
  const darkModeTrigger = document.querySelector('.mode-switcher');
  const cursor = document.querySelector('.custom-cursor');

  // Verification that all elements exist
  if (!trigger || !tooltip || !tooltipImage || gifs.length === 0 || !darkModeTrigger || !cursor) {
    console.warn('Required elements were not found or the list of GIFs is empty.');
    return;
  }

  /**
   * Function returns the next GIF address from the array, when it reaches the
   * end it returns to the beginning
   * @returns {string} URL of the next GIF
   */
  const getNextGif = () => {
    const gifUrl = gifs[currentGifIndex];
    currentGifIndex = (currentGifIndex + 1) % gifs.length;
    return gifUrl;
  };

  /**
   * Displays a tooltip with the new GIF and sets its position
   * @param {MouseEvent} event
   */
  const showTooltip = (event) => {
    tooltipImage.src = getNextGif();
    tooltipImage.loading = 'lazy';
    tooltip.style.display = 'block';
    positionTooltip(event);
  };

  /**
   * Updates the position of the tooltip based on the position of the cursor.
   * @param {MouseEvent} event
   */
  const positionTooltip = (event) => {
    tooltip.style.top = `${event.clientY + 8}px`;
    tooltip.style.left = `${event.clientX + 8}px`;
  };

  /**
   * It hides the tooltip and resets the image source.
   */
  const hideTooltip = () => {
    tooltip.style.display = 'none';
    tooltipImage.src = '';
  };

  // Event handling
  trigger.addEventListener('mouseenter', showTooltip);
  trigger.addEventListener('mousemove', positionTooltip);
  trigger.addEventListener('mouseleave', hideTooltip);

  // Dark Mode switch with IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.body.classList.remove('dark-mode');
      } else {
        document.body.classList.add('dark-mode');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(darkModeTrigger);

  /**
   * Updates the position of a custom cursor based on the mouse positions
   * @param {MouseEvent} e
   */
  const updateCursorPosition = (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  };

  // Listen for mouse movement to update the cursor position
  document.addEventListener('mousemove', updateCursorPosition, { passive: true });

  /**
   * When hover over an interactive element (a, button, .interaction),
   * increase the cursor and remove this effect after the descent.
   */
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .interaction')) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .interaction')) {
      document.body.classList.remove('cursor-hover');
    }
  });
});