<script lang="ts">
	import { onMount } from 'svelte';
	import { personalInfo } from '$lib/data/resume';

	let isScrolled = $state(false);
	let isMenuOpen = $state(false);

	const navLinks = [
		{ label: 'Work', href: '#work' },
		{ label: 'Experience', href: '#experience' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Contact', href: '#contact' }
	];

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header
	class="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
	class:header-scrolled={isScrolled}
>
	<nav class="container flex items-center justify-between py-5">
		<!-- Logo -->
		<a
			href="/"
			class="text-display text-xl font-semibold tracking-tight transition-opacity hover:opacity-70"
		>
			{personalInfo.name.split(' ')[0]}<span class="text-accent">.</span>
		</a>

		<!-- Desktop Navigation -->
		<ul class="hidden items-center gap-8 md:flex">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="nav-link text-sm font-medium uppercase tracking-wider text-muted transition-colors hover:text-white"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- CTA Button -->
		<a
			href="#contact"
			class="hidden rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-all hover:bg-accent-hover hover:scale-105 md:block"
		>
			Let's Talk
		</a>

		<!-- Mobile Menu Toggle -->
		<button
			onclick={toggleMenu}
			class="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
			aria-label="Toggle menu"
		>
			<span
				class="h-0.5 w-6 bg-white transition-all duration-300"
				class:rotate-45={isMenuOpen}
				class:translate-y-2={isMenuOpen}
			></span>
			<span
				class="h-0.5 w-6 bg-white transition-all duration-300"
				class:opacity-0={isMenuOpen}
			></span>
			<span
				class="h-0.5 w-6 bg-white transition-all duration-300"
				class:-rotate-45={isMenuOpen}
				class:-translate-y-2={isMenuOpen}
			></span>
		</button>
	</nav>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div
			class="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg md:hidden"
			role="dialog"
			aria-modal="true"
		>
			<ul class="flex flex-col items-center gap-8">
				{#each navLinks as link, i}
					<li
						class="animate-slide-up opacity-0"
						style="animation-delay: {i * 0.1}s"
					>
						<a
							href={link.href}
							onclick={closeMenu}
							class="text-display text-4xl font-semibold transition-colors hover:text-accent"
						>
							{link.label}
						</a>
					</li>
				{/each}
				<li class="animate-slide-up opacity-0 mt-8" style="animation-delay: 0.4s">
					<a
						href="#contact"
						onclick={closeMenu}
						class="rounded-full bg-accent px-8 py-4 text-lg font-medium text-bg transition-all hover:bg-accent-hover"
					>
						Let's Talk
					</a>
				</li>
			</ul>
		</div>
	{/if}
</header>

<style>
	.header-scrolled {
		background-color: rgba(10, 10, 11, 0.8);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-border-subtle);
	}

	.nav-link {
		position: relative;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 2px;
		background-color: var(--color-accent);
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.text-muted {
		color: var(--color-text-muted);
	}

	.text-accent {
		color: var(--color-accent);
	}

	.text-bg {
		color: var(--color-bg);
	}

	.bg-accent {
		background-color: var(--color-accent);
	}

	.bg-accent-hover:hover {
		background-color: var(--color-accent-hover);
	}

	.bg-bg {
		background-color: var(--color-bg);
	}
</style>

