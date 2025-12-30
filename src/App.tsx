import { MessagesContainer } from "./components/MessagesContainer";
import { TaskContextProvider } from "./context/TaskContext/TaskContextProvider";
import { MainRouter } from "./routes/MainRouter";
import "./styles/global.css";
import "./styles/theme.css";

export function App() {
	return (
		<TaskContextProvider>
			<MessagesContainer>
				<MainRouter />
			</MessagesContainer>
		</TaskContextProvider>
	);
}
