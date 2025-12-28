import type { TaskModel } from "../../models/TaskModelConfig";

export const TaskActionTypes = {
	START_TASK: "START_TASK",
	INTERRUPT_TASK: "INTERRUPT_TASK",
	RESET_STATE: "RESET_STATE",
} as const;

// Dessa forma, ele força quando for usado uma action com payload, que o payload seja do tipo TaskModel
type TaskActionsWithPayload = {
	type: typeof TaskActionTypes.START_TASK;
	payload: TaskModel;
};

type TaskActionsWithoutPayload =
	| {
			type: typeof TaskActionTypes.RESET_STATE;
	  }
	| {
			type: typeof TaskActionTypes.INTERRUPT_TASK;
	  };

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithoutPayload;
