/* Smooth-scroll for in-page links */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  if (id.length <= 1) return;
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({behavior:'smooth', block:'start'});
});

/* Sticky header shrink */
const header = document.querySelector('[data-header]');
let lastY = 0;
function onScroll(){
  const y = window.scrollY || 0;
  header.classList.toggle('shrink', y > 12);
  lastY = y;
}
document.addEventListener('scroll', onScroll, {passive:true});
onScroll();

/* Mobile nav toggle */
const nav = document.querySelector('.nav');
const toggle = document.querySelector('[data-nav-toggle]');
if (toggle){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

/* Footer year */
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Click-to-call helpers (ensure tel links behave) */
document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
  a.addEventListener('click',()=>{/* noop; mobile dialer handles */});
});

/* Form validation (front-end only) */
const form = document.querySelector('[data-form]');
if (form){
  const errorsEl = form.querySelector('.form__errors');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorsEl.textContent = '';

    const data = new FormData(form);
    const requiredFields = ['name','phone','email','service','time'];
    const missing = requiredFields.filter(f => !data.get(f));

    const email = data.get('email') || '';
    const phone = data.get('phone') || '';
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOK = /[\d\-\+\(\)\s]{7,}/.test(phone);

    const messages = [];
    if (missing.length) messages.push('Please fill all required fields.');
    if (!emailOK) messages.push('Enter a valid email address.');
    if (!phoneOK) messages.push('Enter a valid phone number.');

    if (messages.length){
      errorsEl.textContent = messages.join(' ');
      errorsEl.focus?.();
      return;
    }

    // Demo only — show a confirmation
    form.reset();
    errorsEl.style.color = '#166534';
    errorsEl.textContent = 'Thanks! We received your request and will contact you shortly.';
    setTimeout(()=>{ errorsEl.textContent=''; errorsEl.style.color=''; }, 5000);
  });
}
