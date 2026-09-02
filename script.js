const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

function setMenu(open) {
  nav.classList.toggle('open', open);
  menuButton.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menuButton.setAttribute('aria-expanded', String(open));
}

menuButton.addEventListener('click', () => {
  const isOpen = !nav.classList.contains('open');
  setMenu(isOpen);
});

document.querySelector('.menu-backdrop').addEventListener('click', () => setMenu(false));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 950) setMenu(false);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  setMenu(false);
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  observer.observe(element);
});
document.querySelector('#year').textContent = new Date().getFullYear();

const galleryDialog = document.querySelector('.gallery-dialog');
const galleryDialogImage = galleryDialog.querySelector('img');

document.querySelectorAll('.portfolio-item').forEach((item) => {
  item.addEventListener('click', () => {
    const preview = item.querySelector('img');
    galleryDialogImage.src = item.dataset.full;
    galleryDialogImage.alt = preview.alt;
    galleryDialog.showModal();
  });
});

document.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
galleryDialog.addEventListener('click', (event) => {
  if (event.target === galleryDialog) galleryDialog.close();
});

const progressBar = document.querySelector('.scroll-progress span');
const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
  document.querySelector('.header').classList.toggle('is-scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || !entry.target.id) return;
    document.querySelectorAll('.nav a[href^="#"]').forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

document.querySelectorAll('.observe-section[id]').forEach((section) => sectionObserver.observe(section));
