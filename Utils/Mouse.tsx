import * as THREE from "three";
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import { useTouchDevice } from "@/Utils/DeviceDetector";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const Mouse: React.FC = () => {
	const m1Ref = useRef<HTMLDivElement | null>(null);
	const pathRef = useRef<SVGPathElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);

	const pathDOT =
		"M20 17.5C21.3807 17.5 22.5 18.6193 22.5 20C22.5 21.3807 21.3807 22.5 20 22.5C18.6193 22.5 17.5 21.3807 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5Z";
	const pathARROW = "M10.5 31.5L29.9998 9M29.9998 9H15.6147M29.9998 9V23.5";
	const pathArrowUPDown =
		"M23.5 25.5L20.24 29M20.24 11L17 15M20.24 11L23.5 15M20.24 11V17.5M17 25.5L20.24 29M20.24 29V22.5";

	const target = useRef(new THREE.Vector2());
	const current = useRef(new THREE.Vector2());

	const touchDevice = useTouchDevice();

	const onEnter = (e: Event) => {
		const targetEl = e.target as SVGElement | null;
		const isFollow = targetEl?.className?.baseVal === "follow";
		console.log("-----", isFollow);

		if (!pathRef.current) return;

		gsap.to(pathRef.current, {
			duration: 0.3,
			fill: "#ed3203",
			stroke: "#ed3203",
			strokeWidth: 2,
			morphSVG: isFollow ? pathArrowUPDown : pathARROW,
			ease: "back.inOut",
		});
	};

	const onLeave = () => {
		if (!pathRef.current) return;

		gsap.to(pathRef.current, {
			duration: 0.3,
			fill: "#0F0F0F",
			stroke: "#0F0F0F",
			morphSVG: pathDOT,
			ease: "back.inOut",
		});
	};

	useLayoutEffect(() => {
		if (touchDevice) return;

		document.body.style.cursor = "none";

		const baseSize = 40;
		const minScale = 0.4;
		const maxScale = 1;
		const maxDistance = 200;

		let animationFrame = 0;

		const onMouseMove = (e: MouseEvent) => {
			if (!m1Ref.current) return;
			const { width, height } = m1Ref.current.getBoundingClientRect();
			target.current.set(e.clientX - width / 2, e.clientY - height / 2);
		};

		const pathElements = new Set<Element>();
		const addListeners = () => {
			document.querySelectorAll("button, g.follow").forEach((el) => {
				if (!pathElements.has(el)) {
					el.addEventListener("mouseenter", onEnter);
					el.addEventListener("mouseleave", onLeave);
					pathElements.add(el);
				}
			});
		};

		const observer = new MutationObserver(addListeners);
		observer.observe(document.body, { childList: true, subtree: true });

		addListeners();

		let lastTime = performance.now();
		const update = () => {
			if (!m1Ref.current) return;

			const now = performance.now();
			const delta = (now - lastTime) / 1000;
			lastTime = now;

			const k = 14;
			const alpha = 1 - Math.exp(-k * delta);

			current.current.lerp(target.current, alpha);

			const dx = current.current.x - target.current.x;
			const dy = current.current.y - target.current.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			const scale = Math.min(
				maxScale,
				Math.max(minScale, 1 - distance / maxDistance),
			);
			const size = scale * baseSize;

			m1Ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
			m1Ref.current.style.width = `${size}px`;
			m1Ref.current.style.height = `${size}px`;

			animationFrame = requestAnimationFrame(update);
		};

		window.addEventListener("resize", update);
		window.addEventListener("mousemove", onMouseMove);
		animationFrame = requestAnimationFrame(update);

		return () => {
			window.removeEventListener("resize", update);
			window.removeEventListener("mousemove", onMouseMove);
			observer.disconnect();

			pathElements.forEach((el) => {
				el.removeEventListener("mouseenter", onEnter);
				el.removeEventListener("mouseleave", onLeave);
			});

			cancelAnimationFrame(animationFrame);
			document.body.style.cursor = "none";
		};
	}, [touchDevice]);

	if (touchDevice) return null;

	return (
		<div
			ref={m1Ref}
			className="fixed top-0 left-0 pointer-events-none w-[40px] h-[40px] z-[9999]"
		>
			<svg
				ref={svgRef}
				width="100%"
				height="100%"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<path id="dot" d={pathDOT} />
					<path id="arrow" d={pathARROW} />
				</defs>

				<path ref={pathRef} d={pathDOT} fill="#0F0F0F" stroke="#0F0F0F" />
			</svg>
		</div>
	);
};

export default Mouse;
