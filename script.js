const header = document.querySelector('.header-parallax');

const layers = 
[
  { el: document.querySelector('.bg'),     speed: 0.20 },
  { el: document.querySelector('.layer1'), speed: 0.35 },
  { el: document.querySelector('.layer2'), speed: 0.50 },
  { el: document.querySelector('.layer3'), speed: 0.65 },
];

window.addEventListener('scroll', () => 
{
  const scrollY = window.scrollY;

  for (const layer of layers) 
  {
    layer.el.style.transform = `translateX(-50%) translateY(${scrollY * -layer.speed}px)`;
  }
});

const screenshotsDesktop = [
  'screenshots/desktop1.png',
  'screenshots/desktop2.png',
  'screenshots/desktop3.png',
  'screenshots/desktop4.png',
  'screenshots/desktop5.png',
  'screenshots/desktop6.png',
  'screenshots/desktop7.png',
  'screenshots/desktop8.png'
  ];

const screenshotsMobile = [
  'screenshots/mobile1.png',
  'screenshots/mobile2.png',
  'screenshots/mobile3.png',
  'screenshots/mobile4.png',
  'screenshots/mobile5.png',
  'screenshots/mobile6.png',
  'screenshots/mobile7.png',
  'screenshots/mobile8.png'
  ];

// preload all images
const allScreenshots = [...screenshotsDesktop, ...screenshotsMobile].flat();

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
}

Promise.all(allScreenshots.map(preloadImage))
  .then(startCycling)
  .catch(err => {
    console.error("Image preload failed", err);
  });

function getScreenshots()
{
  return window.innerWidth < 768 ? screenshotsMobile : screenshotsDesktop;
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-img');

let index = 0;

function show(i) 
{
  screenshots = getScreenshots();
  index = (i + screenshots.length) % screenshots.length;
  lightboxImage.src = screenshots[index];
  lightbox.classList.add('open');
}

const thumbImages = document.querySelectorAll('.cell-image img');

thumbImages.forEach((img) =>
  img.onclick = () => show(0)
);

document.querySelector('.close').onclick = () => lightbox.classList.remove('open');
document.querySelector('.prev').onclick = () => show(index - 1);
document.querySelector('.next').onclick = () => show(index + 1);

thumbImages[0].src = getScreenshots()[0];
thumbImages[1].src = getScreenshots()[1];
thumbImages[2].src = getScreenshots()[2];

const SWITCH_INTERVAL = 4000;
const OFFSET = 250;
const FADE_DURATION = 250;
const startTime = performance.now();

function animate(now) {
  thumbImages.forEach((thumb, i) => {
    const elapsed = now - startTime - i * OFFSET;
    
    if (elapsed < SWITCH_INTERVAL - FADE_DURATION) 
    	return;

	const images = getScreenshots();
    const cycleTime = elapsed % SWITCH_INTERVAL;
    const imageIndex = (Math.floor(elapsed / SWITCH_INTERVAL) * 3 + i) % images.length;

    let opacity = 1;

    if (cycleTime < FADE_DURATION) {
      opacity = cycleTime / FADE_DURATION;
    } else if (cycleTime > SWITCH_INTERVAL - FADE_DURATION) {
      opacity = 1 - (cycleTime - (SWITCH_INTERVAL - FADE_DURATION)) / FADE_DURATION;
    }

    if (opacity != 1) {
      thumb.src = images[imageIndex];
    }

    thumb.style.opacity = opacity;
  });

  requestAnimationFrame(animate);
}

function startCycling() {
	requestAnimationFrame(animate);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelAnimationFrame(animate);
  else requestAnimationFrame(animate);
});

let lastWidth = window.innerWidth;
