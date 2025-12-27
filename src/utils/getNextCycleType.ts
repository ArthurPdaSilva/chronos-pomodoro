import type { TaskDurationType } from "../models/TaskModelConfig";

export function getNextCycleType(currentCycle: number): TaskDurationType {
	if (currentCycle % 8 === 0) return "longBreakTime";
	return currentCycle % 2 === 0 ? "shortBreakTime" : "workTime";
}
