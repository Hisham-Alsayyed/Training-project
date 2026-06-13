
    const html         = document.documentElement;        
    const toggleInput  = document.getElementById('themeToggle');
    const toggleLabel  = document.getElementById('toggle-label');
    const toggleIcon   = document.getElementById('toggle-icon');

   
   
    function applyTheme(theme) {
      if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');   
        toggleInput.checked  = true;
        toggleLabel.textContent = 'داكن';
        toggleIcon.className = 'fa-solid fa-moon toggle-icon';
      } else {
        html.removeAttribute('data-theme');       
        toggleInput.checked  = false;
        toggleLabel.textContent = 'فاتح';
        toggleIcon.className = 'fa-solid fa-sun toggle-icon';
      }
      localStorage.setItem('theme', theme);
    }

    (function initTheme() {
      const saved = localStorage.getItem('theme') || 'light';
      applyTheme(saved);
    })();

    toggleInput.addEventListener('change', function () {
      applyTheme(this.checked ? 'dark' : 'light');
    });

    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });

   