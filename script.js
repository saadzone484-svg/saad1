/* script.js — interactions for CareerPath AI
   - Mobile nav toggle
   - Smooth scrolling for anchor links
   - Interactive career cards (keyboard + hover)
   - Simple form validation and success message
*/

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle && navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile nav after click
      if(navLinks.classList.contains('show')) navLinks.classList.remove('show');
    }
  });
});

// Simple interactive behavior for career cards: expand on click/enter
document.querySelectorAll('.career-card').forEach(card => {
  card.addEventListener('click', () => onCardAction(card));
  card.addEventListener('keypress', (e) => { if(e.key === 'Enter') onCardAction(card); });
});
function onCardAction(card){
  // toggle a subtle expansion effect
  card.classList.toggle('active');
  if(card.classList.contains('active')){
    card.style.transform = 'translateY(-12px) scale(1.02)';
  } else {
    card.style.transform = '';
  }
}

// Form validation and submission handling
const careerForm = document.getElementById('careerForm');
if(careerForm){
  careerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const education = document.getElementById('education').value;
    let valid = true;
    if(name.length < 2){
      showError('nameError','Please enter your full name.'); valid = false;
    }
    if(!validateEmail(email)){ showError('emailError','Please enter a valid email address.'); valid = false; }
    if(!education){ showError('educationError','Please select your education level.'); valid = false; }
    if(!valid) return;

    // Simulate a successful submission — in a real app, send to server
    const msg = document.getElementById('formMessage');
    msg.textContent = 'Thanks, ' + name.split(' ')[0] + '! We received your info and will email personalized guidance to ' + email + '.';
    careerForm.reset();
    // small confetti-like animation (simple)
    msg.animate([{opacity:0, transform:'translateY(6px)'},{opacity:1, transform:'translateY(0)'}],{duration:400,easing:'ease-out'});
  });
}

function showError(id, message){
  const el = document.getElementById(id);
  if(el){ el.textContent = message; }
}
function clearErrors(){
  document.querySelectorAll('.error').forEach(e => e.textContent = '');
  const msg = document.getElementById('formMessage'); if(msg) msg.textContent = '';
}
function validateEmail(email){
  // basic email pattern (beginner-friendly)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Set copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Small entrance animations for sections when scrolling into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
    }
  });
},{threshold:0.15});
document.querySelectorAll('section, .career-card, .feature, .step').forEach(el => observer.observe(el));
