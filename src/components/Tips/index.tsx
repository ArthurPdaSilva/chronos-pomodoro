import { useTaskContext } from "../../context/TaskContext";
import type { TaskConfig } from "../../models/TaskModelConfig";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

const tipsForWhenActiveTask = (config: TaskConfig) => ({
	workTime: (
		<span>
			Foque por <b>{config.workTime}min</b>
		</span>
	),
	shortBreakTime: (
		<span>
			Descanse por <b>{config.shortBreakTime}min</b>
		</span>
	),
	longBreakTime: <span>Descanso longo</span>,
});

const tipsForNoActiveTask = (config: TaskConfig) => ({
	workTime: (
		<span>
			Próximo ciclo é de <b>{config.workTime}min</b>
		</span>
	),
	shortBreakTime: (
		<span>
			Próximo ciclo é de <b>{config.shortBreakTime}min</b>
		</span>
	),
	longBreakTime: <span>Próximo descanso será longo</span>,
});

export const Tips = () => {
	const { state } = useTaskContext();
	const nextCycle = getNextCycle(state.currentCycle);
	const nextCycleType = getNextCycleType(nextCycle);

	return (
		<>
			{state.activeTask
				? tipsForWhenActiveTask(state.config)[state.activeTask.type]
				: tipsForNoActiveTask(state.config)[nextCycleType]}
		</>
	);
};
