// biome-ignore assist/source/organizeImports: false positive
import { useEffect, useReducer, useRef } from "react";
import { TaskContext } from ".";
import { loadBeep } from "../../utils/loadBeep";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { initialTaskState } from "./initialTaskState";
import { TaskActionTypes } from "./taskAction";
import { taskReducer } from "./taskReducer";

type TaskContextProviderProps = {
	children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
	const [state, dispatch] = useReducer(taskReducer, initialTaskState);
	const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null); //Isso aqui garante que a função de tocar o som seja criada apenas uma vez e não a cada renderização

	const worker = TimerWorkerManager.getInstance();
	worker.onmessage((e) => {
		const remaining = e.data;

		if (remaining <= 0) {
			playBeepRef.current?.();
			playBeepRef.current = null; //Reseta a referência para que o som possa ser tocado novamente na próxima tarefa
			dispatch({
				type: TaskActionTypes.COMPLETE_TASK,
			});
			worker.terminate();
		} else {
			dispatch({
				type: TaskActionTypes.COUNT_DOWN,
				payload: { secondsRemaining: remaining },
			});
		}
	});

	useEffect(() => {
		if (state.activeTask && playBeepRef.current == null) {
			playBeepRef.current = loadBeep();
			return;
		}
		playBeepRef.current = null;
	}, [state.activeTask]);

	useEffect(() => {
		if (!state.activeTask) {
			worker.terminate();
			return;
		}

		worker.postMessage(state);
	}, [state, worker]);

	return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
}
