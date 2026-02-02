
type PType = {
	percent: number;
};
const Loading = ({ percent }: PType) => {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%,-50%)",
				fontSize: "20vw",
				textAlign: "center",
				alignItems: "center",
				color: "#0f0f0f",
			}}
		>
			{percent}% Loaded
		</div>
	);
};

export default Loading;
