    document.addEventListener("DOMContentLoaded", function() {
      if(typeof AOS !== 'undefined') {
        AOS.init({ duration: 900, once: true });
      }

      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll(".nav-link-premium");

      window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (pageYOffset >= sectionTop - 120) {
            currentSectionId = section.getAttribute("id");
          }
        });

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
          }
        });
      });
    });
