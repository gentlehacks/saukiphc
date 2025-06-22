import {create} from "zustand"

interface AppStoreState {
  appTheme: boolean;
  setAppTheme: () => void;
}

export const AppState = create<AppStoreState>((set) => ({
  appTheme: true,
  setAppTheme: () => set((state) => ({
    appTheme: !state.appTheme
  })),
}));