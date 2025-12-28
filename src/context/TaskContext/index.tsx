import { createContext, useContext } from "react";
import type { TaskStateModel } from "../../models/TaskModelConfig";
import { initialTaskState } from "./initialTaskState";
import type { TaskActionModel } from "./taskAction";

type TaskContextProps = {
	state: TaskStateModel;
	dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue = {
	state: initialTaskState,
	dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);

export const useTaskContext = () => {
	return useContext(TaskContext);
};
