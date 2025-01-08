const percentageElements = document.querySelectorAll(".percentage");
const speed = 100;
const intervalDelay = 20;

const animatePercentage = (curEl) => {
  const updatePercentage = () => {
    const target = parseInt(curEl.dataset.percentage);
    const initial = parseInt(curEl.innerHTML);
    const incrementPercentage = Math.max(1, Math.trunc(target / speed));

    if (initial < target) {
      curEl.innerHTML = `${initial + incrementPercentage}%`;
      setTimeout(updatePercentage, intervalDelay);
    } else {
      curEl.innerHTML = `${target}%`;
    }
  };

  updatePercentage();
};

const skillSection = document.querySelector('#skills');
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      percentageElements.forEach(curEl => {
        animatePercentage(curEl);
      });
      document.querySelectorAll('.html, .css, .js, .php, .mysql, .wordpress').forEach(bar => {
        const percentage = bar.parentElement.previousElementSibling.querySelector('.percentage').dataset.percentage;
        bar.style.width = `${percentage}%`;
      });
      observer.unobserve(skillSection);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(skillSection);

const slideContainer = document.querySelector('.slide-container');

function cloneSlides() {
    const slides = slideContainer.querySelectorAll('.slide-card');
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        slideContainer.appendChild(clone);
    });
}
cloneSlides();

// Clone slides when user scrolls to the bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        cloneSlides();
    }
});