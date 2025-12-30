import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useRef } from "react";
import { showMessage } from "../../adapters/showMessage";
import { useTaskContext } from "../../context/TaskContext";
import { TaskActionTypes } from "../../context/TaskContext/taskAction";
import type { TaskModel } from "../../models/TaskModelConfig";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { Tips } from "../Tips";

export const MainForm = () => {
	const { state, dispatch } = useTaskContext();
	const taskNameInput = useRef<HTMLInputElement>(null);
	const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

	const nextCycle = getNextCycle(state.currentCycle);
	const nextCycleType = getNextCycleType(nextCycle);

	const handleCreateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		showMessage.dissmiss();

		const taskName = taskNameInput.current?.value.trim();
		if (!taskName || taskName.length === 0) {
			showMessage.warning("Digite um nome válido para a tarefa!");
			return;
		}

		if (state.tasks.length > 50) {
			showMessage.warning("Histórico de tarefas cheio. Limpe-o");
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

		dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
		showMessage.success(`Tarefa iniciada! Boa sorte!`);
	};

	const handleInterruptTask = () => {
		showMessage.dissmiss();
		dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
		showMessage.info("Tarefa interrompida!");
	};

	return (
		<form className="form" onSubmit={handleCreateNewTask}>
			<div className="formRow">
				<DefaultInput
					placeholder="Digite sua tarefa"
					htmlFor="task"
					label="Task:"
					id="task"
					defaultValue={lastTaskName}
					disabled={!!state.activeTask}
					ref={taskNameInput}
					type="text"
				/>
			</div>

			<div className="formRow">
				<Tips />
			</div>

			{state.currentCycle !== 0 && (
				<div className="formRow">
					<Cycles />
				</div>
			)}

			<div className="formRow">
				{!state.activeTask ? (
					<DefaultButton
						key="startButton"
						aria-label="Iniciar nova tarefa"
						title="Iniciar nova tarefa"
						type="submit"
						icon={<PlayCircleIcon />}
						color="green"
					/>
				) : (
					<DefaultButton
						key="stopButton" //Para forçar a recriação do botão e evitar problemas de estado interno, pois aqui ele tentará reaproveitar o botão de start como o de stop
						aria-label="Interromper tarefa atual"
						title="Interromper tarefa atual"
						type="button"
						onClick={handleInterruptTask}
						icon={<StopCircleIcon />}
						color="red"
					/>
				)}
			</div>
		</form>
	);
};
