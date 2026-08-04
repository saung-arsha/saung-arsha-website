/* ============================================================
   SAUNG ARSHA — SCRIPT.JS
   Vanilla JavaScript (ES6). No dependencies.
   ============================================================ */

   document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initProgressBar();
    initNavbar();
    initMobileMenu();
    initSmoothAnchors();
    initScrollSpy();
    initRevealAnimations();
    initGallery();
    initHighlightSlider();
    initDenahMarkers();
    initAccordion();
    initRipple();
    initBackToTop();
    initFooterYear();
  });
  
  /* ---------- LOADING SCREEN ---------- */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    const hide = () => loader.classList.add('is-hidden');
    window.addEventListener('load', () => setTimeout(hide, 400));
    // Fallback in case 'load' takes too long
    setTimeout(hide, 2500);
  }
  
  /* ---------- SCROLL PROGRESS BAR ---------- */
  function initProgressBar() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
  
  /* ---------- NAVBAR: transparent -> solid on scroll ---------- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const toggle = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }
  
  /* ---------- MOBILE MENU ---------- */
  function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!navToggle || !mobileMenu) return;
  
    const closeMenu = () => {
      mobileMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const openMenu = () => {
      mobileMenu.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
  
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
  
    mobileMenu.querySelectorAll('[data-nav-mobile]').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
  
  /* ---------- SMOOTH ANCHOR NAVIGATION ---------- */
  function initSmoothAnchors() {
    const navHeight = document.getElementById('navbar')?.offsetHeight || 76;
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - (navHeight - 4);
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }
  
  /* ---------- SCROLL SPY: highlight active nav menu ---------- */
  function initScrollSpy() {
    const sections = document.querySelectorAll('main section[id], main#hero');
    const navLinks = document.querySelectorAll('[data-nav]');
    if (!sections.length || !navLinks.length) return;
  
    const spy = () => {
      let currentId = 'hero';
      const scrollPos = window.scrollY + (window.innerHeight * 0.35);
  
      sections.forEach(section => {
        if (section.offsetTop <= scrollPos) {
          currentId = section.id;
        }
      });
  
      navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('is-active', href === currentId);
      });
    };
  
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  }
  
  /* ---------- REVEAL ON SCROLL (fade-in / slide-up) ---------- */
  function initRevealAnimations() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
  
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  
    items.forEach(el => observer.observe(el));
  }
  
  /* ---------- GALLERY + LIGHTBOX ---------- */
  function initGallery() {
    const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
    const lightbox = document.getElementById('lightbox');
    if (!galleryItems.length || !lightbox) return;
  
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
  
    let currentIndex = 0;
  
    const openLightbox = (index) => {
      currentIndex = index;
      const item = galleryItems[currentIndex];
      lightboxImg.src = item.dataset.full;
      lightboxImg.alt = item.dataset.title || '';
      lightboxCaption.textContent = item.dataset.title || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
  
    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
  
    const showNext = () => openLightbox((currentIndex + 1) % galleryItems.length);
    const showPrev = () => openLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length);
  
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });
  
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
  
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }
  
  /* ---------- HIGHLIGHT AREA SLIDER ---------- */
  function initHighlightSlider() {
    const slider = document.getElementById('highlightSlider');
    const track = document.getElementById('highlightTrack');
    const prevBtn = document.getElementById('highlightPrev');
    const nextBtn = document.getElementById('highlightNext');
    if (!slider || !track || !prevBtn || !nextBtn) return;
  
    const scrollAmount = () => {
      const card = track.querySelector('.highlight-card');
      return card ? card.offsetWidth + 16 : 300;
    };
  
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  }
  
  /* ---------- DENAH INTERACTIVE MARKERS ---------- */
  function initDenahMarkers() {
    const markers = document.querySelectorAll('.denah__marker');
    const tooltip = document.getElementById('denahTooltip');
    const tooltipClose = document.getElementById('denahTooltipClose');
    const tooltipTitle = document.getElementById('denahTooltipTitle');
    const tooltipDesc = document.getElementById('denahTooltipDesc');
    if (!markers.length || !tooltip) return;
  
    const closeTooltip = () => {
      tooltip.classList.remove('is-open');
      markers.forEach(m => m.classList.remove('is-active'));
    };
  
    markers.forEach(marker => {
      marker.addEventListener('click', () => {
        const isActive = marker.classList.contains('is-active');
        markers.forEach(m => m.classList.remove('is-active'));
  
        if (isActive) {
          closeTooltip();
          return;
        }
  
        marker.classList.add('is-active');
        tooltipTitle.textContent = marker.dataset.info || '';
        tooltipDesc.textContent = marker.dataset.desc || '';
        tooltip.classList.add('is-open');
      });
    });
  
    tooltipClose?.addEventListener('click', closeTooltip);
  }
  
  /* ---------- FAQ ACCORDION ---------- */
  function initAccordion() {
    const triggers = document.querySelectorAll('.accordion__trigger');
    if (!triggers.length) return;
  
    triggers.forEach(trigger => {
      const panel = trigger.nextElementSibling;
      panel.style.maxHeight = '0px';
  
      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
  
        // Close all
        triggers.forEach(t => {
          t.setAttribute('aria-expanded', 'false');
          t.nextElementSibling.style.maxHeight = '0px';
        });
  
        // Open clicked one (if it was closed)
        if (!isOpen) {
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }
  
  /* ---------- RIPPLE EFFECT ON BUTTONS ---------- */
  function initRipple() {
    const buttons = document.querySelectorAll('.btn--ripple');
    buttons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }
  
  /* ---------- BACK TO TOP ---------- */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
  
    const toggle = () => {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  /* ---------- FOOTER YEAR ---------- */
  function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }