<script lang="ts">
	import { onMount } from 'svelte';
	import { personalInfo, socialLinks } from '$lib/data/resume';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import MagneticButton from '$lib/components/ui/MagneticButton.svelte';

	let sectionElement: HTMLElement;
	let currentTime = $state('');

	// Update time every second
	function updateTime() {
		const now = new Date();
		currentTime = now.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
			timeZone: 'UTC'
		});
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		updateTime();
		const interval = setInterval(updateTime, 1000);

		// Animate content
		gsap.fromTo(
			sectionElement.querySelector('.contact-header'),
			{ y: 80, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionElement,
					start: 'top 70%'
				}
			}
		);

		gsap.fromTo(
			sectionElement.querySelector('.contact-cta'),
			{ y: 60, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				delay: 0.2,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionElement,
					start: 'top 60%'
				}
			}
		);

		const infoItems = sectionElement.querySelectorAll('.contact-info-item');
		gsap.fromTo(
			infoItems,
			{ y: 40, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionElement.querySelector('.contact-info'),
					start: 'top 80%'
				}
			}
		);

		return () => {
			clearInterval(interval);
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<section bind:this={sectionElement} class="contact section" id="contact">
	<div class="contact-bg">
		<div class="contact-gradient"></div>
		<div class="contact-grid-pattern"></div>
	</div>

	<div class="container">
		<!-- Header -->
		<div class="contact-header">
			<span class="section-number">04</span>
			<h2 class="contact-title">
				Let's build<br />
				<span class="title-accent">something great</span><br />
				together
			</h2>
		</div>

		<!-- CTA -->
		<div class="contact-cta">
			<p class="cta-text">
				Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
			</p>
			<MagneticButton
				href="mailto:{personalInfo.email}"
				variant="primary"
				size="lg"
				class="cta-button"
			>
				<span>Get In Touch</span>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</MagneticButton>
		</div>

		<!-- Contact Info Grid -->
		<div class="contact-info">
			<div class="contact-info-item">
				<span class="info-label">Email</span>
				<a href="mailto:{personalInfo.email}" class="info-value">
					{personalInfo.email}
				</a>
			</div>

			<div class="contact-info-item">
				<span class="info-label">Location</span>
				<span class="info-value">{personalInfo.location}</span>
			</div>

			<div class="contact-info-item">
				<span class="info-label">Local Time (UTC)</span>
				<span class="info-value time">{currentTime}</span>
			</div>

			<div class="contact-info-item">
				<span class="info-label">Socials</span>
				<div class="social-links">
					{#each socialLinks as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
						>
							{link.name}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="footer">
		<div class="container footer-content">
			<p class="footer-copy">
				© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
			</p>
			<p class="footer-built">
				Built with <span class="heart">♥</span> using SvelteKit & Threlte
			</p>
		</div>
	</footer>
</section>

<style>
	.contact {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.contact-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.contact-gradient {
		position: absolute;
		inset: 0;
		background: radial-gradient(
				ellipse 80% 60% at 50% 100%,
				rgba(249, 115, 22, 0.12) 0%,
				transparent 60%
			),
			radial-gradient(
				ellipse 50% 50% at 20% 80%,
				rgba(249, 115, 22, 0.08) 0%,
				transparent 40%
			);
	}

	.contact-grid-pattern {
		position: absolute;
		inset: 0;
		background-image: linear-gradient(
				rgba(255, 255, 255, 0.02) 1px,
				transparent 1px
			),
			linear-gradient(
				90deg,
				rgba(255, 255, 255, 0.02) 1px,
				transparent 1px
			);
		background-size: 60px 60px;
	}

	.section-number {
		display: block;
		font-family: var(--font-display);
		font-size: 0.875rem;
		color: var(--color-accent);
		font-weight: 600;
		letter-spacing: 0.2em;
		margin-bottom: 2rem;
	}

	.contact-header {
		margin-bottom: 4rem;
	}

	.contact-title {
		font-family: var(--font-display);
		font-size: clamp(3rem, 10vw, 7rem);
		font-weight: 600;
		line-height: 1.05;
		letter-spacing: -0.03em;
	}

	.title-accent {
		color: var(--color-accent);
		position: relative;
	}

	.title-accent::after {
		content: '';
		position: absolute;
		bottom: 0.1em;
		left: 0;
		width: 100%;
		height: 0.08em;
		background: var(--color-accent);
		opacity: 0.3;
		border-radius: 2px;
	}

	.contact-cta {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: flex-start;
		margin-bottom: 6rem;
		max-width: 600px;
	}

	.cta-text {
		font-family: var(--font-body);
		font-size: clamp(1.125rem, 2vw, 1.5rem);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	:global(.cta-button) {
		font-size: 1.125rem !important;
		padding: 1.25rem 2.5rem !important;
	}

	.contact-info {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		padding-top: 4rem;
		border-top: 1px solid var(--color-border-subtle);
		margin-top: auto;
	}

	@media (max-width: 900px) {
		.contact-info {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 500px) {
		.contact-info {
			grid-template-columns: 1fr;
		}
	}

	.contact-info-item {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.info-label {
		font-family: var(--font-body);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.info-value {
		font-family: var(--font-body);
		font-size: 1rem;
		color: var(--color-text);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	a.info-value:hover {
		color: var(--color-accent);
	}

	.info-value.time {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 500;
		font-variant-numeric: tabular-nums;
	}

	.social-links {
		display: flex;
		gap: 1.5rem;
	}

	.social-link {
		font-family: var(--font-body);
		font-size: 1rem;
		color: var(--color-text);
		text-decoration: none;
		position: relative;
		transition: color 0.3s ease;
	}

	.social-link::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-accent);
		transition: width 0.3s ease;
	}

	.social-link:hover {
		color: var(--color-accent);
	}

	.social-link:hover::after {
		width: 100%;
	}

	.footer {
		margin-top: 6rem;
		padding: 2rem 0;
		border-top: 1px solid var(--color-border-subtle);
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.footer-copy,
	.footer-built {
		font-family: var(--font-body);
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.heart {
		color: var(--color-accent);
		display: inline-block;
		animation: heartbeat 1.5s ease-in-out infinite;
	}

	@keyframes heartbeat {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}
</style>

