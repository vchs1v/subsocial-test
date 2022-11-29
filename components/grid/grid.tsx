import { FC, ReactNode } from 'react';
import styles from './grid.module.css';

interface IGridProps {
  children: ReactNode;
}

const Grid: FC<IGridProps> = ({ children }) => (
  <div className={styles.grid_container}>{children}</div>
);

export default Grid;
