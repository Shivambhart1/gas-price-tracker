# Web3 Gas Tracker

A lightweight Next.js + TypeScript application for tracking gas fees across Ethereum, Polygon, and Arbitrum in real-time, with support for simulation mode using Zustand.

## ✨ Features

- 🚀 Live gas fee data from Ethereum, Polygon, Arbitrum via Alchemy RPC
- 💵 Display gas fees in Gwei and USD
- 🧪 Simulation mode using Zustand for mock testing
- 📊 Detailed breakdown of `gasPrice`, `maxFeePerGas`, and `priorityFee`
- ⚙️ Modular utilities for Wei to Gwei/USD conversions

## 🧱 Technologies

- Next.js 14 (App Router)
- TypeScript
- Zustand (State Management)
- Ethers.js
- Tailwind CSS (optional)
- Alchemy RPC

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gas-tracker.git
cd gas-tracker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file and add your Alchemy keys:

```env
ALCHEMY_ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/your-key
ALCHEMY_POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/your-key
ALCHEMY_ARBITRUM_RPC=https://arb-mainnet.g.alchemy.com/v2/your-key
```

### 4. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Simulation Mode

To enable simulation mode for UI/UX testing without real API calls:

```ts
import { useGasStore } from "@/store/gasStore";

useGasStore.setState({
  simulation: true,
  gasData: {
    ethereum: { gasPrice: 20, maxFeePerGas: 25, maxPriorityFeePerGas: 2, lastBaseFeePerGas: 23 },
    polygon: { gasPrice: 70, maxFeePerGas: 100, maxPriorityFeePerGas: 10, lastBaseFeePerGas: 85 },
    arbitrum: { gasPrice: 0.5, maxFeePerGas: 1, maxPriorityFeePerGas: 0.2, lastBaseFeePerGas: 0.8 },
  },
});
```

## 📁 File Structure

```
/app
  /api/gas/route.ts       → Fetches gas data from Alchemy
  /components/GasTable.tsx
  /utils/format.ts        → Wei to Gwei and USD converters
/store/gasStore.ts        → Zustand store
```

## 📌 Notes

> Some values may return as `0` due to RPC availability or network inconsistencies. We rely on best-effort data accuracy across supported chains.
