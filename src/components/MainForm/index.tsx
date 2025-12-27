import { PlayCircleIcon } from "lucide-react";
import { useRef } from "react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

export const MainForm = () => {
	const taskNameInput = useRef<HTMLInputElement>(null);

	const handleCreateNewTask = (event: React.FormEvent) => {
		event.preventDefault();
		if (!taskNameInput.current) return;

		const taskName = taskNameInput.current.value;
		console.log("New task created:", taskName);
	};

	return (
		<form className="form" onSubmit={handleCreateNewTask}>
			<div className="formRow">
				<DefaultInput
					placeholder="Digite sua tarefa"
					htmlFor="task"
					label="Task:"
					id="task"
					ref={taskNameInput}
					type="text"
				/>
			</div>

			<div className="formRow">
				<p>
					{/* lorem5 = vai gerar um lorem com 5 palavras:  Lorem ipsum dolor sit amet.  */}
					Lorem ipsum dolor sit amet.
				</p>
			</div>

			<div className="formRow">
				<Cycles />
			</div>

			<div className="formRow">
				<DefaultButton icon={<PlayCircleIcon />} color="green" />
			</div>
		</form>
	);
};
