import type { TaskModel, TaskStateModel } from "../../models/TaskModelConfig";

export const TaskActionTypes = {
	START_TASK: "START_TASK",
	INTERRUPT_TASK: "INTERRUPT_TASK",
	COUNT_DOWN: "COUNT_DOWN",
	COMPLETE_TASK: "COMPLETE_TASK",
	RESET_STATE: "RESET_STATE",
} as const;

// Dessa forma, ele força quando for usado uma action com payload, que o payload seja do tipo TaskModel
type TaskActionsWithPayload =
	| {
			type: typeof TaskActionTypes.START_TASK;
			payload: TaskModel;
	  }
	| {
			type: typeof TaskActionTypes.COUNT_DOWN;
			payload: Pick<TaskStateModel, "secondsRemaining">;
	  };

type TaskActionsWithoutPayload =
	| {
			type: typeof TaskActionTypes.COMPLETE_TASK;
	  }
	| {
			type: typeof TaskActionTypes.INTERRUPT_TASK;
	  }
	| {
			type: typeof TaskActionTypes.RESET_STATE;
	  };

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithoutPayload;
