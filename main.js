// BarberShop Pro - Interactive Features

// 1. BOOKING MODAL
document.addEventListener('DOMContentLoaded', function() {
  // Create booking modal
  const bookingModal = document.createElement('div');
  bookingModal.id = 'bookingModal';
  bookingModal.className = 'modal fade';
  bookingModal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">Zarezerwuj wizytę</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="bookingForm" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="bookingName" class="form-label">Twoje imię</label>
              <input type="text" class="form-control" id="bookingName" required>
              <div class="invalid-feedback">Proszę wpisać swoje imię.</div>
            </div>
            <div class="mb-3">
              <label for="bookingPhone" class="form-label">Numer telefonu</label>
              <input type="tel" class="form-control" id="bookingPhone" required>
              <div class="invalid-feedback">Proszę wpisać poprawny numer telefonu.</div>
            </div>
            <div class="mb-3">
              <label for="bookingDate" class="form-label">Preferowana data</label>
              <input type="date" class="form-control" id="bookingDate" required>
              <div class="invalid-feedback">Proszę wybrać datę.</div>
            </div>
            <div class="mb-3">
              <label for="bookingTime" class="form-label">Godzina</label>
              <select class="form-select" id="bookingTime" required>
                <option value="">Wybierz godzinę...</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
              </select>
              <div class="invalid-feedback">Proszę wybrać godzinę.</div>
            </div>
            <div class="mb-3">
              <label for="bookingService" class="form-label">Wybrana usługa</label>
              <input type="text" class="form-control" id="bookingService" readonly>
            </div>
            <div class="alert alert-info" role="alert">
              <strong>Koszt:</strong> <span id="bookingPrice">-</span> zł
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
          <button type="button" class="btn btn-dark" id="confirmBooking">Potwierdź rezerwację</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(bookingModal);
  const modal = new bootstrap.Modal(bookingModal);

  // Pricing button handlers
  const priceButtons = document.querySelectorAll('.btn[class*="btn-outline-light"], .btn[class*="btn-accent"]');
  priceButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.card');
      const serviceName = card.querySelector('.card-title').textContent.trim();
      const priceText = card.querySelector('.accent, .text-gold, [class*="fs-4"]').textContent.trim();
      const price = priceText.match(/\d+/)[0];
      
      document.getElementById('bookingService').value = serviceName;
      document.getElementById('bookingPrice').textContent = price;
      modal.show();
    });
  });

  // Confirm booking
  document.getElementById('confirmBooking').addEventListener('click', function() {
    const form = document.getElementById('bookingForm');
    if (form.checkValidity()) {
      const name = document.getElementById('bookingName').value;
      const service = document.getElementById('bookingService').value;
      showNotification(`✓ Rezerwacja potwierdzena! ${name}, czekamy na ciebie!`, 'success');
      form.reset();
      modal.hide();
    } else {
      form.classList.add('was-validated');
    }
  });

  // 2. FORM VALIDATION WITH TOAST
  const forms = document.querySelectorAll('.needs-validation');
  forms.forEach(form => {
    if (form.id === 'bookingForm') return; // Skip booking form
    
    form.addEventListener('submit', function(event) {
      if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        const formName = this.id === 'contact-form' ? 'Wiadomość' : 'Formularz';
        showNotification(`${formName} wysłana pomyślnie! Dziękujemy za kontakt!`, 'success');
        this.reset();
        this.classList.remove('was-validated');
        return;
      }
      this.classList.add('was-validated');
    });
  });

  // 3. SMOOTH SCROLL & ACTIVE LINK HIGHLIGHTING
  const navLinks = document.querySelectorAll('.navbar-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
          
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Highlight nav on scroll
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // 4. CARD HOVER ANIMATIONS
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      this.style.transition = 'all 0.3s ease';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });

  // 5. TOAST NOTIFICATION FUNCTION
  window.showNotification = function(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show`;
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
    toast.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.remove();
    }, 5000);
  };

  function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
    return container;
  }

  // 6. COUNTER ANIMATION FOR STATS (if you want to add this later)
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  }

  // 7. BUTTON RIPPLE EFFECT
  document.querySelectorAll('button[class*="btn"]').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 20px;
        height: 20px;
        left: ${e.clientX - rect.left - 10}px;
        top: ${e.clientY - rect.top - 10}px;
        animation: ripple-animation 0.6s ease-out;
      `;
      
      if (!this.style.position || this.style.position === 'static') {
        this.style.position = 'relative';
      }
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation to CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

