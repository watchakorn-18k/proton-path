import { gsap } from 'gsap';

const journal = document.querySelector<HTMLElement>('[data-journal]');

if (journal) {
	const feature = journal.querySelector<HTMLAnchorElement>('[data-journal-feature]');
	const image = journal.querySelector<HTMLImageElement>('[data-journal-image]');
	const nextImageLayer = journal.querySelector<HTMLImageElement>('[data-journal-next-image]');
	const number = journal.querySelector<HTMLElement>('[data-journal-number]');
	const meta = journal.querySelector<HTMLElement>('[data-journal-meta]');
	const title = journal.querySelector<HTMLElement>('[data-journal-title]');
	const triggers = [...journal.querySelectorAll<HTMLAnchorElement>('[data-journal-trigger]')];
	const fallbackImage = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/route-texture.webp`;
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	let activeUrl = feature?.href ?? '';
	let activeIndex = 0;
	let transition: gsap.core.Timeline | null = null;
	let autoplay: number | undefined;
	let paused = false;

	const handleImageError = (img: HTMLImageElement | null) => {
		img?.addEventListener('error', () => {
			if (img.src.endsWith(fallbackImage)) return;
			img.src = fallbackImage;
		});
	};

	handleImageError(image);
	handleImageError(nextImageLayer);

	if (nextImageLayer) {
		gsap.set(nextImageLayer, { autoAlpha: 0, scale: 1.02 });
	}

	const setActive = (trigger: HTMLAnchorElement, index = triggers.indexOf(trigger)) => {
		if (!feature || !image || !nextImageLayer || !number || !meta || !title) return;

		const nextTitle = trigger.dataset.title;
		const nextImage = trigger.dataset.image;
		const nextUrl = trigger.dataset.url;
		const nextNumber = trigger.dataset.number;
		const nextMeta = trigger.dataset.meta;

		if (!nextTitle || !nextImage || !nextUrl || !nextNumber || !nextMeta) return;
		if (feature.href.endsWith(nextUrl) && activeUrl.endsWith(nextUrl)) return;

		activeUrl = nextUrl;
		activeIndex = index;
		triggers.forEach((item) => item.removeAttribute('data-active'));
		trigger.setAttribute('data-active', 'true');

		const content = [number, meta, title];
		transition?.kill();

		if (reduceMotion) {
			feature.href = nextUrl;
			image.src = nextImage;
			image.alt = nextTitle;
			number.textContent = nextNumber;
			meta.textContent = nextMeta;
			title.textContent = nextTitle;
			return;
		}

		nextImageLayer.src = nextImage;
		nextImageLayer.alt = '';

		transition = gsap.timeline({ defaults: { ease: 'power3.inOut', overwrite: 'auto' } });
		transition
			.set(nextImageLayer, { autoAlpha: 0, scale: 1.045 })
			.to(nextImageLayer, { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'power3.out' })
			.to(image, { autoAlpha: 0, scale: 0.985, duration: 0.55, ease: 'power3.out' }, '<')
			.to(content, { autoAlpha: 0, y: 10, duration: 0.2, stagger: 0.025 }, '<0.06')
			.add(() => {
				feature.href = nextUrl;
				image.src = nextImage;
				image.alt = nextTitle;
				number.textContent = nextNumber;
				meta.textContent = nextMeta;
				title.textContent = nextTitle;
			})
			.set(image, { autoAlpha: 1, scale: 1 })
			.set(nextImageLayer, { autoAlpha: 0, scale: 1.02 })
			.set(content, { y: -8 })
			.to(content, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.045, ease: 'power3.out' }, '<0.02');
	};

	const startAutoplay = () => {
		if (reduceMotion || triggers.length < 2) return;
		window.clearInterval(autoplay);
		autoplay = window.setInterval(() => {
			if (paused) return;
			const nextIndex = (activeIndex + 1) % triggers.length;
			setActive(triggers[nextIndex], nextIndex);
		}, 10_000);
	};

	triggers.forEach((trigger, index) => {
		if (index === 0) trigger.setAttribute('data-active', 'true');
		trigger.addEventListener('mouseenter', () => setActive(trigger, index));
		trigger.addEventListener('focus', () => setActive(trigger, index));
	});

	journal.addEventListener('mouseenter', () => {
		paused = true;
	});

	journal.addEventListener('mouseleave', () => {
		paused = false;
	});

	journal.addEventListener('focusin', () => {
		paused = true;
	});

	journal.addEventListener('focusout', () => {
		paused = false;
	});

	startAutoplay();
}
