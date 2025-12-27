import styles from "./styles.module.css";

type DefaultInputProps = {
	htmlFor: string;
	label: string;
	ref: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>; //Ou React.ComponentProps<'input'>

export function DefaultInput({ htmlFor, ref, label, ...props }: DefaultInputProps) {
	return (
		<>
			<label htmlFor={htmlFor}>{label}</label>
			<input className={styles.input} ref={ref} {...props} />
		</>
	);
}
