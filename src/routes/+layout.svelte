<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import SmoothScroll from '$lib/components/ui/SmoothScroll.svelte';
	import CustomCursor from '$lib/components/ui/CustomCursor.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';

	let { children } = $props();
	let isLoading = $state(true);

	onMount(() => {
		// Simulate initial load
		setTimeout(() => {
			isLoading = false;
		}, 500);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Gafar Ajao | Senior Frontend Engineer</title>
	<meta
		name="description"
		content="Frontend Engineer with 8+ years of experience building exceptional digital experiences with React, Vue, Svelte, and modern web technologies."
	/>
	<meta name="theme-color" content="#0a0a0b" />

	<!-- Open Graph -->
	<meta property="og:title" content="Gafar Ajao | Senior Frontend Engineer" />
	<meta
		property="og:description"
		content="Frontend Engineer with 8+ years of experience building exceptional digital experiences."
	/>
	<meta property="og:type" content="website" />

	<!-- Preconnect to font CDN -->
	<link rel="preconnect" href="https://api.fontshare.com" crossorigin="anonymous" />
</svelte:head>

{#if isLoading}
	<div class="loader">
		<div class="loader-content">
			<div class="loader-logo">G<span class="loader-dot">.</span></div>
			<div class="loader-bar">
				<div class="loader-progress"></div>
			</div>
		</div>
	</div>
{:else}
	<SmoothScroll>
		<CustomCursor />
		<Navbar />
		<main>
			{@render children()}
		</main>
		<div class="noise-overlay"></div>
	</SmoothScroll>
{/if}

<style>
	.loader {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg);
		z-index: 9999;
	}

	.loader-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.loader-logo {
		font-family: var(--font-display);
		font-size: 4rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.loader-dot {
		color: var(--color-accent);
	}

	.loader-bar {
		width: 200px;
		height: 2px;
		background: var(--color-border);
		border-radius: 1px;
		overflow: hidden;
	}

	.loader-progress {
		width: 100%;
		height: 100%;
		background: var(--color-accent);
		animation: loadProgress 0.5s ease-out forwards;
	}

	@keyframes loadProgress {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	main {
		position: relative;
		z-index: 1;
	}
</style>
