window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('loaded');
    setTimeout(() => loader.remove(), 500);
  }
});

const jobCards = Array.from(document.querySelectorAll('.job-card'));
const searchInput = document.getElementById('search');
const experienceFilter = document.getElementById('experienceFilter');
const topBtn = document.getElementById('topBtn');
const buttons = Array.from(document.querySelectorAll('.btn, .btn-outline, .apply-btn'));

function filterJobs() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const experienceValue = experienceFilter.value;

  jobCards.forEach((card) => {
    const title = card.querySelector('h2')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.desc')?.textContent.toLowerCase() || '';
    const skills = Array.from(card.querySelectorAll('.skills span')).map((skill) => skill.textContent.toLowerCase());
    const experienceText = card.querySelector('p')?.textContent.toLowerCase() || '';

    const matchesSearch =
      title.includes(searchTerm) ||
      desc.includes(searchTerm) ||
      skills.some((skill) => skill.includes(searchTerm));

    const experienceMatch =
      experienceValue === 'all' ||
      (experienceValue === '0-1' && /0-1|1-2|1-3/.test(experienceText)) ||
      (experienceValue === '1-3' && /1-3|2-4|3-5|1-2/.test(experienceText)) ||
      (experienceValue === '2-5' && /2-5|3-5|4-6/.test(experienceText)) ||
      (experienceValue === '5+' && /5\+|6\+|7\+|8\+/.test(experienceText));

    card.style.display = matchesSearch && experienceMatch ? 'grid' : 'none';
  });
}

function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  const rect = button.getBoundingClientRect();

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - rect.left - radius}px`;
  ripple.style.top = `${event.clientY - rect.top - radius}px`;
  ripple.classList.add('ripple');

  const existingRipple = button.getElementsByClassName('ripple')[0];
  if (existingRipple) {
    existingRipple.remove();
  }

  button.appendChild(ripple);
}

function toggleTopButton() {
  if (window.scrollY > 320) {
    topBtn.classList.add('visible');
  } else {
    topBtn.classList.remove('visible');
  }
}

if (searchInput && experienceFilter) {
  searchInput.addEventListener('input', filterJobs);
  experienceFilter.addEventListener('change', filterJobs);
}

if (topBtn) {
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', toggleTopButton);
}

buttons.forEach((button) => {
  button.addEventListener('click', createRipple);
});
