// Hamburger 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Section 1 slide
const slides1 = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
    slides1.forEach(slide => slide.classList.remove("active"));
    slides1[index].classList.add("active");
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides1.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 2000);

const slidesContainer = document.querySelector('.sec4-slides');
const slides = document.querySelectorAll('.sec4-slide');
const nextBtn = document.querySelector('.sec4-next');
const prevBtn = document.querySelector('.sec4-prev');
const dotsContainer = document.querySelector('.sec4-dots');

let currentIndex = 0;
const slidesToShow = 3;
const totalSlides = slides.length;

// Calculate card width dynamically (includes gap spacing)
function getSlideWidth() {
  return slides[0].getBoundingClientRect().width + 20; // 20px gap from your CSS
}

const maxIndex = totalSlides - slidesToShow;

// Create dots
for (let i = 0; i <= maxIndex; i++) {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = dotsContainer.querySelectorAll('button');
updateDots();

// Move slides
function goToSlide(index) {
  if (index < 0) index = maxIndex;
  if (index > maxIndex) index = 0;
  currentIndex = index;
  
  const offset = -(getSlideWidth() * index);
  slidesContainer.style.transform = `translateX(${offset}px)`;
  updateDots();
}

// Update active dot
function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

// Arrow controls
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

// Auto slide
let autoSlide = setInterval(() => goToSlide(currentIndex + 1), 4000);

// Pause on hover
slidesContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
slidesContainer.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => goToSlide(currentIndex + 1), 4000);
});

// Handle window resize (recalculate slide width)
window.addEventListener('resize', () => goToSlide(currentIndex));

