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

const screenshots = ['screenshots/desktop1.png'];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-img');

let index = 0;

function show(i) 
{
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
