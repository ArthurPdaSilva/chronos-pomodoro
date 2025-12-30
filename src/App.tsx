import { BrowserRouter, Route, Routes } from "react-router";
import { MessagesContainer } from "./components/MessagesContainer";
import { TaskContextProvider } from "./context/TaskContext/TaskContextProvider";
import { AboutPomodoro } from "./pages/AboutPomodoro";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import "./styles/global.css";
import "./styles/theme.css";

export function App() {
	return (
		<TaskContextProvider>
			<MessagesContainer>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about-pomodoro" element={<AboutPomodoro />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</MessagesContainer>
		</TaskContextProvider>
	);
}
