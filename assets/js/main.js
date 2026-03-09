/* ============================================================
   DEEPAM AMERIA PORTFOLIO — MAIN JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Navbar scroll state ---------------------------------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile hamburger menu ------------------------------- */
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close drawer when a link is clicked
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close drawer on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* --- Active nav link (home page only) -------------------- */
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-resume)');
  if (navLinks.length > 0) {
    const sections = Array.from(document.querySelectorAll('section[id], div[id]')).filter(
      el => document.querySelector(`.nav-links a[href="#${el.id}"]`)
    );

    if (sections.length > 0) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
              });
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      sections.forEach(s => observer.observe(s));
    }
  }

  /* --- Sidebar active link highlighting -------------------- */
  const sidebarLinks = document.querySelectorAll('.sidebar-link[href^="#"]');
  if (sidebarLinks.length > 0) {
    const sidebarSections = Array.from(sidebarLinks)
      .map(link => {
        const id = link.getAttribute('href').slice(1);
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (sidebarSections.length > 0) {
      const sbObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              sidebarLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
              });
            }
          });
        },
        { rootMargin: '-30% 0px -65% 0px' }
      );
      sidebarSections.forEach(s => sbObserver.observe(s));
    }
  }

  /* --- Typewriter effect ----------------------------------- */
  const twEl = document.getElementById('tw-text');
  if (twEl) {
    const phrase = 'Robots this. AI that.';
    let i = 0;
    const type = () => {
      twEl.textContent = phrase.slice(0, i);
      i++;
      if (i <= phrase.length) {
        setTimeout(type, i === 1 ? 0 : 65);
      }
    };
    setTimeout(type, 700);
  }

  /* --- Fade-in on scroll ----------------------------------- */
  const fadeEls = document.querySelectorAll(
    '.project-card, .project-full, .timeline-item, .edu-card, .skill-category, .exp-card'
  );

  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    });

    const fadeObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    fadeEls.forEach(el => fadeObserver.observe(el));
  }

});
