import styles from "./styles.module.css";

type HeadingProps = {
	children: React.ReactNode; // Permite qualquer conteúdo React como filho
};

export function Heading({ children }: HeadingProps) {
	return <h1 className={styles.heading}>{children}</h1>;
}
