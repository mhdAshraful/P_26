"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { createNoise2D } from "simplex-noise";
import { useOverlayContext } from "./OverlayContext";

const Circles = () => {
	const path1Ref = useRef<SVGPathElement>(null);
	const path2Ref = useRef<SVGPathElement>(null);
	const animationRef = useRef<gsap.Callback | null>(null);
	const [isHovered, setIsHovered] = useState(false);
	const noise2d = useRef(createNoise2D()).current;
	const { setViewModal, viewModal } = useOverlayContext();
	const centerX = 32;
	const centerY = 32;
	const pointCount = 360;

	const state = useRef({
		radius: 20,
		noiseStrength1: 3,
		noiseStrength2: 5,
		radiusPulseAmplitude: 0.7,
	});
	const line1 = useRef<SVGLineElement>(null);
	const line2 = useRef<SVGLineElement>(null);

	const tickRef = useRef(0);

	const generatedPath = (
		inpRadius: number,
		noiseStrength: number,
		offset: number,
	): string => {
		let d = "";
		for (let i = 0; i <= pointCount; i++) {
			const angle = (Math.PI * 2 * i) / pointCount;
			// const wave = Math.sin(angle * waveFrequency + offset) * waveAmpli;
			const noise = noise2d(
				Math.cos(angle + offset * 0.3),
				Math.sin(angle + offset),
			);

			const r = inpRadius + noise * noiseStrength;
			const x = centerX + r * Math.cos(angle);
			const y = centerY + r * Math.sin(angle);
			d += (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2) + " ";
		}
		return d + "Z";
	};

	const drawFrame = () => {
		tickRef.current += 0.01;
		const angleOffset = tickRef.current;

		const { radius, noiseStrength1, noiseStrength2, radiusPulseAmplitude } =
			state.current;

		const dynamicRadious1 =
			radius + Math.sin(tickRef.current * 1.5) * radiusPulseAmplitude;
		const dynamicRadious2 =
			radius + Math.cos(tickRef.current * 1.1) * radiusPulseAmplitude;

		if (path1Ref.current) {
			path1Ref.current.setAttribute(
				"d",
				generatedPath(dynamicRadious1, noiseStrength1, angleOffset * 0.5),
			);
		}
		if (path2Ref.current) {
			path2Ref.current.setAttribute(
				"d",
				generatedPath(dynamicRadious2, noiseStrength2, angleOffset * 0.2),
			);
		}
	};

	useEffect(() => {
		const callback = drawFrame;
		gsap.ticker.add(callback);
		animationRef.current = callback;
		return () => {
			if (animationRef.current) {
				gsap.ticker.remove(animationRef.current);
			}
		};
	}, []);

	// Circular Animation
	useEffect(() => {
		if (isHovered) {
			gsap.to(state.current, {
				duration: 0.6,
				// radius: 20,
				noiseStrength1: 1,
				noiseStrength2: 2,
				radiusPulseAmplitude: 0.2,
				ease: "expo.inOut",
			});
		} else {
			gsap.to(state.current, {
				duration: 0.6,
				// radius: 25,
				noiseStrength1: 3,
				noiseStrength2: 5,
				radiusPulseAmplitude: 0.7,
				ease: "expo.inOut",
			});
		}
	}, [isHovered]);

	// Line Animation
	useEffect(() => {
		if (isHovered) {
			gsap.to(line1.current, {
				attr: { x2: 22 },
				duration: 0.6,
				ease: "power4.inOut",
			});
			gsap.to(line2.current, {
				attr: { x2: 22 },
				duration: 0.6,
				ease: "power4.inOut",
			});
		} else {
			gsap.to(line1.current, {
				attr: { x2: 30 },
				duration: 0.5,
				ease: "power4.inOut",
			});
			gsap.to(line2.current, {
				attr: { x2: 25 },
				duration: 0.5,
				ease: "power4.inOut",
			});
		}
	}, [isHovered]);

	const changeViewModal = () => {
		setViewModal(!viewModal);
	};

	return (
		<div
			id="MenuCircle"
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
			onClick={() => changeViewModal()}
			style={{
				position: "relative",
				pointerEvents: "auto",
				zIndex: 1000,
				background: "transperent",
			}}
		>
			<svg
				width={64}
				height={64}
				fill="none"
				style={{
					background: "transparent",
					transformOrigin: "center",
					transformBox: "fill-box",
				}}
			>
				<line
					ref={line1}
					x1={45}
					y1={28}
					x2={30}
					y2={28}
					stroke="#0F0F0F"
					strokeWidth="1"
					strokeOpacity="1"
					shapeRendering="crispEdges"
				/>
				<line
					ref={line2}
					x1={45}
					y1={32}
					x2={25}
					y2={32}
					stroke="#0F0F0F"
					strokeWidth="1"
					strokeOpacity="1"
					shapeRendering="crispEdges"
				/>
				<path
					ref={path1Ref}
					fill="none"
					stroke="#0F0F0F"
					strokeWidth="1"
					shapeRendering="crispEdges"
				/>
				<path
					ref={path2Ref}
					fill="none"
					stroke="#0F0F0F"
					strokeWidth="1"
					shapeRendering="crispEdges"
				/>
			</svg>
		</div>
	);
};

export default Circles;
