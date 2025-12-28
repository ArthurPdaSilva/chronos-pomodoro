import type { TaskStateModel } from "../../models/TaskModelConfig";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { getNextCycle } from "../../utils/getNextCycle";
import { type TaskActionModel, TaskActionTypes } from "./taskAction";

export const taskReducer = (state: TaskStateModel, action: TaskActionModel): TaskStateModel => {
	switch (action.type) {
		case TaskActionTypes.START_TASK: {
			const newTask = action.payload;
			const nextCycle = getNextCycle(state.currentCycle);
			const secondsRemaining = newTask.duration * 60;

			return {
				...state,
				tasks: [...state.tasks, newTask],
				activeTask: newTask,
				currentCycle: nextCycle,
				secondsRemaining,
				formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
			};
		}
		case TaskActionTypes.INTERRUPT_TASK: {
			return {
				...state,
				activeTask: null,
				tasks: state.tasks.map((task) => {
					if (task.id === state.activeTask?.id) {
						return { ...task, interruptDate: Date.now() };
					}
					return task;
				}),
				secondsRemaining: 0,
				formattedSecondsRemaining: "00:00",
			};
		}
		case TaskActionTypes.RESET_STATE:
			return state;
		default:
			return state;
	}
};
