import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { useTaskContext } from "../../context/TaskContext";
import { TaskActionTypes } from "../../context/TaskContext/taskAction";
import { taskTypeDictionary } from "../../models/TaskModelConfig";
import { MainTemplate } from "../../templates/MainTemplate";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import type { SortTasksOptions } from "../../utils/sortTasks";
import { sortTasks } from "../../utils/sortTasks";
import styles from "./styles.module.css";

export function History() {
	const { state, dispatch } = useTaskContext();
	const hasTasks = state.tasks.length > 0;

	useEffect(() => {
		document.title = "Histórico - Chronos Pomodoro";
	}, []);

	useEffect(() => {
		setSortTasksOptions((prevState) => ({
			...prevState,
			tasks: sortTasks({
				tasks: state.tasks,
				field: prevState.field,
				direction: prevState.direction,
			}),
		}));
	}, [state.tasks]);

	const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(() => {
		return {
			tasks: sortTasks({ tasks: state.tasks }),
			field: "startDate",
			direction: "desc",
		};
	});

	const handleSortTasks = ({ field }: Pick<SortTasksOptions, "field">) => {
		const newDirection = sortTasksOptions.direction === "asc" ? "desc" : "asc";

		setSortTasksOptions({
			tasks: sortTasks({ tasks: state.tasks, field, direction: newDirection }),
			field,
			direction: newDirection,
		});
	};

	//Outra solução para evitar que a pergunta de confirmação apareça ao sair da página seria usar o useEffect para limpar o toast quando o componente for desmontado.
	// useEffect(() => {
	// 	return () => showMessage.dissmiss();
	// }, []);

	const handleResetHistory = () => {
		showMessage.dissmiss();
		showMessage.confirm("Tem certeza?", (confirmation) => {
			if (!confirmation) return;
			dispatch({ type: TaskActionTypes.RESET_STATE });
		});
	};

	return (
		<MainTemplate>
			<Container>
				<Heading>
					<span>History</span>
					{hasTasks && (
						<span className={styles.buttonContainer}>
							<DefaultButton
								icon={<TrashIcon />}
								color="red"
								aria-label="Apagar todo o histórico"
								title="Apagar todo o histórico"
								onClick={handleResetHistory}
							/>
						</span>
					)}
				</Heading>
			</Container>

			<Container>
				{hasTasks ? (
					<div className={styles.responsiveTable}>
						<table>
							<thead>
								<tr>
									<th className={styles.thSort} onClick={() => handleSortTasks({ field: "name" })}>
										Tarefa ↕
									</th>
									<th
										className={styles.thSort}
										onClick={() => handleSortTasks({ field: "duration" })}
									>
										Duração ↕
									</th>
									<th
										className={styles.thSort}
										onClick={() => handleSortTasks({ field: "startDate" })}
									>
										Data ↕
									</th>
									<th>Status</th>
									<th>Tipo</th>
								</tr>
							</thead>

							<tbody>
								{sortTasksOptions.tasks.map((task) => {
									return (
										<tr key={task.id}>
											<td>{task.name}</td>
											<td>{task.duration}min</td>
											<td>{formatDate(task.startDate)}</td>
											<td>{getTaskStatus(task, state.activeTask)}</td>
											<td>{taskTypeDictionary[task.type]}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : (
					<p style={{ textAlign: "center", fontWeight: "bold" }}>
						Ainda não existe tarefas criadas.
					</p>
				)}
			</Container>
		</MainTemplate>
	);
}
