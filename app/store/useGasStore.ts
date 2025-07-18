import {create} from "zustand"

type SimulationState = {
  isSimulation: boolean;
  toggleSimulation: () => void;
  setSimulation: (value: boolean) => void;
};

export const useSimulationStore = create<SimulationState>((set) => ({
  isSimulation: false,
  toggleSimulation: () => set((state) => ({ isSimulation: !state.isSimulation })),
  setSimulation: (value: boolean) => set({ isSimulation: value }),
}))
