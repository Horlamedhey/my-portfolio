<script lang="ts">
	import { spring } from 'svelte/motion';
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?: 'primary' | 'secondary' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		children: Snippet;
		class?: string;
		onclick?: () => void;
	}

	let {
		href,
		type = 'button',
		variant = 'primary',
		size = 'md',
		children,
		class: className = '',
		onclick
	}: Props = $props();

	const position = spring({ x: 0, y: 0 }, { stiffness: 0.15, damping: 0.6 });
	let buttonElement: HTMLElement;

	function handleMouseMove(e: MouseEvent) {
		if (!buttonElement) return;
		const rect = buttonElement.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		position.set({
			x: (e.clientX - centerX) * 0.25,
			y: (e.clientY - centerY) * 0.25
		});
	}

	function handleMouseLeave() {
		position.set({ x: 0, y: 0 });
	}

	const sizeClasses = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};

	const variantClasses = {
		primary: 'bg-accent text-bg hover:bg-accent-hover',
		secondary: 'bg-elevated text-white hover:bg-subtle',
		outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-bg'
	};
</script>

{#if href}
	<a
		bind:this={buttonElement}
		{href}
		class="magnetic-button {sizeClasses[size]} {variantClasses[variant]} {className}"
		style="transform: translate({$position.x}px, {$position.y}px)"
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
	>
		<span class="magnetic-button-inner">
			{@render children()}
		</span>
	</a>
{:else}
	<button
		bind:this={buttonElement}
		{type}
		class="magnetic-button {sizeClasses[size]} {variantClasses[variant]} {className}"
		style="transform: translate({$position.x}px, {$position.y}px)"
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		{onclick}
	>
		<span class="magnetic-button-inner">
			{@render children()}
		</span>
	</button>
{/if}

<style>
	.magnetic-button {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-body);
		font-weight: 500;
		border-radius: 9999px;
		overflow: hidden;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
		will-change: transform;
	}

	.magnetic-button-inner {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.magnetic-button::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.1) 0%,
			rgba(255, 255, 255, 0) 100%
		);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.magnetic-button:hover::before {
		opacity: 1;
	}

	.bg-accent {
		background-color: var(--color-accent);
	}

	.bg-accent-hover:hover {
		background-color: var(--color-accent-hover);
	}

	.bg-elevated {
		background-color: var(--color-bg-elevated);
	}

	.bg-subtle:hover {
		background-color: var(--color-bg-subtle);
	}

	.text-bg {
		color: var(--color-bg);
	}

	.text-accent {
		color: var(--color-accent);
	}

	.border-accent {
		border-color: var(--color-accent);
	}
</style>

