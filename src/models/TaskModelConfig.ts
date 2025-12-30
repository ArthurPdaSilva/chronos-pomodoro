export type TaskDurationType = "workTime" | "shortBreakTime" | "longBreakTime";
export const taskTypeDictionary: Record<TaskDurationType, string> = {
	workTime: "Foco",
	shortBreakTime: "Pausa Curta",
	longBreakTime: "Pausa Longa",
};

export type TaskConfig = {
	workTime: number;
	shortBreakTime: number;
	longBreakTime: number;
};

export type TaskModel = {
	id: string;
	name: string;
	duration: number;
	startDate: number;
	completeDate: number | null; // quando o timer chega ao final
	interruptDate: number | null; // quando a task for interrompida
	// type: keyof TaskStateModel["config"]; // "workTime" | "shortBreakTime" | "longBreakTime"
	type: TaskDurationType;
};

export type TaskStateModel = {
	tasks: TaskModel[];
	secondsRemaining: number;
	formattedSecondsRemaining: string;
	activeTask: TaskModel | null;
	currentCycle: number; // 1 a 8
	config: TaskConfig;
};
