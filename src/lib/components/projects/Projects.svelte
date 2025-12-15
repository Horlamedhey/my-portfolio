<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { projects } from '$lib/data/resume';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let sectionElement: HTMLElement;
	let hoveredProject = $state<string | null>(null);

	// Cursor follower for project cards
	const cursorPos = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.6 });

	function handleMouseMove(e: MouseEvent, projectId: string) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		cursorPos.set({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		});
		hoveredProject = projectId;
	}

	function handleMouseLeave() {
		hoveredProject = null;
	}

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

		// Animate project cards with stagger
		const cards = sectionElement.querySelectorAll('.project-card');
		gsap.fromTo(
			cards,
			{ y: 100, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.15,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionElement.querySelector('.projects-grid'),
					start: 'top 80%'
				}
			}
		);

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<section bind:this={sectionElement} class="projects section" id="work">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header">
			<span class="section-number">01</span>
			<h2 class="section-title">Selected Work</h2>
			<p class="section-subtitle">
				Projects that drove real business impact through thoughtful engineering
			</p>
		</div>

		<!-- Projects Grid -->
		<div class="projects-grid">
			{#each projects as project, i}
				<article
					class="project-card"
					class:hovered={hoveredProject === project.id}
					onmousemove={(e) => handleMouseMove(e, project.id)}
					onmouseleave={handleMouseLeave}
					data-cursor="hover"
				>
					<!-- Gradient follower -->
					{#if hoveredProject === project.id}
						<div
							class="card-glow"
							style="left: {$cursorPos.x}px; top: {$cursorPos.y}px;"
						></div>
					{/if}

					<!-- Project number -->
					<span class="project-number">0{i + 1}</span>

					<!-- Content -->
					<div class="project-content">
						<h3 class="project-title">{project.title}</h3>
						<p class="project-description">{project.description}</p>

						<!-- Impact badge -->
						<div class="project-impact">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M23 6l-9.5 9.5-5-5L1 18" />
								<path d="M17 6h6v6" />
							</svg>
							<span>{project.impact}</span>
						</div>
					</div>

					<!-- Technologies -->
					<div class="project-tech">
						{#each project.technologies as tech}
							<span class="tech-pill">{tech}</span>
						{/each}
					</div>

					<!-- Arrow indicator -->
					<div class="project-arrow">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M7 17L17 7M17 7H7M17 7V17" />
						</svg>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		position: relative;
		background: var(--color-bg-elevated);
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

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 900px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}

	.project-card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 2.5rem;
		background: var(--color-bg);
		border: 1px solid var(--color-border-subtle);
		border-radius: 16px;
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
	}

	.project-card:hover {
		border-color: var(--color-border);
		transform: translateY(-4px);
	}

	.project-card:nth-child(1),
	.project-card:nth-child(2) {
		grid-column: span 1;
	}

	/* Make first two cards larger on desktop */
	@media (min-width: 900px) {
		.project-card:nth-child(1) {
			grid-column: span 2;
			grid-row: span 1;
		}
	}

	.card-glow {
		position: absolute;
		width: 300px;
		height: 300px;
		background: radial-gradient(
			circle,
			rgba(249, 115, 22, 0.15) 0%,
			transparent 70%
		);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 0;
	}

	.project-number {
		position: absolute;
		top: 2rem;
		right: 2rem;
		font-family: var(--font-display);
		font-size: 3rem;
		font-weight: 700;
		color: var(--color-border-subtle);
		line-height: 1;
		transition: color 0.3s ease;
		z-index: 1;
	}

	.project-card:hover .project-number {
		color: rgba(249, 115, 22, 0.2);
	}

	.project-content {
		position: relative;
		z-index: 1;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.project-title {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 600;
		color: var(--color-text);
		transition: color 0.3s ease;
	}

	.project-card:hover .project-title {
		color: var(--color-accent);
	}

	.project-description {
		font-family: var(--font-body);
		font-size: 1rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.project-impact {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-body);
		font-size: 0.875rem;
		color: var(--color-accent);
		font-weight: 500;
		margin-top: auto;
		padding-top: 1rem;
	}

	.project-impact svg {
		opacity: 0.8;
	}

	.project-tech {
		position: relative;
		z-index: 1;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border-subtle);
	}

	.tech-pill {
		font-family: var(--font-body);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		background: var(--color-bg-elevated);
		padding: 0.375rem 0.75rem;
		border-radius: 9999px;
		border: 1px solid var(--color-border-subtle);
		transition: all 0.2s ease;
	}

	.project-card:hover .tech-pill {
		border-color: var(--color-border);
		background: var(--color-bg-subtle);
	}

	.project-arrow {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-border-subtle);
		border-radius: 50%;
		color: var(--color-text-muted);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 1;
	}

	.project-card:hover .project-arrow {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-bg);
		transform: rotate(-45deg);
	}
</style>

