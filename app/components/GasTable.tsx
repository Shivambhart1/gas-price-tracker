"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import SendTxButton from "./SendTransaction";
import { NETWORK_CONFIG, Networks } from "../constants";
import { Lightning, Refresh } from "../svg";
import { useSimulationStore } from "@/app/store/useGasStore";

interface GasData {
  gasPrice: string;
  lastBaseFeePerGas: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
}

const GasTable = () => {
  const [gasData, setGasData] = useState<Partial<Record<Networks, GasData>>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  const isSimulation = useSimulationStore(
    (state: { isSimulation: boolean }) => state.isSimulation
  );

  const weiToGwei = (wei: string): string =>
    (BigInt?.(wei) / BigInt(1e9)).toString();

  const formatGwei = (wei: string): string => Number(weiToGwei(wei)).toFixed(2);

  const endpoint = isSimulation
    ? "/api/gas/simulation-price"
    : "/api/gas/gas-price";
  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(endpoint);
        setTimeout(() => {
          setGasData(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch gas prices:", error);
        setLoading(false);
      }
    };

    fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 15000);
    return () => clearInterval(interval);
  }, [isSimulation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Gas Tracker Pro
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Real-time gas prices with transaction simulation
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="order-2 lg:order-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => useSimulationStore.getState().toggleSimulation()}
                className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
              >
                Toggle Mode
              </button>
              <span
                className={`
                inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide border transition-all duration-300
                ${
                  isSimulation
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300"
                    : "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300"
                }
              `}
              >
                <span
                  className={`
                      w-2 h-2 rounded-full mr-2 animate-pulse
                      ${isSimulation ? "bg-yellow-500" : "bg-green-500"}
                    `}
                ></span>
                Mode: {isSimulation ? "Simulation" : "Live"}
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Lightning />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Live Gas Prices
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="hidden sm:inline">Live</span>
              </div>
            </div>
            <h1 className="text-sm text-gray-500 py-4">
              <b>Disclaimer</b>: 0 values may occur when real-time data is
              temporarily unavailable from the network or external sources.
            </h1>

            <h1 className="text-lg text-gray-700 font-bold py-4">
              1 GEWI = 0.000000001 ETH
            </h1>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-200 rounded-2xl h-32"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(NETWORK_CONFIG).map(
                  ([network, { icon, gradient, type }]) => (
                    <div
                      key={network}
                      className="group hover:scale-[1.02] transition-all duration-200"
                    >
                      <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm group-hover:shadow-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div
                              className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-bold`}
                            >
                              {icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 capitalize text-base sm:text-lg">
                                {network}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-500">
                                {type}
                              </p>
                            </div>
                          </div>
                          <div className="text-right font-mono text-sm sm:text-base text-gray-700 space-y-1">
                            {gasData[network as Networks] ? (
                              <>
                                <div>
                                  <strong>Base:</strong>&nbsp;
                                  {formatGwei(
                                    gasData[network as Networks]!
                                      .lastBaseFeePerGas
                                  )}
                                  &nbsp; Gwei
                                </div>
                                <div>
                                  <strong>Max:</strong>&nbsp;
                                  {formatGwei(
                                    gasData[network as Networks]!.maxFeePerGas
                                  )}
                                  &nbsp; Gwei
                                </div>
                                <div>
                                  <strong>Priority:</strong>&nbsp;
                                  {formatGwei(
                                    gasData[network as Networks]!
                                      .maxPriorityFeePerGas
                                  )}
                                  &nbsp; Gwei
                                </div>
                                <div className="text-md font-bold text-gray-900 pt-1">
                                  🚀&nbsp;
                                  {formatGwei(
                                    gasData[network as Networks]!.gasPrice
                                  )}
                                  &nbsp; Gwei
                                </div>
                              </>
                            ) : (
                              <div className="text-gray-500">Loading...</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
              <span>Updates every 15 seconds</span>
              <div className="flex items-center gap-2">
                <Refresh />
                <span>Auto-refresh</span>
              </div>
            </div>
          </div>

          <SendTxButton />
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          Gas prices are fetched from multiple sources and updated in real-time
        </footer>
      </div>
    </div>
  );
};

export default GasTable;
