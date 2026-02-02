import React, { forwardRef, useLayoutEffect, useState } from "react";
import { MathUtils } from "three";

interface SocialMediaProps {
	twitter?: string;
	github?: string;
	linkedin?: string;
}

const SocialMedia = forwardRef<HTMLDivElement, SocialMediaProps>(
	(props, ref) => {
		const [l1H, setL1H] = useState(360);
		const [l2H, setL2H] = useState(65);

		useLayoutEffect(() => {
			const getHeight = (
				minIT: number,
				baseIT: number,
				minSC: number,
				defSC: number,
			) => {
				return MathUtils.clamp(
					minIT,
					(baseIT * (window.innerHeight - 80)) / defSC,
					window.innerHeight - 80,
				);
			};
			const handleResize = () => {
				setL1H(getHeight(157, 360, 800, 1080));
				setL2H(getHeight(40, 65, 800, 1080));
			};

			handleResize();
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, []);

		return (
			<div
				ref={ref}
				className="fixed w-4 h-153.4 top-[18vh] left-[calc(var(--gutter)+10px)] z-10"
			>
				<div className="flex flex-col items-center gap-15">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1"
						height="100%"
						viewBox={`0 0 1 ${l1H}`}
						fill="none"
						className="vertical_line"
					>
						<path
							d={`M1 0V${l1H}`}
							stroke="#000000"
							strokeWidth="1"
							strokeLinecap="round"
						/>
					</svg>
					<div className="flex flex-col items-center gap-10">
						<a
							href={props.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className="socialLinks"
						>
							<img src="/images/twitter.svg" alt="twitter icon" />
						</a>
						<a
							href={props.github}
							target="_blank"
							rel="noopener noreferrer"
							className="socialLinks"
						>
							<img src="/images/github.svg" alt="github icon" />
						</a>
						<a
							href={props.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="socialLinks"
						>
							<img src="/images/linkedin.svg" alt="linkedin icon" />
						</a>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1"
						height="100%"
						viewBox={`0 0 1 ${l2H}`}
						fill="none"
						className="vertical_line"
					>
						<path
							d={`M1 0V${l2H}`}
							stroke="#000000"
							strokeWidth="1"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			</div>
		);
	},
);

export default SocialMedia;
