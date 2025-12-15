export const personalInfo = {
	name: 'Gafar Ajao',
	title: 'Senior Frontend Engineer',
	tagline: 'Crafting exceptional digital experiences with 8+ years of expertise',
	email: 'hello@gafarajao.com',
	location: 'Available Worldwide',
	summary:
		'Frontend Engineer with over 8 years of experience in frontend, mobile, and backend development using modern technologies. Designed and implemented atomic-structure-based component libraries, collaborated on projects that increased bookings, reduced cart abandonment, and boosted user engagement significantly.'
};

export interface Experience {
	id: string;
	role: string;
	company: string;
	location: string;
	period: string;
	highlights: string[];
	technologies: string[];
}

export const experiences: Experience[] = [
	{
		id: 'noema',
		role: 'Senior Frontend Engineer',
		company: 'Noema',
		location: 'Doha, Qatar',
		period: 'Feb 2025 - Present',
		highlights: [
			'Building highly functional frontend applications using React, GraphQL for enterprise-scale banking systems',
			'Improved dashboard usability by 60% through seamless UX collaboration',
			'Developing in-house UI library with 30+ reusable, performant components'
		],
		technologies: ['React', 'GraphQL', 'TypeScript', 'React Router', 'React Hook Forms']
	},
	{
		id: 'rb2',
		role: 'Senior Full Stack Engineer',
		company: 'Rb2',
		location: 'Netherlands',
		period: 'Jan 2022 - Sep 2025',
		highlights: [
			'Developed high-performance apps using React (Next.js, Remix), Vue (Nuxt), and Svelte',
			'Increased customer engagement by 40% through seamless UX',
			'Integrated GraphQL APIs with Node.js and PostgreSQL, enhancing efficiency by 30%',
			'Implemented CI/CD pipelines cutting deployment time by 50%'
		],
		technologies: ['Next.js', 'Remix', 'Nuxt', 'Svelte', 'GraphQL', 'PostgreSQL', 'GitHub Actions']
	},
	{
		id: 'podcreator',
		role: 'Senior Frontend Engineer',
		company: 'PodCreator UG',
		location: 'Berlin, Germany',
		period: 'May 2024 - Jul 2024',
		highlights: [
			'Initiated development of Gistable, driving user engagement 30% above estimates',
			'Authored 40+ reusable UI components using Atomic Design principles',
			'Reduced frontend development time by 40% with scalable architecture'
		],
		technologies: ['React', 'Redux', 'Vite', 'TailwindCSS', 'Atomic Design']
	},
	{
		id: 'codevillage',
		role: 'Senior Mobile Engineer',
		company: 'CodeVillage LLC',
		location: 'Nigeria',
		period: 'Feb 2024 - May 2024',
		highlights: [
			'Led development of PIF mobile app with React Native, achieving 30% performance gain',
			'Complete codebase restructure improving stability and eliminating crashes',
			'Achieved 95% test coverage with automated testing pipelines'
		],
		technologies: ['React Native', 'Sentry', 'Automated Testing']
	},
	{
		id: 'fluidangle',
		role: 'Lead Mobile Engineer',
		company: 'Fluidangle LLC',
		location: 'Boston, MA, USA',
		period: 'Sep 2021 - Dec 2021',
		highlights: [
			'Coordinated frontend architecture for cross-platform mobile apps using Flutter',
			'Optimized code structure reducing app crashes',
			'Increased task completion rates by 35%'
		],
		technologies: ['Flutter', 'Dart', 'UI/UX', 'Responsive Design']
	},
	{
		id: 'aitechma',
		role: 'Senior Frontend Engineer',
		company: 'Aitechma',
		location: 'Lagos, Nigeria',
		period: 'Jun 2021 - Sep 2021',
		highlights: [
			'Engineered Zabira crypto & gift cards trading app, achieving 30% faster development',
			'Increased user engagement by 25% through optimized transaction flows',
			'Improved user retention by 15% through better UX alignment'
		],
		technologies: ['Angular', 'TailwindCSS', 'Crypto APIs']
	},
	{
		id: 'footprint',
		role: 'Software Engineering Manager',
		company: 'Footprint Intelligence',
		location: 'Munich, Germany',
		period: 'Sep 2020 - Jan 2022',
		highlights: [
			'Led cross-functional team developing carbon emissions tracking application',
			'Achieved 35% rise in daily interactions through gamification',
			'Reduced database query times by 25% with Firebase and MongoDB optimization'
		],
		technologies: ['Vue.js', 'Flutter', 'Firebase', 'MongoDB Realm', 'TailwindCSS']
	},
	{
		id: 'anyskills',
		role: 'Frontend Engineer',
		company: 'Anyskills Inc.',
		location: 'Birmingham, UK',
		period: 'Jul 2019 - Aug 2020',
		highlights: [
			'Maintained high-performance Vue.js application with BFF architecture',
			'Boosted frontend data-fetching efficiency by 35%',
			'Built 35+ robust Vue.js components with Vuex and Vuetify'
		],
		technologies: ['Vue.js', 'Vuex', 'Vuetify', 'REST API']
	},
	{
		id: 'override',
		role: 'Mobile & Full Stack Developer',
		company: 'Override Digital Agency',
		location: 'Ilorin, Nigeria',
		period: 'Jul 2017 - Jun 2019',
		highlights: [
			'Integrated four payment gateway APIs and crypto transfer endpoints',
			'Reduced transaction latency by 50% with serverless functions',
			'Increased client conversion rates by 35% through accessibility improvements'
		],
		technologies: ['Ether.js', 'Serverless', 'Payment APIs', 'Crypto']
	}
];

export interface Project {
	id: string;
	title: string;
	description: string;
	impact: string;
	technologies: string[];
	image?: string;
}

export const projects: Project[] = [
	{
		id: 'europarcs',
		title: 'EuroParcs',
		description: 'Vacation booking platform optimization',
		impact: 'Increased bookings by 30%',
		technologies: ['React', 'Next.js', 'GraphQL']
	},
	{
		id: 'wovar',
		title: 'Wovar',
		description: 'E-commerce product search and checkout optimization',
		impact: 'Reduced cart abandonment by 15%',
		technologies: ['Vue.js', 'Nuxt', 'PostgreSQL']
	},
	{
		id: 'bijenkorf',
		title: 'De Bijenkorf',
		description: 'Premium retail digital experience',
		impact: 'Boosted engagement by 35%',
		technologies: ['React', 'Node.js', 'GraphQL']
	},
	{
		id: 'paccar',
		title: 'Paccar',
		description: 'Inventory management automation system',
		impact: 'Reduced data entry errors by 30%',
		technologies: ['Svelte', 'TypeScript', 'REST APIs']
	},
	{
		id: 'gistable',
		title: 'Gistable',
		description: 'Content creation and sharing platform MVP',
		impact: '30% above engagement estimates',
		technologies: ['React', 'Redux', 'Vite', 'TailwindCSS']
	},
	{
		id: 'coreconnect',
		title: 'Core Connect',
		description: 'SaaS framework landing page',
		impact: 'Increased lead conversions by 40%',
		technologies: ['Next.js', 'TailwindCSS', 'Vercel']
	}
];

export interface Skill {
	category: string;
	items: string[];
}

export const skills: Skill[] = [
	{
		category: 'Frontend',
		items: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Remix', 'Nuxt', 'Electron']
	},
	{
		category: 'Backend',
		items: ['Node.js', 'NestJS', 'Meteor', 'Firebase', 'GraphQL', 'REST APIs', 'Microservices']
	},
	{
		category: 'Mobile',
		items: ['Flutter', 'React Native', 'Android (Dart)']
	},
	{
		category: 'Database',
		items: ['PostgreSQL', 'MongoDB', 'MySQL']
	},
	{
		category: 'DevOps',
		items: ['GitHub Actions', 'Docker', 'CI/CD', 'AWS', 'Firebase']
	},
	{
		category: 'Design',
		items: ['Figma', 'Zeplin', 'TailwindCSS', 'UI/UX']
	}
];

export const education = {
	degree: 'Bachelor of Science (BSc)',
	field: 'Telecommunication Science',
	institution: 'University of Ilorin',
	location: 'Ilorin, Nigeria',
	period: 'Mar 2016 - Aug 2021'
};

export const stats = [
	{ value: '8+', label: 'Years Experience' },
	{ value: '60+', label: 'Components Built' },
	{ value: '40%', label: 'Avg. Engagement Boost' },
	{ value: '15+', label: 'Projects Delivered' }
];

export const socialLinks = [
	{ name: 'GitHub', url: 'https://github.com/gafarajao' },
	{ name: 'LinkedIn', url: 'https://linkedin.com/in/gafarajao' },
	{ name: 'Twitter', url: 'https://twitter.com/gafarajao' }
];
