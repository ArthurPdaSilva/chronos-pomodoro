import type { TaskModel } from "../models/TaskModelConfig";

export const getTaskStatus = (task: TaskModel, activeTask: TaskModel | null): string => {
	if (task.interruptDate) {
		return "Interrompida";
	}
	if (task.completeDate) {
		return "Completa";
	}

	if (task.id === activeTask?.id) return "Em Progresso";
	return "Abandonada";
};
