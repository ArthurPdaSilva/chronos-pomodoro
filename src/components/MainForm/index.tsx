import { PlayCircleIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContext } from "../../context/TaskContext";
import type { TaskModel } from "../../models/TaskModelConfig";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

export const MainForm = () => {
	const { setState } = useTaskContext();
	const taskNameInput = useRef<HTMLInputElement>(null);

	const handleCreateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const taskName = taskNameInput.current?.value.trim();
		if (!taskName || taskName.length === 0) {
			alert("Por favor, insira um nome válido para a tarefa.");
			return;
		}

		const newTask: TaskModel = {
			id: Date.now().toString(),
			name: taskName,
			startDate: Date.now(),
			completeDate: null,
			interruptDate: null,
			duration: 1,
			type: "workTime",
		};

		setState((prevState) => ({
			...prevState,
			tasks: [...prevState.tasks, newTask],
			activeTask: newTask,
			currentCycle: 1,
			secondsRemaining: prevState.config.workTime * 60,
			formattedSecondsRemaining: "00:00",
		}));
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
