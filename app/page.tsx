"use client";
import { useEffect } from "react";
import { ethProvider } from "./lib/providers";
import { testConnection } from "./utils/connect";
import GasTable from "./components/GasTable";
import SendTxButton from "./components/SendTransaction";
import CandlestickChart from "./components/CandleStickChart";

export default function Home() {
  return (
    <div>
      <GasTable />
      {/* <CandlestickChart /> */}
    </div>
  );
}
