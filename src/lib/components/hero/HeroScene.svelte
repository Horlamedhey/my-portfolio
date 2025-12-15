<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import * as THREE from 'three';
	import { onMount } from 'svelte';

	let mesh: THREE.Mesh;
	let geometry: THREE.IcosahedronGeometry;
	let material: THREE.MeshStandardMaterial;
	let time = $state(0);
	let mouseX = $state(0);
	let mouseY = $state(0);

	// Create noise-based vertex displacement
	function createNoisyGeometry() {
		geometry = new THREE.IcosahedronGeometry(2, 20);
		return geometry;
	}

	// Custom shader material for the morphing effect
	const vertexShader = `
		varying vec3 vNormal;
		varying vec3 vPosition;
		uniform float uTime;
		uniform float uNoiseScale;
		
		// Simplex noise function
		vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
		vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
		vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
		vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
		
		float snoise(vec3 v) {
			const vec2 C = vec2(1.0/6.0, 1.0/3.0);
			const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
			
			vec3 i = floor(v + dot(v, C.yyy));
			vec3 x0 = v - i + dot(i, C.xxx);
			
			vec3 g = step(x0.yzx, x0.xyz);
			vec3 l = 1.0 - g;
			vec3 i1 = min(g.xyz, l.zxy);
			vec3 i2 = max(g.xyz, l.zxy);
			
			vec3 x1 = x0 - i1 + C.xxx;
			vec3 x2 = x0 - i2 + C.yyy;
			vec3 x3 = x0 - D.yyy;
			
			i = mod289(i);
			vec4 p = permute(permute(permute(
				i.z + vec4(0.0, i1.z, i2.z, 1.0))
				+ i.y + vec4(0.0, i1.y, i2.y, 1.0))
				+ i.x + vec4(0.0, i1.x, i2.x, 1.0));
			
			float n_ = 0.142857142857;
			vec3 ns = n_ * D.wyz - D.xzx;
			
			vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
			
			vec4 x_ = floor(j * ns.z);
			vec4 y_ = floor(j - 7.0 * x_);
			
			vec4 x = x_ *ns.x + ns.yyyy;
			vec4 y = y_ *ns.x + ns.yyyy;
			vec4 h = 1.0 - abs(x) - abs(y);
			
			vec4 b0 = vec4(x.xy, y.xy);
			vec4 b1 = vec4(x.zw, y.zw);
			
			vec4 s0 = floor(b0)*2.0 + 1.0;
			vec4 s1 = floor(b1)*2.0 + 1.0;
			vec4 sh = -step(h, vec4(0.0));
			
			vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
			vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
			
			vec3 p0 = vec3(a0.xy, h.x);
			vec3 p1 = vec3(a0.zw, h.y);
			vec3 p2 = vec3(a1.xy, h.z);
			vec3 p3 = vec3(a1.zw, h.w);
			
			vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
			p0 *= norm.x;
			p1 *= norm.y;
			p2 *= norm.z;
			p3 *= norm.w;
			
			vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
			m = m * m;
			return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
		}
		
		void main() {
			vNormal = normal;
			vPosition = position;
			
			float noise = snoise(position * uNoiseScale + uTime * 0.3) * 0.3;
			vec3 newPosition = position + normal * noise;
			
			gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
		}
	`;

	const fragmentShader = `
		varying vec3 vNormal;
		varying vec3 vPosition;
		uniform float uTime;
		
		void main() {
			vec3 color1 = vec3(0.976, 0.451, 0.086); // Orange accent
			vec3 color2 = vec3(0.98, 0.6, 0.3);      // Lighter orange
			vec3 color3 = vec3(0.3, 0.15, 0.05);     // Dark brown
			
			float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
			vec3 color = mix(color3, color1, fresnel);
			color = mix(color, color2, fresnel * 0.5);
			
			// Add subtle pulsing
			float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
			color *= pulse;
			
			gl_FragColor = vec4(color, 1.0);
		}
	`;

	let shaderMaterial: THREE.ShaderMaterial;

	onMount(() => {
		shaderMaterial = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uNoiseScale: { value: 0.8 }
			}
		});

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});

	useTask((delta) => {
		time += delta;
		if (shaderMaterial) {
			shaderMaterial.uniforms.uTime.value = time;
		}
		if (mesh) {
			mesh.rotation.x += 0.002;
			mesh.rotation.y += 0.003;
			// Subtle mouse follow
			mesh.rotation.x += (mouseY * 0.1 - mesh.rotation.x) * 0.05;
			mesh.rotation.y += (mouseX * 0.1 - mesh.rotation.y) * 0.05;
		}
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

<T.AmbientLight intensity={0.3} />
<T.DirectionalLight position={[5, 5, 5]} intensity={1} />
<T.PointLight position={[-5, -5, -5]} intensity={0.5} color="#f97316" />

<Float floatIntensity={2} speed={2}>
	<T.Mesh bind:ref={mesh}>
		<T.IcosahedronGeometry args={[1.8, 20]} />
		{#if shaderMaterial}
			<T is={shaderMaterial} />
		{:else}
			<T.MeshStandardMaterial
				color="#f97316"
				roughness={0.3}
				metalness={0.7}
				wireframe={false}
			/>
		{/if}
	</T.Mesh>
</Float>

<!-- Floating particles -->
{#each Array(30) as _, i}
	{@const angle = (i / 30) * Math.PI * 2}
	{@const radius = 3 + Math.random() * 1.5}
	{@const height = (Math.random() - 0.5) * 3}
	<Float floatIntensity={1} speed={1 + Math.random()}>
		<T.Mesh
			position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}
		>
			<T.SphereGeometry args={[0.02 + Math.random() * 0.03, 8, 8]} />
			<T.MeshBasicMaterial color="#f97316" transparent opacity={0.6} />
		</T.Mesh>
	</Float>
{/each}

