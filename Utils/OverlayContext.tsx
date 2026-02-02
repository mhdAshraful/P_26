"use client";

import React, {
	createContext,
	useContext,
	useState,
	type ReactNode,
} from "react";

/***
 * OVERLAY CONTEXT
 */
type OverlayContextValue = {
	shouldRenderModal: boolean;
	setShouldRenderModal: React.Dispatch<React.SetStateAction<boolean>>;
	viewModal: boolean;
	setViewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const OverlayContext = createContext<OverlayContextValue | undefined>(
	undefined,
);

export function OverLayProvider({ children }: { children: ReactNode }) {
	const [shouldRenderModal, setShouldRenderModal] = useState(false);
	const [viewModal, setViewModal] = useState(false);

	return (
		<OverlayContext.Provider
			value={{
				shouldRenderModal,
				setShouldRenderModal,
				viewModal,
				setViewModal,
			}}
		>
			{children}
		</OverlayContext.Provider>
	);
}
export const useOverlayContext = () => {
	const context = useContext(OverlayContext);
	if (!context) {
		throw new Error("useOverlayContext must be used within OverLayProvider");
	}
	return context;
};
