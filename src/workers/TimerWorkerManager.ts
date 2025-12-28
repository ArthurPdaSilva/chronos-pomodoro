import type { TaskStateModel } from "../models/TaskModelConfig";

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
	private worker: Worker;

	private constructor() {
		// Workers são scripts que rodam em segundo plano, separados do thread principal da aplicação
		// Isso aqui é só um exemplo de como criar um worker e enviar uma mensagem para ele, essa sintáxe é específica do Vite
		this.worker = new Worker(new URL("./timeWorker.js", import.meta.url));
	}

	public static getInstance(): TimerWorkerManager {
		if (!instance) {
			instance = new TimerWorkerManager();
		}
		return instance;
	}

	public postMessage(message: TaskStateModel) {
		this.worker.postMessage(message);
	}

	public onmessage(handler: (e: MessageEvent) => void) {
		this.worker.onmessage = handler;
	}

	public terminate() {
		this.worker.terminate();
		instance = null;
	}
}
