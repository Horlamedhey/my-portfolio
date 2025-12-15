<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Canvas } from '@threlte/core';
	import HeroScene from './HeroScene.svelte';
	import { personalInfo, stats } from '$lib/data/resume';
	import MagneticButton from '$lib/components/ui/MagneticButton.svelte';

	let isLoaded = $state(false);
	let scrollY = $state(0);

	const nameWords = personalInfo.name.split(' ');
	const titleWords = personalInfo.title.split(' ');

	onMount(() => {
		// Trigger animations after mount
		setTimeout(() => {
			isLoaded = true;
		}, 100);

		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<section class="hero" id="hero">
	<!-- Background gradient -->
	<div class="hero-gradient" style="opacity: {1 - scrollY / 800}"></div>

	<!-- 3D Scene -->
	<div class="hero-canvas" style="opacity: {1 - scrollY / 600}">
		<Canvas>
			<HeroScene />
		</Canvas>
	</div>

	<!-- Content -->
	<div class="container hero-content">
		<div class="hero-text">
			<!-- Greeting -->
			{#if isLoaded}
				<p
					class="hero-greeting"
					in:fly={{ y: 30, duration: 800, delay: 0, easing: quintOut }}
				>
					Hello, I'm
				</p>
			{/if}

			<!-- Name -->
			<h1 class="hero-name">
				{#if isLoaded}
					{#each nameWords as word, i}
						<span
							class="hero-name-word"
							in:fly={{ y: 100, duration: 1000, delay: 200 + i * 150, easing: quintOut }}
						>
							{word}
						</span>
					{/each}
				{/if}
			</h1>

			<!-- Title -->
			<h2 class="hero-title">
				{#if isLoaded}
					{#each titleWords as word, i}
						<span
							class="hero-title-word"
							in:fly={{ y: 50, duration: 800, delay: 600 + i * 100, easing: quintOut }}
						>
							{word}
						</span>
					{/each}
				{/if}
			</h2>

			<!-- Tagline -->
			{#if isLoaded}
				<p
					class="hero-tagline"
					in:fly={{ y: 30, duration: 800, delay: 1000, easing: quintOut }}
				>
					{personalInfo.tagline}
				</p>
			{/if}

			<!-- CTA Buttons -->
			{#if isLoaded}
				<div
					class="hero-cta"
					in:fly={{ y: 30, duration: 800, delay: 1200, easing: quintOut }}
				>
					<MagneticButton href="#work" variant="primary" size="lg">
						View My Work
					</MagneticButton>
					<MagneticButton href="#contact" variant="outline" size="lg">
						Get In Touch
					</MagneticButton>
				</div>
			{/if}
		</div>

		<!-- Stats -->
		{#if isLoaded}
			<div
				class="hero-stats"
				in:fade={{ duration: 800, delay: 1400 }}
			>
				{#each stats as stat, i}
					<div
						class="stat"
						in:fly={{ y: 30, duration: 600, delay: 1500 + i * 100, easing: quintOut }}
					>
						<span class="stat-value">{stat.value}</span>
						<span class="stat-label">{stat.label}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Scroll indicator -->
	{#if isLoaded}
		<div
			class="scroll-indicator"
			in:fade={{ duration: 800, delay: 2000 }}
			style="opacity: {1 - scrollY / 200}"
		>
			<span class="scroll-text">Scroll</span>
			<div class="scroll-line">
				<div class="scroll-dot"></div>
			</div>
		</div>
	{/if}
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		padding-top: 80px;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: radial-gradient(
				ellipse 80% 50% at 50% -20%,
				rgba(249, 115, 22, 0.15) 0%,
				transparent 50%
			),
			radial-gradient(
				ellipse 60% 40% at 80% 60%,
				rgba(249, 115, 22, 0.08) 0%,
				transparent 40%
			);
		pointer-events: none;
	}

	.hero-canvas {
		position: absolute;
		top: 0;
		right: -10%;
		width: 60%;
		height: 100%;
		pointer-events: none;
	}

	@media (max-width: 1024px) {
		.hero-canvas {
			right: -20%;
			width: 80%;
			opacity: 0.5;
		}
	}

	@media (max-width: 768px) {
		.hero-canvas {
			right: -30%;
			width: 100%;
			opacity: 0.3;
		}
	}

	.hero-content {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.hero-text {
		max-width: 800px;
	}

	.hero-greeting {
		font-family: var(--font-body);
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--color-accent);
		font-weight: 500;
		margin-bottom: 1rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.hero-name {
		font-family: var(--font-display);
		font-size: clamp(3.5rem, 12vw, 9rem);
		font-weight: 600;
		line-height: 0.95;
		letter-spacing: -0.03em;
		margin-bottom: 1rem;
		overflow: hidden;
	}

	.hero-name-word {
		display: inline-block;
		margin-right: 0.3em;
	}

	.hero-name-word:last-child {
		color: var(--color-accent);
	}

	.hero-title {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		font-weight: 500;
		color: var(--color-text-muted);
		margin-bottom: 1.5rem;
		overflow: hidden;
	}

	.hero-title-word {
		display: inline-block;
		margin-right: 0.25em;
	}

	.hero-tagline {
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		color: var(--color-text-muted);
		max-width: 500px;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.hero-stats {
		display: flex;
		flex-wrap: wrap;
		gap: 3rem;
		padding-top: 3rem;
		border-top: 1px solid var(--color-border-subtle);
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stat-value {
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 600;
		color: var(--color-text);
		line-height: 1;
	}

	.stat-label {
		font-family: var(--font-body);
		font-size: 0.875rem;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 3rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.scroll-text {
		font-family: var(--font-body);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.scroll-line {
		width: 1px;
		height: 60px;
		background: var(--color-border);
		position: relative;
		overflow: hidden;
	}

	.scroll-dot {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 3px;
		height: 8px;
		background: var(--color-accent);
		border-radius: 2px;
		animation: scrollDot 2s ease-in-out infinite;
	}

	@keyframes scrollDot {
		0%,
		100% {
			top: 0;
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			top: 100%;
			opacity: 0;
		}
	}
</style>

