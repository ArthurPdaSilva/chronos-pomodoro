import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { Home } from "../../pages/Home";
import { NotFound } from "../../pages/NotFound";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export const MainRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about-pomodoro" element={<AboutPomodoro />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ScrollToTop />
		</BrowserRouter>
	);
};
