import Circles from "@/Utils/Circles";
import { Heatmap } from "@paper-design/shaders-react";
import Link from "next/link";
import { TextBrand } from "@/Utils/TextBrand";
type logoSize = {
	width: number;
	height: number;
};

function Header() {
	//  top-[calc(var(--gutter)+120px)] left-[calc(var(--gutter)+20px)]

	return (
		<div className="fixed top-0 left-0 z-100 w-full h-25 flex flex-row justify-between items-center">
			<Link href="/" className="flex flex-row items-center justify-center">
				<Logo width={50} height={50} />
				<TextBrand show={true} />
			</Link>

			<Circles />
		</div>
	);
}

export function Logo({ width, height }: logoSize) {
	return (
		<Heatmap
			speed={0.7}
			contour={0.15}
			angle={-35}
			noise={0}
			innerGlow={0.8}
			outerGlow={0.12}
			scale={0.5}
			image="/LogoRaw.png"
			colors={[
				"#4669e7",
				"#ff0000",
				"#ff7134",
				"#fff41c",
				"#497af7",
				"#2447c6",
				"#11258b",
			]}
			colorBack="#00000000"
			style={{
				backgroundColor: "var(--bg)",
				height: `${height}px`,
				width: `${width}px`,
			}}
		/>
	);
}

export default Header;
