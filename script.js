/* ==========================================================================
   SidtheDev.portfolio - Interactive Features
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFilterSystem();
  initNavbarScroll();
  initMobileMenu();
  initKeyboardListeners();
});

// Category Filter System
function initFilterSystem() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameEntries = document.querySelectorAll('.game-entry');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      gameEntries.forEach(entry => {
        const entryCategory = entry.getAttribute('data-category') || '';
        if (filterValue === 'all' || entryCategory.includes(filterValue)) {
          entry.style.display = 'grid';
          setTimeout(() => {
            entry.style.opacity = '1';
          }, 10);
        } else {
          entry.style.opacity = '0';
          setTimeout(() => {
            entry.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// Video Modal Management
const videoModal = document.getElementById('videoModal');
const videoModalTitle = document.getElementById('videoModalTitle');
const videoModalBody = document.getElementById('videoModalBody');

window.openVideoModal = function(type, source, title) {
  if (!videoModal || !videoModalBody) return;

  videoModalTitle.textContent = title || 'Video Preview';

  if (type === 'youtube') {
    videoModalBody.innerHTML = `
      <iframe 
        src="https://www.youtube-nocookie.com/embed/${source}?autoplay=1&rel=0" 
        title="${title}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  } else if (type === 'local') {
    videoModalBody.innerHTML = `
      <video controls autoplay playsinline style="width:100%; height:100%;">
        <source src="${source}" type="video/webm">
        Your browser does not support HTML5 video.
      </video>
    `;
  }

  videoModal.classList.add('active');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeVideoModal = function() {
  if (!videoModal || !videoModalBody) return;
  videoModal.classList.remove('active');
  videoModal.setAttribute('aria-hidden', 'true');
  videoModalBody.innerHTML = '';
  document.body.style.overflow = '';
};

// Lightbox Gallery Modal
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

window.openLightbox = function(imgSrc, captionText) {
  if (!lightboxModal || !lightboxImg) return;
  lightboxImg.src = imgSrc;
  lightboxCaption.textContent = captionText || '';
  lightboxModal.classList.add('active');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove('active');
  lightboxModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Keyboard listener for ESC key
function initKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeLightbox();
    }
  });
}

// Navbar scroll subtle background
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.background = 'rgba(11, 14, 20, 0.98)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.14)';
    } else {
      navbar.style.background = 'rgba(11, 14, 20, 0.92)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    if (isVisible) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#0b0e14';
      navLinks.style.padding = '20px';
      navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.12)';
      navLinks.style.gap = '16px';
    }
  });
}
