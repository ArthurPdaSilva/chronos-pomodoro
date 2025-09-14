import styles from './styles.module.css';

type DefaultInputProps = {
  htmlFor: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>; //Ou React.ComponentProps<'input'>

export function DefaultInput({ htmlFor, label, ...props }: DefaultInputProps) {
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <input className={styles.input} {...props} />
    </>
  );
}
