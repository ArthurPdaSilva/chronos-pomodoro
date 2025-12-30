import gravitationalBeep from "../assets/audios/gravitational_beep.mp3";

// A função de tocar música tem que ser carregada por conta do navegador safari que conflita, pois esperava que o usuário interagisse com a página antes de tocar qualquer som
export const loadBeep = () => {
	const beep = new Audio(gravitationalBeep);
	beep.load();
	return () => {
		beep.currentTime = 0; //Isso garante que o som comece do início
		beep.play().catch((error) => {
			console.error("Erro ao tentar reproduzir o som:", error);
		});
	};
};
