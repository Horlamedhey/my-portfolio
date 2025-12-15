<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	let cursorX = spring(0, { stiffness: 0.15, damping: 0.7 });
	let cursorY = spring(0, { stiffness: 0.15, damping: 0.7 });
	let isHovering = $state(false);
	let isText = $state(false);
	let isVisible = $state(false);
	let cursorElement: HTMLDivElement;

	onMount(() => {
		// Check if device has hover capability (not touch)
		const hasHover = window.matchMedia('(hover: hover)').matches;
		if (!hasHover) return;

		const handleMouseMove = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
			if (!isVisible) isVisible = true;
		};

		const handleMouseEnter = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.tagName === 'A' ||
				target.tagName === 'BUTTON' ||
				target.closest('a') ||
				target.closest('button') ||
				target.dataset.cursor === 'hover'
			) {
				isHovering = true;
			}
			if (target.dataset.cursor === 'text') {
				isText = true;
			}
		};

		const handleMouseLeave = () => {
			isHovering = false;
			isText = false;
		};

		const handleMouseOut = () => {
			isVisible = false;
		};

		const handleMouseOver = () => {
			isVisible = true;
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseover', handleMouseEnter, true);
		document.addEventListener('mouseout', handleMouseLeave, true);
		document.documentElement.addEventListener('mouseleave', handleMouseOut);
		document.documentElement.addEventListener('mouseenter', handleMouseOver);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseover', handleMouseEnter, true);
			document.removeEventListener('mouseout', handleMouseLeave, true);
			document.documentElement.removeEventListener('mouseleave', handleMouseOut);
			document.documentElement.removeEventListener('mouseenter', handleMouseOver);
		};
	});
</script>

<div
	bind:this={cursorElement}
	class="cursor"
	class:cursor-hover={isHovering}
	class:cursor-text={isText}
	class:cursor-visible={isVisible}
	style="transform: translate({$cursorX}px, {$cursorY}px) translate(-50%, -50%)"
></div>

<style>
	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		width: 16px;
		height: 16px;
		background-color: var(--color-accent);
		border-radius: 50%;
		pointer-events: none;
		z-index: 9999;
		mix-blend-mode: difference;
		opacity: 0;
		transition:
			width 0.2s cubic-bezier(0.4, 0, 0.2, 1),
			height 0.2s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		will-change: transform;
	}

	.cursor-visible {
		opacity: 1;
	}

	.cursor-hover {
		width: 60px;
		height: 60px;
		background-color: #fafafa;
	}

	.cursor-text {
		width: 120px;
		height: 120px;
		background-color: #fafafa;
	}

	@media (hover: none) {
		.cursor {
			display: none;
		}
	}
</style>

