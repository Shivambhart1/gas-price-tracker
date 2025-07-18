"use client";

import { useState } from "react";

const SendTxButton = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [valueEth, setValueEth] = useState("");
  const [gasPriceGwei, setGasPriceGwei] = useState("");
  const [estimatedFee, setEstimatedFee] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const connectWallet = async () => {
    setFrom("0x1234...5678");
    setIsConnected(true);
    console.log("Wallet connected!");
  };

  const handleSimulate = async () => {
    try {
      setIsSimulating(true);

      if (!to) {
        console.error("Please enter a 'To' address.");
        return;
      }

      if (!gasPriceGwei || isNaN(Number(gasPriceGwei))) {
        console.error("Invalid gas price.");
        return;
      }

      const gasLimit = 21000;
      const gasPrice = parseFloat(gasPriceGwei) * 1e9; // Convert to wei
      const fee = (gasPrice * gasLimit) / 1e18; // Convert to ETH
      setEstimatedFee(fee.toFixed(6));
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Transaction Simulator
        </h3>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Connect Wallet
            </div>
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-800">
                Connected
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1 font-mono">{from}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Address
            </label>
            <input
              placeholder="0x..."
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (ETH)
            </label>
            <input
              placeholder="0.01"
              value={valueEth}
              onChange={(e) => setValueEth(e.target.value)}
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gas Price (Gwei)
            </label>
            <input
              placeholder="20"
              value={gasPriceGwei}
              onChange={(e) => setGasPriceGwei(e.target.value)}
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>
        </div>

        <button
          onClick={handleSimulate}
          disabled={isSimulating}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:hover:scale-100 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isSimulating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Simulating...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Simulate Transaction
            </div>
          )}
        </button>

        {estimatedFee && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-semibold text-green-800">
                Estimated Gas Fee
              </span>
            </div>
            <p className="text-lg font-bold text-green-700">
              {estimatedFee} ETH
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendTxButton;