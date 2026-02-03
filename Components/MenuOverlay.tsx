"use client";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { forwardRef, useEffect, useRef } from "react";
import { useOverlayContext } from "@/Utils/OverlayContext";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

interface MenuOverlayProps {
	linkedin?: string;
	twitter?: string;
	github?: string;
}

/**
 * In and Out animation is handled in Circles.jsx
 * Follow Up animations are here.
 */

const MenuOverlay = forwardRef<HTMLDivElement, MenuOverlayProps>(
	(props, ref) => {
		const menuRef = useRef<HTMLDivElement>(null);
		const pathRef = useRef<SVGPathElement>(null);

		const { setShouldRenderModal, viewModal, setViewModal } =
			useOverlayContext();

		const smoother = ScrollSmoother.get();

		const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
			const target = e.target as HTMLElement;
			const dest = target.dataset.dest;
			if (dest && smoother) {
				smoother.scrollTo(`.${dest}`, true, "top 100px");
			}
			setViewModal(false);
		};

		/*** Highlight Current Section */
		const currentHash = window.location.hash.replace("#", "");

		const initialPath = `M 0 0
					L ${window.innerWidth} 0
					Q ${window.innerWidth / 2} 0 0 0Z`;

		const curvDown = `M 0 0
					L ${window.innerWidth} 0
					Q ${window.innerWidth / 2} 400 0 0
					L 0 0Z`;

		useEffect(() => {
			if (!pathRef.current || !menuRef.current) return;

			const elms = document.querySelectorAll(".item");
			if (viewModal) {
				/***
				 *
				 * ****** Animate IN
				 */
				gsap.fromTo(
					menuRef.current,
					{
						yPercent: -100,
						y: -400,
						visibility: "hidden",
					},
					{
						yPercent: 0,
						y: 0,
						visibility: "visible",
						duration: 1.2,
						ease: "power2.inOut",
						onStart: () => {
							gsap.set(pathRef.current, { attr: { d: initialPath } }); // set to zero
							// start path anim
							gsap.to(pathRef.current, {
								yPercent: "100%",
								attr: { d: curvDown },
								duration: 1.2,
								ease: "power2.inOut",
								onStart: () => {
									// set link to zeo pos
									gsap.set(elms, { opacity: 0, y: "100%" });
								},
								onComplete: () => {
									// after svg path anim complete set path to zero again
									gsap.set(pathRef.current, {
										attr: { d: initialPath },
									});
									// then fade in links
									gsap.to(elms, {
										y: 0,
										opacity: 1,
										stagger: 0.1,
										duration: 0.5,
										ease: "back.inOut",
									});
								},
							});
						},
					},
				);
			} else {
				/***
				 *
				 * ****** Animate OUT
				 */
				gsap.to(menuRef.current, {
					yPercent: -100,
					y: -400,
					duration: 1.8,
					ease: "power2.inOut",
					onStart: () => {
						gsap.set(pathRef.current, { attr: { d: initialPath } }); // set to zero
						gsap.to(elms, {
							y: "-50%",
							opacity: 0,
							stagger: 0.2,
							duration: 1,
							ease: "back.inOut",
						});
						gsap.to(pathRef.current, {
							attr: { d: curvDown },
							yPercent: "-100%",
							duration: 1.8,
							ease: "power2.inOut",
						});
					},
					onComplete: () => {
						gsap.set(pathRef.current, { attr: { d: initialPath } });
						gsap.set(menuRef.current, { visibility: "hidden" });
						setShouldRenderModal(false);
					},
				});
			}
		}, [viewModal, initialPath, curvDown]);

		return (
			<div ref={ref} className="absolute  z-1000">
				<div
					className={`w-screen h-screen  z-1000 bg-red flex flex-col justify-center -translate-y-[calc(100%+400px)] invisible [scroll-behavior:unset]`}
					ref={menuRef}
				>
					<div className="w-[calc(100vw-(var(--gutter)*2))] h-[calc(100%-(var(--gutter)*2))] flex flex-row-reverse justify-start items-end gap-[10rem] max-md:flex-col max-md:justify-start max-md:items-end max-md:gap-[4rem] max-md:h-auto">
						<div className="h-full flex flex-col justify-center items-end">
							<p
								className={`item font-[var(--grotesk)] font-bold text-[clamp(50px,6vw,150px)] hover:text-[var(--cream)] transition-colors duration-300 ease-in-out max-md:text-[clamp(24px,6vw,50px)] ${
									currentHash === "home" ? "text-[var(--black)]" : ""
								}`}
								data-dest="home"
								onClick={handleClick}
							>
								Home
								<sup className="align-super font-bold text-[clamp(14px,3.5vw,60px)]">
									1
								</sup>
							</p>
							<p
								className={`item font-[var(--grotesk)] font-bold text-[clamp(50px,6vw,150px)] hover:text-[var(--cream)] transition-colors duration-300 ease-in-out max-md:text-[clamp(24px,6vw,50px)] ${
									currentHash === "ui" ? "text-[var(--black)]" : ""
								}`}
								data-dest="ui"
								onClick={handleClick}
							>
								About me
								<sup className="align-super font-bold text-[clamp(14px,3.5vw,60px)]">
									2
								</sup>
							</p>
							<p
								className={`item font-[var(--grotesk)] font-bold text-[clamp(50px,6vw,150px)] hover:text-[var(--cream)] transition-colors duration-300 ease-in-out max-md:text-[clamp(24px,6vw,50px)] ${
									currentHash === "myworks"
										? "text-[var(--black)]"
										: ""
								}`}
								data-dest="myworks"
								onClick={handleClick}
							>
								My Projects
								<sup className="align-super font-bold text-[clamp(14px,3.5vw,60px)]">
									3
								</sup>
							</p>
							<p
								className={`item font-[var(--grotesk)] font-bold text-[clamp(50px,6vw,150px)] hover:text-[var(--cream)] transition-colors duration-300 ease-in-out max-md:text-[clamp(24px,6vw,50px)] ${
									currentHash === "contact"
										? "text-[var(--black)]"
										: ""
								}`}
								data-dest="contact"
								onClick={handleClick}
							>
								Contact me
								<sup
									className="align-super font-bold text-[clamp(14px,3.5vw,60px)]"
									id="star"
								>
									*
								</sup>
							</p>
						</div>
						<div className="self-center flex flex-col justify-end items-end text-right gap-8 max-md:w-[calc(100vw-(var(--gutter)*2))] max-md:h-auto max-md:justify-start max-md:gap-4">
							<div className="text-[var(--white)]">
								<p
									onClick={handleClick}
									data-dest="interaction"
									className={
										"item ext-[clamp(12px,1.2vw,18px)] leading-[1.8rem] tracking-[2px] font-[var(--grotesk)] font-normal text-right hover:text-[var(--black)] transition-colors duration-300 ease-in-out"
									}
								>
									User Interaction
								</p>
								<p
									onClick={handleClick}
									data-dest="webgl"
									className={
										"item ext-[clamp(12px,1.2vw,18px)] leading-[1.8rem] tracking-[2px] font-[var(--grotesk)] font-normal text-right hover:text-[var(--black)] transition-colors duration-300 ease-in-out"
									}
								>
									Immersive Playground
								</p>
								<p
									onClick={handleClick}
									data-dest="focus"
									className={
										"item ext-[clamp(12px,1.2vw,18px)] leading-[1.8rem] tracking-[2px] font-[var(--grotesk)] font-normal text-right hover:text-[var(--black)] transition-colors duration-300 ease-in-out"
									}
								>
									My Approach
								</p>
								<p
									onClick={handleClick}
									data-dest="education"
									className={
										"item ext-[clamp(12px,1.2vw,18px)] leading-[1.8rem] tracking-[2px] font-[var(--grotesk)] font-normal text-right hover:text-[var(--black)] transition-colors duration-300 ease-in-out"
									}
								>
									My Education
								</p>
								<p
									onClick={handleClick}
									data-dest="experiences"
									className={
										"item ext-[clamp(12px,1.2vw,18px)] leading-[1.8rem] tracking-[2px] font-[var(--grotesk)] font-normal text-right hover:text-[var(--black)] transition-colors duration-300 ease-in-out"
									}
								>
									Experiences
								</p>
							</div>
							<div className="item text-[clamp(12px,1.2vw,18px)] leading-8 tracking-[2px] font-[var(--grotesk)] font-normal text-[var(--white)] item">
								<p className="social">Social Links</p>
								<div className="flex flex-row justify-between items-center">
									<a
										href={props.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="group"
									>
										<img
											src="/images/linkedin.svg"
											alt="linkedin icon"
										/>
									</a>
									<a
										href={props.twitter}
										target="_blank"
										rel="noopener noreferrer"
										className="group"
									>
										<img
											src="/images/twitter.svg"
											alt="twitter icon"
										/>
									</a>
									<a
										href={props.github}
										target="_blank"
										rel="noopener noreferrer"
										className="group"
									>
										<img src="/images/github.svg" alt="github icon" />
									</a>
								</div>
							</div>
						</div>
					</div>
					<svg className="absolute top-full left-0 w-full h-[400px] fill-[#ed3203] z-[500]">
						<path ref={pathRef} fill="#ed3203" />
					</svg>
				</div>
			</div>
		);
	},
);

MenuOverlay.displayName = "MenuOverlay";

export default MenuOverlay;
