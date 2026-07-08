import { create } from 'zustand';

type DashboardLayoutMode = 'stacked' | 'split';

type UiState = {
	sidebarOpen: boolean;
	dashboardLayoutMode: DashboardLayoutMode;
	toggleSidebar: () => void;
	setSidebarOpen: (open: boolean) => void;
	setDashboardLayoutMode: (mode: DashboardLayoutMode) => void;
};

export const useUiStore = create<UiState>((set) => ({
	sidebarOpen: true,
	dashboardLayoutMode: 'stacked',
	toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
	setSidebarOpen: (open) => set({ sidebarOpen: open }),
	setDashboardLayoutMode: (dashboardLayoutMode) => set({ dashboardLayoutMode }),
}));

export type { DashboardLayoutMode };
