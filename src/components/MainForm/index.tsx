import { PlayCircleIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContext } from "../../context/TaskContext";
import type { TaskModel } from "../../models/TaskModelConfig";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { getNextInterval } from "../../utils/getNextInterval";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

export const MainForm = () => {
	const { state, setState } = useTaskContext();
	const taskNameInput = useRef<HTMLInputElement>(null);

	const nextCycle = getNextCycle(state.currentCycle);
	const nextCycleType = getNextCycleType(nextCycle);

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
			duration: state.config[nextCycleType],
			type: nextCycleType,
		};

		const secondsRemaining = state.config[nextCycleType] * 60;

		setState((prevState) => ({
			...prevState,
			tasks: [...prevState.tasks, newTask],
			activeTask: newTask,
			currentCycle: nextCycle,
			secondsRemaining,
			formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
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
				<p>Próximo intervalo é de {getNextInterval(state.currentCycle)}min</p>
			</div>

			{state.currentCycle !== 0 && (
				<div className="formRow">
					<Cycles />
				</div>
			)}

			<div className="formRow">
				<DefaultButton icon={<PlayCircleIcon />} color="green" />
			</div>
		</form>
	);
};
