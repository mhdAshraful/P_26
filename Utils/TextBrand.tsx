"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin);

interface LogoProps {
	show: boolean;
	minSCHeight?: number;
	minSCWidth?: number;
}

export const TextBrand: React.FC<LogoProps> = ({
	show,
	minSCHeight = 400,
	minSCWidth = 300,
}) => {
	const logoRef = useRef<HTMLDivElement>(null);
	const lineRef = useRef<HTMLParagraphElement>(null);
	const [hovered, setHovered] = useState<boolean>(false);
	const [shouldRender, setShouldRender] = useState<boolean>(show);

	/** Track Window Size */
	const [isVisibleByScreen, setIsisVisibleByScreen] = useState<boolean>(() => {
		return window.innerHeight > minSCHeight && window.innerWidth > minSCWidth;
	});

	/** Handle Resize */
	useEffect(() => {
		const handleResize = () => {
			setIsisVisibleByScreen(
				window.innerHeight > minSCHeight && window.innerWidth > minSCWidth,
			);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [minSCWidth, minSCHeight]);

	/** This will be used to triggar GSAP show/hide */
	useEffect(() => {
		if (show && isVisibleByScreen) {
			setShouldRender(true);
		}
	}, [show, isVisibleByScreen]);

	/**
	 * Logo Hide or Show animation
	 */
	useGSAP(
		() => {
			if (!logoRef.current) return;
			if (!show || !isVisibleByScreen) {
				gsap.to(logoRef.current, {
					y: 20,
					autoAlpha: 0,
					duration: 0.3,
					ease: "back.inOut",
					onComplete: () => setShouldRender(false),
				});
			} else {
				gsap.to(logoRef.current, {
					y: 0,
					autoAlpha: 1,
					duration: 0.3,
					ease: "back.inOut",
				});
			}
		},
		{ dependencies: [show, isVisibleByScreen] },
	);

	/***
	 * Logo Line hover animation
	 */
	useEffect(() => {
		if (!lineRef.current) return;
		const splited = new SplitText(lineRef.current, {
			type: "chars",
			charsClass: "chars",
		});

		const newP = SplitText.create("p", {
			type: "chars",
			charsClass: "chars",
		});
		newP.chars.forEach((char) => {
			const el = char as HTMLElement;
			gsap.set(el, { attr: { "data-content": el.innerHTML } });
		});

		lineRef.current.onpointermove = (e: PointerEvent) => {
			newP.chars.forEach((char) => {
				const el = char as HTMLElement;
				const rect = el.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				const dx = e.clientX - centerX;
				const dy = e.clientY - centerY;

				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < 20) {
					gsap.to(el, {
						overwrite: true,
						duration: 1.2 - dist / 50,
						scrambleText: {
							text: el.dataset.content ?? "",
							chars: "\u03A6\u03A9\u03b9\u03B2\u03B4\u03BB\u03B3\u03C8\u03DF\u2116",
							speed: 0.6,
						},
						ease: "none",
					});
				}
			});
		};

		return () => splited.revert();
	}, [hovered]);

	const router = useRouter();

	if (!shouldRender) return null;

	return (
		<div ref={logoRef}>
			<div
				className="
                    flex flex-row justify-start items-center gap-1.5 w-55 h-12.5 
                    transition-all duration-500 ease-in-out cursor-pointer"
				onMouseOver={() => setHovered(true)}
				onMouseOut={() => setHovered(false)}
				onClick={() => router.push("/#home")}
			>
				<div className="flex flex-col justify-start items-start gap-0.5">
					<p
						className="font-fira uppercase leading-[90%] font-semibold text-[clamp(12px,1.5vw,20px)]"
						ref={lineRef}
					>
						Mohammed <br /> Ashraful Islam
					</p>
					<p className="font-fira uppercase leading-[90%] text-xs">
						full-stack Developer
					</p>
				</div>
			</div>
		</div>
	);
};
