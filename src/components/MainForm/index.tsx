import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useRef } from "react";
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

		dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

		// Workers são scripts que rodam em segundo plano, separados do thread principal da aplicação
		// Isso aqui é só um exemplo de como criar um worker e enviar uma mensagem para ele, essa sintáxe é específica do Vite
		const worker = new Worker(new URL("../../workers/timeWorker.js", import.meta.url));
		worker.postMessage("Teste");
		worker.onmessage = (message) => {
			console.log("Mensagem recebida do worker:", message.data);
		};
	};

	const handleInterruptTask = () => {
		dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
	};

	return (
		<form className="form" onSubmit={handleCreateNewTask}>
			<div className="formRow">
				<DefaultInput
					placeholder="Digite sua tarefa"
					htmlFor="task"
					label="Task:"
					id="task"
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
