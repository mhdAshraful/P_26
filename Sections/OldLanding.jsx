import React, { forwardRef, useEffect, useRef } from "react";
import Data from "../utils/info";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const getHeartScale = (
	t,
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

const Landing = forwardRef((props, ref) => {
	const { title } = Data[0].home;
	const rafId = useRef(null);
	const startTimeRef = useRef(null);
	const heartWordRef = useRef(null);

	useGSAP(() => {
		const init = () => {
			ScrollTrigger.refresh();
			// re-split after resize ----1
			const split = SplitText.create("#heart", {
				type: "words, lines",
				autoSplit: true,
			});
			// Find the 🫀 word once & update the word ref
			heartWordRef.current = split.words.find((wd) => wd.innerHTML === "🫀");
			console.log("heartWord:", heartWordRef.current.innerHTML);
			if (heartWordRef.current) {
				heartWordRef.current.style.willChange = "transform";
			}

			gsap.from(split.lines, {
				yPercent: 50,
				rotateZ: 3,
				scale: 0.96,
				opacity: 0,
				delay: 0.2,
				duration: 0.6,
				stagger: 0.1,
				marker: true,
				ease: "back.inOut",
			});
			gsap.from(split.words, {
				yPercent: 50,
				opacity: 0,
				rotateZ: 5,
				duration: 1,
				ease: "back.inOut",
			});
		};

		const anim = (time) => {
			if (!startTimeRef.current) startTimeRef.current = time;
			const elapsedTime = (time - startTimeRef.current) / 1000;

			const el = heartWordRef.current;
			if (el && document.body.contains(el)) {
				const scale = getHeartScale(elapsedTime);
				console.log(
					`element is:${el.classList} && ${document.body.contains(el)}`,
				);

				el.style.transform = `scale(${scale})`;
			} else {
				console.log(
					`element not found:${el.classList} && ${document.body.contains(
						el,
					)}`,
				);
			}

			rafId.current = requestAnimationFrame(anim);
		};

		// start animation
		init();
		rafId.current = requestAnimationFrame(anim);

		// re-initialize on resize
		const ro = new ResizeObserver(() => init());
		ro.observe(document.getElementById("heart"));

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
			cancelAnimationFrame(rafId.current);
			ro.disconnect();
			window.removeEventListener("resize", HandleResize);
		};
	}, []);

	return (
		<section ref={ref} data-section="home" className=" w-full h-full">
			<div className="home w-full min-h-[calc(var(--height)-var(--gutter)*2)] flex flex-col justify-center items-start px-[calc(var(--gutter)*4)]">
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
