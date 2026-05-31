const elements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
elements.forEach(el => observer.observe(el));

const carouselsState = {};

function initCarousels() {
  document.querySelectorAll('.carousel-track').forEach(track => {
    const trackId = track.id;
    carouselsState[trackId] = 0;

    const dotsContainer = document.getElementById('dots-' + trackId);
    if (!dotsContainer) return;

    const imagesCount = track.querySelectorAll('img').length;
    for (let i = 0; i < imagesCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.onclick = () => goToSlide(trackId, i);
      dotsContainer.appendChild(dot);
    }
  });
}

function updateDots(trackId, index) {
  const dotsContainer = document.getElementById('dots-' + trackId);
  if (!dotsContainer) return;
  dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function moveSlide(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const imagesCount = track.querySelectorAll('img').length;
  carouselsState[trackId] += direction;
  if (carouselsState[trackId] >= imagesCount) carouselsState[trackId] = 0;
  else if (carouselsState[trackId] < 0) carouselsState[trackId] = imagesCount - 1;
  applySlideTransform(trackId);
}

function goToSlide(trackId, slideIndex) {
  carouselsState[trackId] = slideIndex;
  applySlideTransform(trackId);
}

function applySlideTransform(trackId) {
  const track = document.getElementById(trackId);
  const currentIndex = carouselsState[trackId];
  track.style.transform = `translateX(${-currentIndex * 100}%)`;
  updateDots(trackId, currentIndex);
}

document.addEventListener('DOMContentLoaded', initCarousels);
