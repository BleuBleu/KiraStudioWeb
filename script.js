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

const NUM_SCREENSHOTS = 8;

const thumbnailsDesktop  = Array.from({length: NUM_SCREENSHOTS}, (_, index) => 'thumbnails/desktop' + (index + 1) + '.png');
const thumbnailsMobile   = Array.from({length: NUM_SCREENSHOTS}, (_, index) => 'thumbnails/mobile'  + (index + 1) + '.png');
const screenshotsDesktop = Array.from({length: NUM_SCREENSHOTS}, (_, index) => 'screenshots/desktop' + (index + 1) + '.png');
const screenshotsMobile  = Array.from({length: NUM_SCREENSHOTS}, (_, index) => 'screenshots/mobile'  + (index + 1) + '.png');

// preload all images
const allThumbnails = [...thumbnailsDesktop, ...thumbnailsMobile].flat();

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
}

Promise.all(allThumbnails.map(preloadImage))
  .then(startCycling)
  .catch(err => {
    console.error("Image preload failed", err);
  });

function getThumbnails()
{
  return window.innerWidth < 768 ? thumbnailsMobile : thumbnailsDesktop;
}

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


document.querySelector('.close').onclick = () => lightbox.classList.remove('open');
document.querySelector('.prev').onclick = () => show(index - 1);
document.querySelector('.next').onclick = () => show(index + 1);

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) 
    return;
  if (e.key === 'Escape') lightbox.classList.remove('open');
  if (e.key === 'ArrowLeft') show(index - 1);
  if (e.key === 'ArrowRight') show(index + 1);
});

const SWITCH_INTERVAL = 5000;
const OFFSET = 500;
const FADE_DURATION = 250;
const startTime = performance.now();
const thumbImageIndices = [0, 1, 2];

let lastWidth = window.innerWidth;
let resized = false;

thumbImages[0].src = getThumbnails()[0];
thumbImages[1].src = getThumbnails()[1];
thumbImages[2].src = getThumbnails()[2];
thumbImages[0].onclick = () => show(thumbImageIndices[0]);
thumbImages[1].onclick = () => show(thumbImageIndices[1]);
thumbImages[2].onclick = () => show(thumbImageIndices[2]);

function animate(now) {
  thumbImages.forEach((thumb, i) => {
    const elapsed = now - startTime - i * OFFSET;
    
    if (elapsed < SWITCH_INTERVAL - FADE_DURATION) 
      return;

    const images = getThumbnails();
    const cycleTime = elapsed % SWITCH_INTERVAL;
    const imageIndex = (Math.floor(elapsed / SWITCH_INTERVAL) * 3 + i) % images.length;

    let opacity = 1;

    if (cycleTime < FADE_DURATION) {
      opacity = cycleTime / FADE_DURATION;
    } else if (cycleTime > SWITCH_INTERVAL - FADE_DURATION) {
      opacity = 1 - (cycleTime - (SWITCH_INTERVAL - FADE_DURATION)) / FADE_DURATION;
    }

    if (thumbImageIndices[i] != imageIndex || resized) {
      thumb.src = images[imageIndex];
      thumbImageIndices[i] = imageIndex;
    }

    thumb.style.opacity = opacity;
  });

  requestAnimationFrame(animate);
  resized = false;
}

function startCycling() {
  requestAnimationFrame(animate);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) 
      cancelAnimationFrame(animate);
  else 
    requestAnimationFrame(animate);
});

window.addEventListener("resize", () => {
  const w = window.innerWidth;
  if (w != lastWidth)
    resized = true;
});