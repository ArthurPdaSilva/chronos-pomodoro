import { useTaskContext } from "../../context/TaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import styles from "./styles.module.css";

const cycleDescriptionsMap = {
	workTime: "Tempo de Foco",
	shortBreakTime: "Pausa Curta",
	longBreakTime: "Pausa Longa",
};

export function Cycles() {
	const { state } = useTaskContext();

	const cycleStep = Array.from({ length: state.currentCycle }); //Array(5).fill(null);

	return (
		<div className={styles.cycles}>
			<span>Ciclos: </span>
			<div className={styles.cycleDots}>
				{cycleStep.map((_, index) => {
					const nextCycle = getNextCycle(index);
					const nextCycleType = getNextCycleType(nextCycle);
					return (
						<span
							key={`${nextCycle}-${nextCycleType}`} //Ele usa a key para fazer comparações internas de renderização
							title={`Indicador de ${cycleDescriptionsMap[nextCycleType]}`}
							className={`${styles.cycleDot} ${styles[nextCycleType]}`}
						/>
					);
				})}
			</div>
		</div>
	);
}
