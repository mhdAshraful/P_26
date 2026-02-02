import type { Metadata } from "next";
import "./globals.css";
import { OverLayProvider } from "@/Utils/OverlayContext";

export const metadata: Metadata = {
	title: "mhdAshraful",
	description:
		"Creative developer crafting outstanding user experiences. With over 3+ years of expertise in web development, he has a proven track record of turning designs into functional websites. His skills reaches beyound MERN stack, exploring new trends in web development. He has employed his skills to deliver high-quality code and innovative solutions, also committed to create seamless digital experiences that leave a lasting impression.",
	keywords:
		"Full stack Developer, Frontend Developer, freelance Web developer, Web developer, reliable developer, available for new project, creative design and developer.",
	authors: [
		{
			name: "Mohammed Ashraful Islam",
			url: "https://github.com/mhdAshraful",
		},
	],
	openGraph: {
		title: "Full-stack Developer (MERN) | Creative Design & Development |  Mhd Ashraful",
		description:
			"Creative developer crafting outstanding user experiences. With over 3+ years of expertise in web development, he has a proven track record of turning designs into functional websites. His skills reaches beyound MERN stack, exploring new trends in web development. He has employed his skills to deliver high-quality code and innovative solutions, also committed to create seamless digital experiences that leave a lasting impression.",
		url: "https://www.mhdashraful.com",
		// image: '/banner.webp',
	},
	alternates: {
		canonical: "https://www.mhdashraful.com/",
	},
	other: {
		"theme-color": "#fffff2",
	},
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="stylesheet" href="/fonts/Fira/css/fira-sans.css" />
				<link rel="stylesheet" href="/fonts/Neue/style_var.css" />
				<link rel="stylesheet" href="/fonts/SpGrotesk/sp_grotesk.css" />
			</head>
			<body className="antialiased">
				<OverLayProvider>{children}</OverLayProvider>
			</body>
		</html>
	);
}
