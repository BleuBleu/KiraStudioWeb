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
[...screenshotsDesktop, ...screenshotsMobile].flat().forEach(src => {
  const img = new Image();
  img.src = src;
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
let activeThumb = 0;
let screenshotIndex = 3;
const thumbShotIndex = [0, 1, 2];

thumbImages.forEach((img) =>
	img.onclick = () => show(0)
);

document.querySelector('.close').onclick = () => lightbox.classList.remove('open');
document.querySelector('.prev').onclick = () => show(index - 1);
document.querySelector('.next').onclick = () => show(index + 1);

thumbImages[0].src = getScreenshots()[0];
thumbImages[1].src = getScreenshots()[1];
thumbImages[2].src = getScreenshots()[2];

function swapImage(img, nextSrc) {
  const onFadeOut = (e) => {
    if (e.propertyName !== "opacity") return;

    img.removeEventListener("transitionend", onFadeOut);

    img.src = nextSrc;

    // ensure src change is applied before fading back in
    requestAnimationFrame(() => {
      img.style.opacity = 1;
    });
  };

  img.addEventListener("transitionend", onFadeOut);

  // start fade out
  img.style.opacity = 0;
}

setInterval(() => 
{
  const img = thumbImages[activeThumb];
  const list = getScreenshots();

  swapImage(img, list[screenshotIndex]);

  thumbShotIndex[activeThumb] = screenshotIndex;
  activeThumb = (activeThumb + 1) % thumbImages.length;
  screenshotIndex = (screenshotIndex + 1) % list.length;
}, 2000);

let lastWidth = window.innerWidth;

window.addEventListener("resize", () => {
  const w = window.innerWidth;
  if (w === lastWidth) return; // ignore scroll-induced resize
  thumbImages.forEach((img, i) => {
    const list = getScreenshots(i);
    img.src = list[thumbShotIndex[i]];
  });
});