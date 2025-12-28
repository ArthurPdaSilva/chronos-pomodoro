let isRunning = false;

self.onmessage = (event) => {
	if (isRunning) return;
	isRunning = true;

	// o setInterval pode falhar se o navegador estiver em segundo plano, então usar recursivamente o setTimeout com 1s
	const state = event.data;
	const { activeTask, secondsRemaining } = state;

	const endDate = activeTask.startDate + secondsRemaining * 1000;
	const tick = () => {
		const now = Date.now();
		const remaining = Math.max(0, Math.round((endDate - now) / 1000));

		self.postMessage(remaining);

		setTimeout(tick, 1000);
	};

	tick();
};
