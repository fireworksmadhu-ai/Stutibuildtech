const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

function formToWhatsApp(form, fields) {
  const data = new FormData(form);
  const lines = fields.map((field) => `${field.label}: ${data.get(field.name) || 'Not provided'}`);
  const message = `Hello STUTI Build Tech, I want to discuss a project.\n\n${lines.join('\n')}`;
  const url = `https://wa.me/919845462041?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formToWhatsApp(enquiryForm, [
      { name: 'name', label: 'Name' },
      { name: 'project', label: 'Project type' },
      { name: 'location', label: 'Location' }
    ]);
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formToWhatsApp(contactForm, [
      { name: 'name', label: 'Full name' },
      { name: 'phone', label: 'Phone number' },
      { name: 'service', label: 'Service required' },
      { name: 'message', label: 'Project details' }
    ]);
  });
}
