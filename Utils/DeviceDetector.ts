import { useEffect, useState } from "react";

/**
 * Detects if the current device is a touch-enabled device.
 * SSR-safe: returns false during server-side rendering.
 */
export function useTouchDevice(): boolean {
	const [isTouch, setIsTouch] = useState<boolean>(() => {
		// SSR safety: check if window exists
		if (typeof window === "undefined") return false;
		return checkTouchDevice();
	});

	useEffect(() => {
		// Re-check on mount (handles hydration mismatch)
		setIsTouch(checkTouchDevice());
	}, []);

	return isTouch;
}

/**
 * Pure function to detect touch capability.
 * Industry-standard detection methods.
 */
function checkTouchDevice(): boolean {
	if (typeof window === "undefined") return false;

	// Primary detection: pointer media query (most reliable modern approach)
	if (window.matchMedia?.("(pointer: coarse)").matches) {
		return true;
	}

	// Fallback: touch event support
	if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
		return true;
	}

	// Fallback: user agent sniffing (least reliable, but catches edge cases)
	const ua = navigator.userAgent || "";
	if (
		/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)
	) {
		return true;
	}

	return false;
}

/**
 * Non-hook utility for one-time checks outside React components.
 */
export function isTouchDevice(): boolean {
	return checkTouchDevice();
}
