<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import Lenis from 'lenis';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	let lenis: Lenis;

	onMount(() => {
		lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			touchMultiplier: 2
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Add lenis class to html for CSS
		document.documentElement.classList.add('lenis', 'lenis-smooth');

		return () => {
			lenis.destroy();
			document.documentElement.classList.remove('lenis', 'lenis-smooth');
		};
	});
</script>

{@render children()}

