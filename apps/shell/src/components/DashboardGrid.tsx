import type { ReactNode } from 'react';
import * as styles from './DashboardGrid.module.css';

type DashboardGridProps = {
	children: ReactNode;
};

export function DashboardGrid({ children }: DashboardGridProps) {
	return <div className={styles.grid}>{children}</div>;
}

