export type Networks = "ethereum" | "polygon" | "arbitrum";

export const NETWORK_CONFIG: Record<
  Networks,
  { icon: string; gradient: string; type: string }
> = {
  ethereum: {
    icon: "⟠",
    gradient: "from-blue-500 to-purple-600",
    type: "Layer 1",
  },
  polygon: {
    icon: "⬣",
    gradient: "from-purple-500 to-pink-600",
    type: "Layer 2",
  },
  arbitrum: {
    icon: "🔵",
    gradient: "from-blue-400 to-cyan-500",
    type: "Layer 2",
  },
};
