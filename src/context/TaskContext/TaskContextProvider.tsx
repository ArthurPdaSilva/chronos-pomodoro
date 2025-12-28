// biome-ignore assist/source/organizeImports: false positive
import { useEffect, useReducer } from "react";
import { TaskContext } from ".";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { initialTaskState } from "./initialTaskState";
import { TaskActionTypes } from "./taskAction";
import { taskReducer } from "./taskReducer";

type TaskContextProviderProps = {
	children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
	const [state, dispatch] = useReducer(taskReducer, initialTaskState);

	const worker = TimerWorkerManager.getInstance();
	worker.onmessage((e) => {
		const remaining = e.data;

		if (remaining <= 0) {
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
		if (!state.activeTask) {
			worker.terminate();
			return;
		}

		worker.postMessage(state);
	}, [state, worker]);

	return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
}
