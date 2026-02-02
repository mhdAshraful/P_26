import React, { forwardRef, useLayoutEffect, useRef } from "react";
import Data from "@/Utils/info";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const getHeartScale = (
	t: number,
	A = 0.08, // Scale amplitude			0.2 (±20%
	f = 0.48, // Frequency (Hz) 1.2hz		72BPM 72/60
	k1 = 40, // Sharpness of 1st beat		20–40
	k2 = 10, // Sharpness of 2nd beat		10–30
	phi1 = 0, // Phase of first beat		0
	phi2 = Math.PI * 0.35, // Phase of second beat	π/2, π * 0.6, etc.
) => {
	const s1 = Math.sin(2 * Math.PI * f * t - phi1);
	const s2 = Math.sin(2 * Math.PI * f * t - phi2);
	// console.log(`s1:${s1}, s2:${s2}`);

	const bump1 = Math.exp(-k1 * s1 * s1);
	const bump2 = Math.exp(-k2 * s2 * s2);
	// console.log(`bump1:${bump1}, bump2:${bump2}`);

	// 0.9 means animation starts from 90% of original size
	return 1 + A * (bump1 + bump2);
};

const Landing = forwardRef<HTMLElement>((_props, ref) => {
	const { title } = Data[0].home;
	const rafId = useRef<number | null>(null);
	const startTimeRef = useRef<number | null>(null);
	const heartWordRef = useRef<HTMLElement | null>(null);
	const allLinesRef = useRef<HTMLElement[] | null>(null);
	const allWordsRef = useRef<HTMLElement[] | null>(null);
	const splitRef = useRef<SplitText | null>(null);

	useGSAP(() => {
		const ln = document.querySelector("#heart") as HTMLElement;
		if (!ln) return;

		const init = () => {
			// reset/kill previous splits text references
			if (splitRef.current) splitRef.current.revert();
			// re-split after resize ----1
			splitRef.current = SplitText.create(ln, {
				type: "words, lines",
				wordsClass: "words",
				linesClass: "lines",
				autoSplit: true,
			});
			// Find the 🫀 word once & update the word ref
			heartWordRef.current = splitRef.current.words.find(
				(wd) => (wd as HTMLElement).innerHTML === "🫀",
			) as HTMLElement;
			if (heartWordRef.current) {
				heartWordRef.current.style.willChange = "transform";
			}

			allLinesRef.current = splitRef.current.lines as HTMLElement[];
			allWordsRef.current = splitRef.current.words as HTMLElement[];
			gsap.from(allLinesRef.current, {
				yPercent: 50,
				rotateZ: 3,
				scale: 0.96,
				opacity: 0,
				delay: 0.2,
				duration: 0.6,
				stagger: 0.1,
				ease: "back.inOut",
			});
			gsap.from(allWordsRef.current, {
				yPercent: 50,
				opacity: 0,
				rotateZ: 5,
				duration: 1,
				ease: "back.inOut",
			});
		};

		const anim = (time: number) => {
			if (!startTimeRef.current) startTimeRef.current = time;
			const elapsedTime = (time - startTimeRef.current) / 1000;

			const el = heartWordRef.current;
			if (el && document.body.contains(el)) {
				const scale = getHeartScale(elapsedTime);
				el.style.transform = `scale(${scale})`;
			}

			rafId.current = requestAnimationFrame(anim);
		};

		// start animation
		init();
		rafId.current = requestAnimationFrame(anim);

		// re-initialize on resize
		const ro = new ResizeObserver(() => init());
		ro.observe(ln);

		// re init after resize --- refer to ----1
		const HandleResize = () => init();
		window.addEventListener("resize", HandleResize);
		// re-init on ScrollTrigger refresh (in case GSAP flushes DOM)
		ScrollTrigger.create({
			trigger: ".home",
			start: "top bottom",
			onEnterBack: () => init(),
		});

		return () => {
			// cleanup
			if (rafId.current) cancelAnimationFrame(rafId.current);
			ro.disconnect();
			window.removeEventListener("resize", HandleResize);
			if (splitRef.current) splitRef.current.revert();
		};
	}, []);

	return (
		<section ref={ref} data-section="home" className="home w-full h-full">
			<div className="w-full min-h-[calc(var(--height)-var(--gutter)*2)] flex flex-col justify-center items-start px-[calc(var(--gutter)*4)]">
				<h1
					className="relative top-[calc((var(--gutter)*2)/5)] max-h-[60vh] max-w-[60%] text-title font-neueVar font-black transition-all duration-600 ease-[cubic-bezier(0.65,0.74,0.18,1)] [font-variant-ligatures:discretionary-ligatures] [font-kerning:normal] [font-feature-settings:'liga'_1,'kern'_1,'ss01'_1]"
					id="heart"
				>
					{title}
				</h1>
			</div>
		</section>
	);
});

export default Landing;
