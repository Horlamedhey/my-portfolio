<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { experiences } from '$lib/data/resume';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let sectionElement: HTMLElement;
	let isVisible = $state(false);
	let activeIndex = $state(0);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Animate section title
		const titleAnimation = gsap.fromTo(
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

		// Animate each experience card
		const cards = sectionElement.querySelectorAll('.experience-card');
		cards.forEach((card, i) => {
			gsap.fromTo(
				card,
				{ y: 80, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					delay: i * 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: card,
						start: 'top 85%'
					}
				}
			);
		});

		// Animate timeline line
		gsap.fromTo(
			sectionElement.querySelector('.timeline-line-progress'),
			{ scaleY: 0 },
			{
				scaleY: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: sectionElement.querySelector('.experience-list'),
					start: 'top 60%',
					end: 'bottom 40%',
					scrub: 1
				}
			}
		);

		isVisible = true;

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<section bind:this={sectionElement} class="experience section" id="experience">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header">
			<span class="section-number">02</span>
			<h2 class="section-title">Experience</h2>
			<p class="section-subtitle">
				A journey through innovative companies and impactful projects
			</p>
		</div>

		<!-- Experience List -->
		<div class="experience-list">
			<!-- Timeline Line -->
			<div class="timeline-line">
				<div class="timeline-line-progress"></div>
			</div>

			{#each experiences.slice(0, 6) as exp, i}
				<article
					class="experience-card"
					class:active={activeIndex === i}
					onmouseenter={() => (activeIndex = i)}
				>
					<div class="experience-timeline">
						<div class="timeline-dot"></div>
						<span class="timeline-period">{exp.period}</span>
					</div>

					<div class="experience-content">
						<div class="experience-header">
							<h3 class="experience-role">{exp.role}</h3>
							<div class="experience-company">
								<span class="company-name">{exp.company}</span>
								<span class="company-location">{exp.location}</span>
							</div>
						</div>

						<ul class="experience-highlights">
							{#each exp.highlights as highlight}
								<li>{highlight}</li>
							{/each}
						</ul>

						<div class="experience-tech">
							{#each exp.technologies as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>

		<!-- View More Link -->
		<div class="experience-more">
			<a href="#" class="more-link">
				<span>View Full Experience</span>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.experience {
		position: relative;
		background: var(--color-bg);
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

	.experience-list {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.timeline-line {
		position: absolute;
		left: 140px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--color-border);
	}

	.timeline-line-progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--color-accent);
		transform-origin: top;
	}

	@media (max-width: 768px) {
		.timeline-line {
			left: 20px;
		}
	}

	.experience-card {
		position: relative;
		display: grid;
		grid-template-columns: 160px 1fr;
		gap: 3rem;
		padding: 3rem 0;
		border-bottom: 1px solid var(--color-border-subtle);
		transition: background-color 0.3s ease;
	}

	.experience-card:hover {
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(249, 115, 22, 0.03) 50%,
			transparent 100%
		);
	}

	@media (max-width: 768px) {
		.experience-card {
			grid-template-columns: 40px 1fr;
			gap: 1.5rem;
			padding: 2rem 0;
		}
	}

	.experience-timeline {
		position: relative;
	}

	.timeline-dot {
		position: absolute;
		right: -24px;
		top: 8px;
		width: 12px;
		height: 12px;
		background: var(--color-bg);
		border: 2px solid var(--color-border);
		border-radius: 50%;
		transition: all 0.3s ease;
	}

	.experience-card:hover .timeline-dot,
	.experience-card.active .timeline-dot {
		background: var(--color-accent);
		border-color: var(--color-accent);
		box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
	}

	@media (max-width: 768px) {
		.timeline-dot {
			right: auto;
			left: 14px;
		}
	}

	.timeline-period {
		font-family: var(--font-body);
		font-size: 0.875rem;
		color: var(--color-text-muted);
		white-space: nowrap;
	}

	@media (max-width: 768px) {
		.timeline-period {
			display: none;
		}
	}

	.experience-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.experience-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.experience-role {
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 2vw, 1.5rem);
		font-weight: 600;
		color: var(--color-text);
	}

	.experience-company {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--font-body);
		font-size: 1rem;
	}

	.company-name {
		color: var(--color-accent);
		font-weight: 500;
	}

	.company-location {
		color: var(--color-text-muted);
	}

	.company-location::before {
		content: '•';
		margin-right: 0.75rem;
		color: var(--color-border);
	}

	.experience-highlights {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.experience-highlights li {
		position: relative;
		padding-left: 1.5rem;
		font-family: var(--font-body);
		font-size: 0.95rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.experience-highlights li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.6em;
		width: 6px;
		height: 1px;
		background: var(--color-accent);
	}

	.experience-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.tech-tag {
		font-family: var(--font-body);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		background: var(--color-bg-elevated);
		padding: 0.375rem 0.75rem;
		border-radius: 4px;
		border: 1px solid var(--color-border-subtle);
		transition: all 0.2s ease;
	}

	.experience-card:hover .tech-tag {
		border-color: var(--color-border);
	}

	.experience-more {
		display: flex;
		justify-content: center;
		margin-top: 4rem;
	}

	.more-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--font-body);
		font-size: 1rem;
		color: var(--color-text);
		text-decoration: none;
		padding: 1rem 2rem;
		border: 1px solid var(--color-border);
		border-radius: 9999px;
		transition: all 0.3s ease;
	}

	.more-link:hover {
		background: var(--color-bg-elevated);
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.more-link svg {
		transition: transform 0.3s ease;
	}

	.more-link:hover svg {
		transform: translateX(4px);
	}
</style>

