import { FC, ReactNode } from 'react';
import styles from './button.module.css';

interface IButtonProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = ({ children, onClick, disabled = false }) => (
  <button className={styles.button} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
