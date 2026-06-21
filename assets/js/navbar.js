document.addEventListener("DOMContentLoaded", function () {
  fetch('/navbar')
    .then(response => response.text())
    .then(data => {
      const placeholder = document.getElementById('navbar-placeholder');
      if (placeholder) {
        placeholder.innerHTML = data;
        initNavbar();
      }
    })
    .catch(err => {
      console.warn('Error loading navbar via fetch (likely due to file:// protocol CORS restrictions). Using fallback.', err);
      const placeholder = document.getElementById('navbar-placeholder');
      if (placeholder) {
        // Fallback for local viewing without a web server
        placeholder.innerHTML = `
                <header class="liquid-navbar">
                    <div class="w-full max-w-[1080px] mx-auto px-4 md:px-6 h-12 flex items-center justify-between gap-4">
                        <!-- Brand Logo & Name -->
                        <a href="#home" class="flex items-center gap-2 shrink-0">
                            <div class="w-8 h-8 rounded-full border border-primary/40 bg-surface-container-lowest flex items-center justify-center shadow-[0_0_8px_rgba(0,219,233,0.2)]">
                                <span class="material-symbols-outlined text-primary text-lg" style="font-variation-settings: 'FILL' 1;">hive</span>
                            </div>
                            <span class="font-display-lg text-[10px] sm:text-xs md:text-sm font-black text-primary uppercase italic tracking-wider">Into the Void 2.0</span>
                        </a>

                        <nav class="flex items-center gap-1 sm:gap-2 md:gap-4 lg:gap-6">
                            <a class="nav-link active text-primary border-b-2 border-primary-container pb-1 drop-shadow-[0_0_8px_#00dbe9] font-label-caps text-label-caps flex items-center justify-center" href="#home">
                                <span class="material-symbols-outlined md:hidden text-lg">home</span>
                                <span class="hidden md:inline">Home</span>
                            </a>
                            <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps flex items-center justify-center" href="#event">
                                <span class="material-symbols-outlined md:hidden text-lg">event</span>
                                <span class="hidden md:inline">Event</span>
                            </a>
                            <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps flex items-center justify-center" href="#registration">
                                <span class="material-symbols-outlined md:hidden text-lg">app_registration</span>
                                <span class="hidden md:inline">Registration</span>
                            </a>
                            <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps flex items-center justify-center" href="#hyper-inline">
                                <span class="material-symbols-outlined md:hidden text-lg">category</span>
                                <span class="hidden md:inline">Category</span>
                            </a>
                            <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps flex items-center justify-center" href="#sponsors">
                                <span class="material-symbols-outlined md:hidden text-lg">workspace_premium</span>
                                <span class="hidden md:inline">Sponsor</span>
                            </a>
                        </nav>
                    </div>
                </header>`;
        initNavbar();
      }
    });
});

function initNavbar() {
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const activeClasses = ["active", "text-primary", "border-b-2", "border-primary-container", "pb-1", "drop-shadow-[0_0_8px_#00dbe9]"];
  const inactiveClasses = ["text-on-surface-variant", "hover:text-primary", "transition-colors", "duration-300"];

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add(...activeClasses);
            link.classList.remove(...inactiveClasses);
          } else {
            link.classList.remove(...activeClasses);
            link.classList.add(...inactiveClasses);
          }
        });
      }
    });
  }, observerOptions);

  // Only observe sections that we have links for
  const linkedIds = Array.from(navLinks).map(link => link.getAttribute("href").substring(1));
  sections.forEach(sec => {
    if (linkedIds.includes(sec.getAttribute("id"))) {
      observer.observe(sec);
    }
  });
}

// Hide navbar on scroll down
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const navbar = document.querySelector(".liquid-navbar");
  if (navbar) {
    if (currentScroll > lastScrollTop && currentScroll > 50) {
      // Scroll Down
      navbar.classList.add("nav-hidden");
    } else {
      // Scroll Up
      navbar.classList.remove("nav-hidden");
    }
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);
