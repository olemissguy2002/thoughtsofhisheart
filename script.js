// Simple parallax engine using requestAnimationFrame
(() => {
  const items = Array.from(document.querySelectorAll('[data-parallax]'));
  const bg = document.querySelector('.bg-fixed');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;

        // Move parallax items at different speeds
        for (const el of items) {
          const speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
          // translateY: positive speed moves slower, negative moves opposite
          el.style.transform = `translate3d(0, ${y * speed * -1}px, 0)`;
        }

        // Subtle scale on background for depth
        if (bg) {
          bg.style.transform = `scale(${1 + Math.min(y/8000, 0.06)})`;
        }

        ticking = false;
      });
      ticking = true;
    }
  };

  // Kick off and attach listeners
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
