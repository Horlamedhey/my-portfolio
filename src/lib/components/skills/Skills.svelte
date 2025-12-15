<script lang="ts">
	import { onMount } from 'svelte';
	import { skills } from '$lib/data/resume';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let sectionElement: HTMLElement;
	let activeCategory = $state(0);

	// All unique technologies for the floating animation
	const allTech = skills.flatMap((s) => s.items);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Animate section header
		gsap.fromTo(
			sectionElement.querySelector('.section-header'),
			{ y: 60, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionElement,
					start: 'top 80%'
				}
			}
		);

		// Animate skill categories
		const categories = sectionElement.querySelectorAll('.skill-category');
		categories.forEach((cat, i) => {
			gsap.fromTo(
				cat,
				{ x: -60, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.8,
					delay: i * 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: sectionElement.querySelector('.skills-container'),
						start: 'top 75%'
					}
				}
			);
		});

		// Animate skill items with stagger
		const items = sectionElement.querySelectorAll('.skill-item');
		gsap.fromTo(
			items,
			{ scale: 0, opacity: 0 },
			{
				scale: 1,
				opacity: 1,
				duration: 0.5,
				stagger: 0.03,
				ease: 'back.out(1.7)',
				scrollTrigger: {
					trigger: sectionElement.querySelector('.skills-visual'),
					start: 'top 80%'
				}
			}
		);

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<section bind:this={sectionElement} class="skills section" id="skills">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header">
			<span class="section-number">03</span>
			<h2 class="section-title">Skills & Technologies</h2>
			<p class="section-subtitle">
				A diverse toolkit refined over 8+ years of building digital products
			</p>
		</div>

		<div class="skills-container">
			<!-- Category tabs -->
			<div class="skills-categories">
				{#each skills as skill, i}
					<button
						class="skill-category"
						class:active={activeCategory === i}
						onclick={() => (activeCategory = i)}
					>
						<span class="category-name">{skill.category}</span>
						<span class="category-count">{skill.items.length}</span>
					</button>
				{/each}
			</div>

			<!-- Skills visualization -->
			<div class="skills-visual">
				<!-- Active category skills -->
				<div class="skills-grid">
					{#each skills[activeCategory].items as item, i}
						<div
							class="skill-item"
							style="animation-delay: {i * 50}ms"
						>
							<span class="skill-name">{item}</span>
							<div class="skill-bar">
								<div
									class="skill-bar-fill"
									style="width: {85 + Math.random() * 15}%"
								></div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Decorative floating tags -->
				<div class="floating-tags" aria-hidden="true">
					{#each allTech.slice(0, 12) as tech, i}
						<span
							class="floating-tag"
							style="
								--delay: {i * 0.5}s;
								--x: {Math.random() * 100}%;
								--y: {Math.random() * 100}%;
							"
						>
							{tech}
						</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- Tech marquee -->
		<div class="tech-marquee">
			<div class="marquee-track">
				{#each [...allTech, ...allTech] as tech}
					<span class="marquee-item">{tech}</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.skills {
		position: relative;
		background: var(--color-bg);
		overflow: hidden;
	}

	.section-header {
		margin-bottom: 4rem;
	}

	.section-number {
		display: block;
		font-family: var(--font-display);
		font-size: 0.875rem;
		color: var(--color-accent);
		font-weight: 600;
		letter-spacing: 0.2em;
		margin-bottom: 1rem;
	}

	.section-title {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.section-subtitle {
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		color: var(--color-text-muted);
		max-width: 500px;
	}

	.skills-container {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 4rem;
		align-items: start;
	}

	@media (max-width: 900px) {
		.skills-container {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	.skills-categories {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		position: sticky;
		top: 120px;
	}

	@media (max-width: 900px) {
		.skills-categories {
			flex-direction: row;
			flex-wrap: wrap;
			position: static;
		}
	}

	.skill-category {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		background: transparent;
		border: 1px solid var(--color-border-subtle);
		border-radius: 8px;
		font-family: var(--font-body);
		font-size: 1rem;
		color: var(--color-text-muted);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.skill-category:hover {
		border-color: var(--color-border);
		color: var(--color-text);
	}

	.skill-category.active {
		background: var(--color-bg-elevated);
		border-color: var(--color-accent);
		color: var(--color-text);
	}

	.category-name {
		font-weight: 500;
	}

	.category-count {
		font-size: 0.75rem;
		color: var(--color-accent);
		background: rgba(249, 115, 22, 0.1);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.skills-visual {
		position: relative;
		min-height: 400px;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.skill-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.25rem;
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-border-subtle);
		border-radius: 12px;
		transition: all 0.3s ease;
	}

	.skill-item:hover {
		border-color: var(--color-accent);
		transform: translateY(-2px);
	}

	.skill-name {
		font-family: var(--font-body);
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text);
	}

	.skill-bar {
		height: 4px;
		background: var(--color-border-subtle);
		border-radius: 2px;
		overflow: hidden;
	}

	.skill-bar-fill {
		height: 100%;
		background: linear-gradient(
			90deg,
			var(--color-accent) 0%,
			var(--color-accent-hover) 100%
		);
		border-radius: 2px;
		transform-origin: left;
		animation: fillBar 1s ease-out forwards;
		animation-delay: inherit;
	}

	@keyframes fillBar {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	.floating-tags {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.1;
	}

	.floating-tag {
		position: absolute;
		left: var(--x);
		top: var(--y);
		font-family: var(--font-display);
		font-size: 0.75rem;
		color: var(--color-accent);
		animation: float 20s ease-in-out infinite;
		animation-delay: var(--delay);
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(20px, -20px) rotate(5deg);
		}
		50% {
			transform: translate(-10px, 10px) rotate(-3deg);
		}
		75% {
			transform: translate(15px, 15px) rotate(3deg);
		}
	}

	.tech-marquee {
		margin-top: 6rem;
		overflow: hidden;
		padding: 2rem 0;
		border-top: 1px solid var(--color-border-subtle);
		border-bottom: 1px solid var(--color-border-subtle);
	}

	.marquee-track {
		display: flex;
		gap: 4rem;
		animation: marquee 30s linear infinite;
		width: max-content;
	}

	.marquee-item {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 500;
		color: var(--color-text-muted);
		white-space: nowrap;
		opacity: 0.5;
		transition: opacity 0.3s ease;
	}

	.marquee-item:hover {
		opacity: 1;
		color: var(--color-accent);
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.tech-marquee:hover .marquee-track {
		animation-play-state: paused;
	}
</style>

