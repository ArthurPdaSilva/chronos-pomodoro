import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: false positive
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

// O StrictMode é um recurso do React que ajuda a identificar problemas potenciais no aplicativo durante o desenvolvimento. Ele ativa verificações adicionais e avisos para componentes filhos, mas não afeta o comportamento do aplicativo em produção. (Causa o double render no dev mode)
