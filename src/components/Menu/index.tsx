/** biome-ignore-all lint/a11y/useValidAnchor: false positive */
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { RouterLink } from "../RouterLink";
import styles from "./styles.module.css";

type AvailableThemes = "light" | "dark";

const nextThemeIcon = {
	dark: <SunIcon />,
	light: <MoonIcon />,
};

//Para renomear use ctrl + f e preserve o case sensitive
export function Menu() {
	// Uma função passada dentro de um useState é chamada de lazy initial state, pois só é executada na primeira renderização
	const [theme, setTheme] = useState<AvailableThemes>(() => {
		const storageTheme = (localStorage.getItem("theme") as AvailableThemes) || "dark";
		return storageTheme;
	});

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const changeTheme = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		event.preventDefault();
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
	};

	return (
		<nav className={styles.menu}>
			<RouterLink
				className={styles.menuLink}
				href="/"
				aria-label="Ir para a Página Inicial"
				title="Ir para a Página Inicial"
			>
				<HouseIcon />
			</RouterLink>
			<RouterLink
				className={styles.menuLink}
				href="/history"
				aria-label="Ver o Histórico"
				title="Ver o Histórico"
			>
				<HistoryIcon />
			</RouterLink>
			<RouterLink
				className={styles.menuLink}
				href="#"
				aria-label="Ir para as Configurações"
				title="Ir para as Configurações"
			>
				<SettingsIcon />
			</RouterLink>
			<a
				className={styles.menuLink}
				href="#"
				aria-label="Mudar Tema"
				title="Mudar Tema"
				onClick={changeTheme}
			>
				{nextThemeIcon[theme]}
			</a>
		</nav>
	);
}
