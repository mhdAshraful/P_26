import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import FontFaceObserver from "fontfaceobserver";

type ProgressCallback = (percent: number) => void;

/**
 * Preload assets with progress callback function
 * @param onProgress - called with percentage 0 to 100
 * @returns Promise that resolves when all assets are loaded
 */
export async function preloadAssets(
	onProgress?: ProgressCallback,
): Promise<unknown[]> {
	const imagePaths: string[] = [
		"/images/mouse.svg",
		"/images/mousearrow.svg",
		"/images/icon.webp",
		"/images/quote.svg",
		"/images/arrow.png",
		"/images/tooltip.svg",
		"/images/flowerbucket.png",
		"/images/books.webp",
		"/images/b3.webp",
		"/images/boxGithub.svg",
		"/images/boxLinkedin.svg",
		"/images/boxTwitter.svg",
		"/images/github.svg",
		"/images/linkedin.svg",
		"/images/twitter.svg",
		"/images/budgetarrow.svg",
		"/images/budgetcard1.svg",
		"/images/budgetcard2.svg",
		"/images/budgetcard3.svg",
		"/images/budgetcircles.svg",
		"/images/budgetmenu.svg",
		"/images/cornerstar.svg",
		"/images/fullstar.svg",
		"/images/halfstar.svg",
		"/images/letsmake.svg",
		"/images/mhdAshraful.svg",
		"/images/mobileInterface.svg",
		"/images/MobileInterface.png",
	];

	const modelPaths: string[] = [
		"/3d/hopen.glb",
		"/3d/hpointed.glb",
		"/3d/grad.glb",
		"/3d/Boxed.glb",
		"/3d/newCard.glb",
	];

	const fontNames: string[] = [
		"Fira Sans", // Must match your @font-face
		"Neue Regrade Variable",
		"Space Grotesk Variable",
	];

	/**
	 *   Progress Tracking by Counting total assets
	 *   Increment a counter every time one asset
	 *   finishes loading.
	 */
	const totalAssets = imagePaths.length + modelPaths.length + fontNames.length;
	let loadedCount = 0;

	/** Update inside every Load Call Promise */
	const updateProgress = (): void => {
		loadedCount++;
		const percent = Math.round((loadedCount / totalAssets) * 100);
		onProgress?.(percent);
	};

	/** Promises for Images */
	const imagePromise = imagePaths.map((eachPath) => {
		return new Promise<void>((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				updateProgress();
				resolve();
			};
			img.onerror = () => {
				updateProgress();
				reject(`Failed to load: ${eachPath}`);
			};
			img.src = eachPath;
		});
	});

	/** Promises for Models */
	const loader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath("/draco/gltf/");
	loader.setDRACOLoader(dracoLoader);
	const modelPromise = modelPaths.map((eachPath) => {
		return loader
			.loadAsync(eachPath)
			.then((gltf: GLTF) => {
				updateProgress();
				return gltf;
			})
			.catch((err: Error) => {
				updateProgress();
				console.error(`Failed to load model: ${eachPath}`, err.message);
			});
	});

	/** Promises for Fonts */
	const fontPromise = fontNames.map(async (name) => {
		const font = new FontFaceObserver(name);
		await font.load();
		updateProgress();
	});

	/*** Return All Promises
	 * following line means
	 * result = await Promise.all([...fontPromise, ...imagePromise, ...modelPromise]);
	 * return result;
	 */
	return Promise.all([...fontPromise, ...imagePromise, ...modelPromise]);
}
