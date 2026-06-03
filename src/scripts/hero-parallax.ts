import { gsap } from 'gsap';

const hero = document.querySelector<HTMLElement>('[data-hero]');
const image = hero?.querySelector<HTMLImageElement>('[data-hero-image]');

if (hero && image) {
	const mm = gsap.matchMedia();

	// Only run the drift when motion is allowed and a fine pointer (mouse) is present.
	mm.add(
		'(prefers-reduced-motion: no-preference) and (pointer: fine)',
		() => {
			const MAX_SHIFT = 24; // px the image drifts at the edges

			// Scale up slightly so the drift never exposes the image edges.
			gsap.set(image, { scale: 1.08 });

			const moveX = gsap.quickTo(image, 'x', { duration: 0.9, ease: 'power3.out' });
			const moveY = gsap.quickTo(image, 'y', { duration: 0.9, ease: 'power3.out' });

			const handleMove = (event: PointerEvent) => {
				const rect = hero.getBoundingClientRect();
				// -1..1 relative to hero center
				const px = (event.clientX - rect.left) / rect.width - 0.5;
				const py = (event.clientY - rect.top) / rect.height - 0.5;
				// Negative => move opposite to the cursor
				moveX(-px * MAX_SHIFT * 2);
				moveY(-py * MAX_SHIFT * 2);
			};

			const reset = () => {
				moveX(0);
				moveY(0);
			};

			hero.addEventListener('pointermove', handleMove);
			hero.addEventListener('pointerleave', reset);

			return () => {
				hero.removeEventListener('pointermove', handleMove);
				hero.removeEventListener('pointerleave', reset);
				gsap.set(image, { x: 0, y: 0, scale: 1 });
			};
		},
	);
}
