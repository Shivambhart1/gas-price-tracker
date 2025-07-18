import { create } from "zustand";

interface GasPrices {
  ethereum: number | null;
  polygon: number | null;
  arbitrum: number | null;
}

interface StoreState {
  mode: string;
  gasPrices: GasPrices;
  setMode: (mode: string) => Partial<StoreState>;
  setGasPrice: (chain: string, price: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  mode: "live",
  gasPrices: {
    ethereum: null,
    polygon: null,
    arbitrum: null,
  },
  setMode: (mode: string) => ({ mode }),
  setGasPrice: (chain: string, price: number) =>
    set((state) => ({
      gasPrices: { ...state.gasPrices, [chain]: price },
    })),
}));
