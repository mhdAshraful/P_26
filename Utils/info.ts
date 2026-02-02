// Type definitions for portfolio data

interface HomeSection {
	home: {
		title: string;
	};
}

interface UISection {
	title: string;
	ribbontext: string;
	img1: string;
	img2: string;
	img3: string;
	mobile: string;
}

interface WebGLSection {
	title: string;
	ribbontext: string;
}

interface InteractionSection {
	title: string;
	ribbontext: string;
}

interface FocusSection {
	title: string;
	reference: string;
	img: string;
	aday: Record<string, string>;
}

interface Course {
	year?: string;
	provider: string;
	cert: string;
}

interface EducationSection {
	title: string;
	maincourse: Record<string, Course>;
	othercourse: Record<string, Omit<Course, "year">>;
	Books: Record<string, string>;
}

interface AboutSection {
	about: {
		title1: string;
		ui: UISection;
		webgl: WebGLSection;
		interaction: InteractionSection;
		focus: FocusSection;
		education: EducationSection;
	};
}

interface WorkItem {
	type: string;
	link: string;
	worktype: string;
}

interface WorkDetail {
	title: string;
	link: string;
	image1: string;
	video: string;
	altLink?: string;
}

interface MyWorksSection {
	myworks: {
		title: string;
		works: WorkItem[];
		ecommerce: WorkDetail;
		artgallery: WorkDetail;
		portfolio: WorkDetail;
		webgl: WorkDetail;
	};
}

interface ContactSection {
	contact: {
		title: string;
		subtitle: string;
		email: string;
		phone: string;
		location: string;
		res1: string;
		res2: string;
		flowerImg: string;
		letsImg: string;
	};
}

interface SocialLinksSection {
	sociallinks: {
		github: string;
		gitImg: string;
		linkedin: string;
		linkdImg: string;
		twitter: string;
		twitImg: string;
	};
}

interface Experience {
	title: string;
	type: string;
	org: string;
	location: string;
	duration: {
		start: string;
		end: string;
	};
	role: string;
	achievements: string[];
	tools: string[];
	skills: string[];
}

interface ExperiencesSection {
	experiences: Experience[];
}

type DataType = [
	HomeSection,
	AboutSection,
	MyWorksSection,
	ContactSection,
	SocialLinksSection,
	ExperiencesSection,
];

const Data: DataType = [
	{
		home: {
			title: "I bring life 🫀 to your Design & Occasionally Break for coffee ☕️",
		},
	},
	{
		about: {
			title1: "What i bring to the table?",
			ui: {
				title: "UI / Engineering",
				ribbontext: "Clean Responsive Sclable Interface",
				img1: "/images/fullstar.svg",
				img2: "/images/halfstar.svg",
				img3: "/images/cornerstar.svg",
				mobile: "/images/MobileInterface.png",
			},
			webgl: {
				title: "Immersive / Experiences",
				ribbontext: "Immersive Experience with WebGL, React three fiber ",
			},
			interaction: {
				title: "Tactile / Interaction",
				ribbontext: "Motion Scroll and smooth user flows",
			},
			focus: {
				title: "Focusing is about saying no.",
				reference: "- STEVE JOBS",
				img: "/images/quote.svg",
				aday: {
					"5am": "Wake up & Stretch",
					"6am": "☀️ Morning Walk 🏃‍♂️",
					"8am": "Coffee 🍵  + Dev Planning",
					"9am": "🧑‍💻Deep Work (Coding)",
					"10am": "Continue",
					"1pm": "Lunch + Scroll Cooldown",
					"2pm": "Projects Break / Journaling",
					"5pm": "WebGL Exploration ✨",
					"7pm": "Light Reading or  🎮",
					"8pm": "Offline",
					"10pm": "Sleep Prep 💤",
				},
			},
			education: {
				title: "Education",
				maincourse: {
					c1: {
						year: "October 2019",
						provider: "Charles Darwin University",
						cert: "Bachelor Information Technology",
					},
					c2: {
						year: "March 2021",
						provider: "Navitas International",
						cert: "ACS Professional Year Program",
					},
					c3: {
						year: "April 2023",
						provider: "Shiekhbe Sobai",
						cert: "Fullstack Development (MERN)",
					},
				},
				othercourse: {
					c1: {
						provider: "Three.js-journey.com",
						cert: "Become a ThreeJS Developer -by Bruno Saimon",
					},
					c2: {
						provider: "Awwwards.com",
						cert: "Creative Portfolios: A powerful visual language for brands. -by Niccolò Miranda",
					},
					c3: {
						provider: "Awwwards.com",
						cert: "Creative Practices: from idea to final layout using Figma. -by Viacheslav Olianishyn",
					},
					c4: {
						provider: "Awwwards.com",
						cert: "Merging WebGL and HTML worlds. -by Yuri Artiukh",
					},
					c5: {
						provider: "Awwwards.com",
						cert: "Using motion design to animate with purpose and create delightful experiences. -by Louis Paquet",
					},
				},
				Books: {
					b1: "THE HOLY QURAN",
					b2: "The Design of Everyday things -Don Norman",
					b3: "The Nature of code -Denial ShiffMan",
				},
			},
		},
	},
	{
		myworks: {
			title: "When Design Talks, Fonts Just Follow - Explore My Work",
			works: [
				{
					type: "E-commerce",
					link: "https://audiophile-green-alpha.vercel.app/",
					worktype: "ecommerce",
				},
				{
					type: "Art Gallery",
					link: "https://modern-artgallary.vercel.app/",
					worktype: "artgallery",
				},
				{
					type: "Portfolio",
					link: "https://ashiqulislam.vercel.app/",
					worktype: "portfolio",
				},
				{
					type: "Immersive UX",
					link: "./",
					worktype: "webgl",
				},
			],
			ecommerce: {
				title: "Crafted E-commerce Website",
				link: "https://audiophile-green-alpha.vercel.app/",
				image1: "/images/audiophile.png",
				video: "/videos/audiophile_.webm",
			},
			artgallery: {
				title: "Crafted Art Gallery Website",
				link: "https://modern-artgallary.vercel.app/",
				image1: "/images/artgallery.png",
				video: "/videos/art_.webm",
			},
			portfolio: {
				title: "Crafted Portfolio Website",
				altLink: "https://prtflo-ashql.vercel.app/",
				link: "https://www.ashiqul.net",
				image1: "/images/ashiq.png",
				video: "/videos/ashiq_.webm",
			},
			webgl: {
				title: "WebGL Playground",
				link: "https://www.ashiqul.net",
				image1: "/images/audiophile.png",
				video: "/videos/webgl_.webm",
			},
		},
	},
	{
		contact: {
			title: "Don\u2019t hesitate ||| to reach out!",
			subtitle:
				"Ignore the time difference,||| I would love ❤️ to hear about ||| your project anytime 😊.",
			email: "hey@mhdashraful.com",
			phone: "+8801327343156",
			location: "Dhaka,||| Bangladesh",
			res1: "You're more likely to get response",
			res2: "by 09:30am - 2:00pm||| Open to projects across||| the horizon from",
			flowerImg: "/images/flowerbucket.png",
			letsImg: "/images/letsmake.svg",
		},
	},
	{
		sociallinks: {
			github: "https://github.com/mhdAshraful",
			gitImg: "/images/boxGithub.svg",
			linkedin: "https://linkedin.com/in/mhdashraful",
			linkdImg: "/images/boxLinkedin.svg",
			twitter: "https://x.com/mhdashraful/",
			twitImg: "/images/boxTwitter.svg",
		},
	},
	{
		experiences: [
			{
				title: "Full-Stack Web Developer (Frontend Focused)",
				type: "Freelance",
				org: "Self-employed",
				location: "",
				duration: {
					start: "Mar 2023",
					end: "Present",
				},
				role: "Built custom websites and revamped existing platforms with a focus on responsive design, accessibility, and scalable architecture. Worked closely with designers and clients to align functionality with user experience.",
				achievements: [
					"Transformed static designs into dynamic, mobile-friendly web interfaces using React and modern CSS",
					"Collaborated with UX designers to iterate on user flows and design implementation",
					"Communicated directly with clients to gather requirements, set expectations, and deliver progress updates",
					"Implemented React Context API to manage global state and simplify component communication",
					"Optimized SEO through structured data, clean markup, and performance enhancements",
				],
				tools: [
					"/images/React.svg",
					"/images/VS Code.svg",
					"/images/JavaScript.svg",
					"/images/HTML.svg",
					"/images/SCSS.svg",
					"/images/Figma.svg",
					"/images/WebGL.svg",
					"/images/ThreeJS.svg",
					"/images/NextJS.svg",
				],
				skills: [
					"Client Communication",
					"UX Collaboration",
					"Responsive Design",
					"SEO",
					"Frontend Architecture",
				],
			},
			{
				title: "Intern Web Developer",
				type: "Internship",
				org: "Charles Darwin University",
				location: "Darwin, NT Australia",
				duration: {
					start: "Nov 2020",
					end: "Apr 2021",
				},
				role: "Contributed to several end-to-end web development projects during a comprehensive internship. Gained exposure to user research, design systems, testing, and deployment within a collaborative team environment.",
				achievements: [
					"Interviewed users and stakeholders to gather business requirements and translated them into personas and workflows",
					"Created wireframes, UI mockups, and prototypes for developer handoff",
					"Assisted in testing web apps with end-users and integrated feedback into iterative design improvements",
					"Participated in project meetings, presented design concepts, and addressed client feedback",
					"Documented development processes and ensured compliance with WHS policies and procedures",
				],
				tools: [
					"/images/HTML.svg",
					"/images/CSS.svg",
					"/images/JavaScript.svg",
					"/images/Persona.svg",
					"/images/Figma.svg",
				],
				skills: [
					"Creating User Personas",
					"UX Research",
					"Wireframing",
					"Prototyping",
					"Documentation",
					"Client Presentation",
					"Team Collaboration",
				],
			},
			{
				title: "ICT Field Support Eng.",
				type: "Casual",
				org: "Best Technology Services",
				location: "Darwin, NT Australia",
				duration: {
					start: "Apr 2017",
					end: "Jun 2021",
				},
				role: "Provided on-site technical support and network setup for businesses, addressing a wide range of hardware and software issues with professionalism and precision.",
				achievements: [
					"Diagnosed and resolved IT issues across hardware, software, and networking environments",
					"Installed and configured operating systems, peripherals, and network equipment",
					"Maintained accurate documentation of support tickets, inventory, and resolutions",
					"Performed preventive maintenance and safety checks during field visits",
					"Assisted clients with technical inquiries and provided training for basic system use",
				],
				tools: [
					"/images/Windows.svg",
					"/images/Network.svg",
					"/images/Printers.svg",
					"/images/Switches.svg",
					"/images/Modems.svg",
				],
				skills: [
					"Troubleshooting",
					"Network Setup",
					"Client Support",
					"Documentation",
					"Field Safety",
				],
			},
			{
				title: "Desktop Assembler",
				type: "Contract",
				org: "PC-Mart Darwin",
				location: "Woolner, NT Australia",
				duration: {
					start: "Feb 2018",
					end: "Jun 2018",
				},
				role: "Built custom PC systems and supported day-to-day retail operations in a fast-paced IT hardware store.",
				achievements: [
					"Assembled desktop computers according to customer specifications",
					"Managed incoming stock, handled dispatches, and updated inventory records",
					"Provided technical advice and support to walk-in and phone customers",
					"Processed transactions and orders while maintaining a high level of customer service",
				],
				tools: [
					"/images/Windows.svg",
					"/images/Graphics.svg",
					"/images/Fan.svg",
					"/images/Cpu.svg",
					"/images/Ram.svg",
				],
				skills: [
					"Hardware Assembly",
					"Customer Support",
					"Inventory Management",
				],
			},
		],
	},
];

export default Data;

// Export types for use in other files
export type {
	DataType,
	HomeSection,
	AboutSection,
	MyWorksSection,
	ContactSection,
	SocialLinksSection,
	ExperiencesSection,
	Experience,
	WorkItem,
	WorkDetail,
};
