import { createContext, useContext } from "react";
import type { TaskStateModel } from "../../models/TaskModelConfig";
import { initialTaskState } from "./initialTaskState";

type TaskContextProps = {
	state: TaskStateModel;
	setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue = {
	state: initialTaskState,
	setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);

export const useTaskContext = () => {
	return useContext(TaskContext);
};
