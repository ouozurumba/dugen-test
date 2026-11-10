document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const scrollElements = document.querySelectorAll('.animate-on-scroll, .card, .gallery-item');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  scrollElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  const searchInput = document.getElementById('jobSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const jobCards = document.querySelectorAll('.job-card');
      
      jobCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(term) || desc.includes(term)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('galleryModal');
  const modalText = document.getElementById('modalText');
  const closeModal = document.querySelector('.close-modal');

  if (galleryItems.length > 0 && modal) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const text = item.getAttribute('data-title') || item.textContent;
        modalText.textContent = `Viewing details for: "${text}". Our community and care programs are dedicated to professional excellence.`;
        modal.style.display = 'flex';
      });
    });

    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  const formModal = document.getElementById('formSuccessModal');
  const closeFormModal = document.querySelector('.close-form-modal');

  if (contactForm && formModal) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        formModal.style.display = 'flex';
        contactForm.reset();
      }, 1000);
    });

    if (closeFormModal) {
      closeFormModal.addEventListener('click', () => {
        formModal.style.display = 'none';
      });
    }

    window.addEventListener('click', (e) => {
      if (e.target === formModal) {
        formModal.style.display = 'none';
      }
    });
  }
});