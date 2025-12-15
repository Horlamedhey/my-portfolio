import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

/**
 * Staggered text reveal animation
 */
export function animateTextReveal(
	elements: HTMLElement[] | NodeListOf<Element>,
	options: {
		delay?: number;
		stagger?: number;
		duration?: number;
	} = {}
) {
	const { delay = 0, stagger = 0.1, duration = 1 } = options;

	gsap.fromTo(
		elements,
		{
			y: 100,
			opacity: 0,
			rotateX: -90
		},
		{
			y: 0,
			opacity: 1,
			rotateX: 0,
			duration,
			stagger,
			delay,
			ease: 'power4.out'
		}
	);
}

/**
 * Fade up animation for sections
 */
export function animateFadeUp(
	element: HTMLElement,
	options: {
		trigger?: HTMLElement;
		start?: string;
		duration?: number;
		y?: number;
	} = {}
) {
	const { trigger, start = 'top 80%', duration = 1, y = 60 } = options;

	gsap.fromTo(
		element,
		{
			y,
			opacity: 0
		},
		{
			y: 0,
			opacity: 1,
			duration,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: trigger || element,
				start
			}
		}
	);
}

/**
 * Staggered children animation
 */
export function animateStaggerChildren(
	parent: HTMLElement,
	childSelector: string,
	options: {
		start?: string;
		stagger?: number;
		duration?: number;
		y?: number;
	} = {}
) {
	const { start = 'top 80%', stagger = 0.1, duration = 0.8, y = 40 } = options;
	const children = parent.querySelectorAll(childSelector);

	gsap.fromTo(
		children,
		{
			y,
			opacity: 0
		},
		{
			y: 0,
			opacity: 1,
			duration,
			stagger,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: parent,
				start
			}
		}
	);
}

/**
 * Horizontal scroll section
 */
export function createHorizontalScroll(
	container: HTMLElement,
	wrapper: HTMLElement,
	options: {
		ease?: string;
		scrub?: number | boolean;
	} = {}
) {
	const { ease = 'none', scrub = 1 } = options;

	const scrollWidth = wrapper.scrollWidth - container.clientWidth;

	gsap.to(wrapper, {
		x: -scrollWidth,
		ease,
		scrollTrigger: {
			trigger: container,
			start: 'top top',
			end: () => `+=${scrollWidth}`,
			pin: true,
			scrub,
			invalidateOnRefresh: true
		}
	});
}

/**
 * Parallax effect
 */
export function createParallax(
	element: HTMLElement,
	options: {
		speed?: number;
		direction?: 'up' | 'down';
	} = {}
) {
	const { speed = 0.5, direction = 'up' } = options;
	const multiplier = direction === 'up' ? -1 : 1;

	gsap.to(element, {
		y: () => window.innerHeight * speed * multiplier,
		ease: 'none',
		scrollTrigger: {
			trigger: element,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true
		}
	});
}

/**
 * Scale on scroll
 */
export function animateScaleOnScroll(
	element: HTMLElement,
	options: {
		start?: string;
		end?: string;
		fromScale?: number;
		toScale?: number;
	} = {}
) {
	const { start = 'top bottom', end = 'top center', fromScale = 0.8, toScale = 1 } = options;

	gsap.fromTo(
		element,
		{ scale: fromScale, opacity: 0 },
		{
			scale: toScale,
			opacity: 1,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: element,
				start,
				end,
				scrub: 1
			}
		}
	);
}

/**
 * Line drawing animation
 */
export function animateLineDraw(
	element: HTMLElement | SVGPathElement,
	options: {
		duration?: number;
		delay?: number;
	} = {}
) {
	const { duration = 1.5, delay = 0 } = options;

	if (element instanceof SVGPathElement) {
		const length = element.getTotalLength();
		gsap.set(element, {
			strokeDasharray: length,
			strokeDashoffset: length
		});
		gsap.to(element, {
			strokeDashoffset: 0,
			duration,
			delay,
			ease: 'power2.inOut'
		});
	}
}

/**
 * Magnetic effect for buttons
 */
export function createMagneticEffect(element: HTMLElement, strength: number = 0.3) {
	const handleMouseMove = (e: MouseEvent) => {
		const rect = element.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const deltaX = (e.clientX - centerX) * strength;
		const deltaY = (e.clientY - centerY) * strength;

		gsap.to(element, {
			x: deltaX,
			y: deltaY,
			duration: 0.3,
			ease: 'power2.out'
		});
	};

	const handleMouseLeave = () => {
		gsap.to(element, {
			x: 0,
			y: 0,
			duration: 0.5,
			ease: 'elastic.out(1, 0.3)'
		});
	};

	element.addEventListener('mousemove', handleMouseMove);
	element.addEventListener('mouseleave', handleMouseLeave);

	return () => {
		element.removeEventListener('mousemove', handleMouseMove);
		element.removeEventListener('mouseleave', handleMouseLeave);
	};
}

/**
 * Text split utility
 */
export function splitTextToSpans(element: HTMLElement): HTMLSpanElement[] {
	const text = element.textContent || '';
	const words = text.split(' ');

	element.innerHTML = '';

	const spans = words.map((word, index) => {
		const wordSpan = document.createElement('span');
		wordSpan.style.display = 'inline-block';
		wordSpan.style.overflow = 'hidden';

		const innerSpan = document.createElement('span');
		innerSpan.textContent = word;
		innerSpan.style.display = 'inline-block';

		wordSpan.appendChild(innerSpan);
		element.appendChild(wordSpan);

		// Add space after word (except last)
		if (index < words.length - 1) {
			element.appendChild(document.createTextNode(' '));
		}

		return innerSpan;
	});

	return spans;
}

/**
 * Refresh ScrollTrigger (call after layout changes)
 */
export function refreshScrollTrigger() {
	if (typeof window !== 'undefined') {
		ScrollTrigger.refresh();
	}
}

/**
 * Kill all ScrollTriggers (cleanup)
 */
export function killAllScrollTriggers() {
	if (typeof window !== 'undefined') {
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	}
}

