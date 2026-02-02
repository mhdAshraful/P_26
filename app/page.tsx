"use client";

import MenuOverlay from "@/Components/MenuOverlay";
import Header from "@/Sections/Header";
import { preloadAssets } from "@/Utils/preloadAssets";
import { useEffect, useRef, useState } from "react";
import Data from "@/Utils/info";
import { useOverlayContext } from "@/Utils/OverlayContext";
import Loading from "@/Components/Loading";
import Mouse from "@/Utils/Mouse";
import { useTouchDevice } from "@/Utils/DeviceDetector";
import { useGSAP } from "@gsap/react";
import SocialMedia from "@/Components/SocialMedia";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Landing from "@/Sections/Landing";

export default function Home() {
	const [isDark, setIsDark] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [percentage, setPercentage] = useState(0);
	const menuOverlayRef = useRef(null);
	const { viewModal, setViewModal } = useOverlayContext();
	const [shouldRenderOverlay, setShouldRenderOverlay] = useState(false);
	const sociallinks = Data[4].sociallinks;
	const touchDevice = useTouchDevice();

	/**
	 * Local Storage Check
	 */
	useEffect(() => {
		const previouslyLoaded = localStorage.getItem("@mhdAshraful");
		if (previouslyLoaded) {
			setLoaded(true);
		} else {
			preloadAssets(setPercentage)
				.then(() => {
					setLoaded(true);
				})
				.catch((err) => {
					console.error("Error preloading assets:", err);
					setLoaded(true); // fallback to try to showing app anyway
				});
		}
	}, []);

	useEffect(() => {
		// Load theme from localStorage
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const shouldBeDark =
			savedTheme === "dark" || (!savedTheme && prefersDark);

		if (shouldBeDark) {
			document.documentElement.classList.add("dark");
			setIsDark(true);
		} else {
			document.documentElement.classList.remove("dark");
			setIsDark(false);
		}
		setMounted(true);
	}, []);

	function toggleTheme() {
		const html = document.documentElement;

		if (isDark) {
			html.classList.remove("dark");
			localStorage.setItem("theme", "light");
			setIsDark(false);
		} else {
			html.classList.add("dark");
			localStorage.setItem("theme", "dark");
			setIsDark(true);
		}
	}

	useEffect(() => {
		if (viewModal) {
			setShouldRenderOverlay(true);
		}
	}, [viewModal]);

	if (!mounted) return null;

	return !loaded ? (
		<Loading percent={percentage} />
	) : (
		<div className="flex min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
			<Header />

			{/* Mouse on non touch device */}
			{/* {!touchDevice && <Mouse />} */}

			{/* Menu Overlay, Extra check is necessary to make sure the animate out complets */}
			{shouldRenderOverlay && (
				/* Only mount when needed */
				<MenuOverlay
					ref={menuOverlayRef}
					linkedin={sociallinks.linkedin}
					twitter={sociallinks.twitter}
					github={sociallinks.github}
				/>
			)}

			<SocialMedia
				twitter={sociallinks.twitter}
				linkedin={sociallinks.linkedin}
				github={sociallinks.github}
			/>

			{/* Main Sections */}
			<Landing />

			{/* <button
				onClick={toggleTheme}
				className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded"
			>
				{isDark ? "Light Mode" : "Dark Mode"}
			</button> */}

			{/* <Logo /> */}
		</div>
	);
}
