import { SaveIcon } from "lucide-react";
import { useEffect } from "react";
import { showMessage } from "../adapters/showMessage";
import { Container } from "../components/Container";
import { DefaultButton } from "../components/DefaultButton";
import { DefaultInput } from "../components/DefaultInput";
import { Heading } from "../components/Heading";
import { useTaskContext } from "../context/TaskContext";
import { TaskActionTypes } from "../context/TaskContext/taskAction";
import type { TaskConfig } from "../models/TaskModelConfig";
import { MainTemplate } from "../templates/MainTemplate";

export function Settings() {
	const { state, dispatch } = useTaskContext();

	const handleSaveSettings = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formErrors: string[] = [];
		const formData = new FormData(e.currentTarget);

		const settings: TaskConfig = {
			workTime: Number(formData.get("workTime")),
			shortBreakTime: Number(formData.get("shortBreakTime")),
			longBreakTime: Number(formData.get("longBreakTime")),
		};

		const { workTime, shortBreakTime, longBreakTime } = settings;

		//Essa checagem é só para garantir que um usuário avançado não insira valores inválidos via DevTools
		if (Number.isNaN(workTime) || Number.isNaN(shortBreakTime) || Number.isNaN(longBreakTime)) {
			formErrors.push("Digite apenas números para TODOS os campos");
		}

		if (workTime < 1 || workTime > 99) {
			formErrors.push("Digite valores entre 1 e 99 para foco");
		}

		if (shortBreakTime < 1 || shortBreakTime > 30) {
			formErrors.push("Digite valores entre 1 e 30 para descanso curto");
		}

		if (longBreakTime < 1 || longBreakTime > 60) {
			formErrors.push("Digite valores entre 1 e 60 para descanso longo");
		}

		if (shortBreakTime >= workTime) {
			formErrors.push("O tempo de descanso curto deve ser menor que o tempo de foco");
		}

		if (longBreakTime <= shortBreakTime) {
			formErrors.push("O tempo de descanso longo deve ser maior que o tempo de descanso curto");
		}

		if (formErrors.length > 0) {
			for (const error of formErrors) {
				showMessage.error(error);
			}
			return;
		}

		dispatch({ type: TaskActionTypes.CHANGE_SETTINGS, payload: { config: settings } });
		showMessage.success("Configurações salvas com sucesso!");
	};

	useEffect(() => {
		document.title = "Configurações - Chronos Pomodoro";
	}, []);

	return (
		<MainTemplate>
			<Container>
				<Heading>Configurações</Heading>
			</Container>
			<Container>
				<p style={{ textAlign: "center" }}>
					Modifique as configurações para tempo de foco, descanso curso e descanso longo.
				</p>
			</Container>
			<Container>
				<form action="" onSubmit={handleSaveSettings} className="form">
					<div className="formRow">
						<DefaultInput
							type="number"
							name="workTime"
							id="workTime"
							required
							label="Foco"
							htmlFor="workTime"
							defaultValue={state.config.workTime}
						/>
					</div>
					<div className="formRow">
						<DefaultInput
							type="number"
							required
							name="shortBreakTime"
							id="shortBreakTime"
							label="Descanso Curto"
							htmlFor="shortBreakTime"
							defaultValue={state.config.shortBreakTime}
						/>
					</div>
					<div className="formRow">
						<DefaultInput
							type="number"
							required
							name="longBreakTime"
							id="longBreakTime"
							label="Descanso Longo"
							htmlFor="longBreakTime"
							defaultValue={state.config.longBreakTime}
						/>
					</div>
					<div className="formRow">
						<DefaultButton
							icon={<SaveIcon />}
							aria-label="Salvar Configurações"
							title="Salvar Configurações"
							type="submit"
						/>
					</div>
				</form>
			</Container>
		</MainTemplate>
	);
}
