/** biome-ignore-all lint/a11y/useValidAnchor: false positive */
import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from "lucide-react";
import { useCallback, useState } from "react";
import styles from "./styles.module.css";

type AvailableThemes = "light" | "dark";

//Para renomear use ctrl + f e preserve o case sensitive
export function Menu() {
	const [theme, setTheme] = useState<AvailableThemes>("light");

	const changeTheme = useCallback(() => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
	}, [theme]);

	return (
		<nav className={styles.menu}>
			<a
				className={styles.menuLink}
				href="#"
				aria-label="Ir para a Página Inicial"
				title="Ir para a Página Inicial"
			>
				<HouseIcon />
			</a>
			<a
				className={styles.menuLink}
				href="#"
				aria-label="Ver o Histórico"
				title="Ver o Histórico"
			>
				<HistoryIcon />
			</a>
			<a
				className={styles.menuLink}
				href="#"
				aria-label="Ir para as Configurações"
				title="Ir para as Configurações"
			>
				<SettingsIcon />
			</a>
			<a
				className={styles.menuLink}
				href="#"
				aria-label="Mudar Tema"
				title="Mudar Tema"
				onClick={(event) => {
					event.preventDefault();
					changeTheme();
				}}
			>
				<SunIcon />
			</a>
		</nav>
	);
}
