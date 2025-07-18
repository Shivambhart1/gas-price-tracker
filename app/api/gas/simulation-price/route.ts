import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ethereum: {
      gasPrice: "42000000000",
      maxFeePerGas: "48000000000",
      maxPriorityFeePerGas: "2000000000",
      lastBaseFeePerGas: "40000000000",
    },
    polygon: {
      gasPrice: "6000000000",
      maxFeePerGas: "7000000000",
      maxPriorityFeePerGas: "1000000000",
      lastBaseFeePerGas: "5000000000",
    },
    arbitrum: {
      gasPrice: "800000000",
      maxFeePerGas: "1000000000",
      maxPriorityFeePerGas: "200000000",
      lastBaseFeePerGas: "700000000",
    },
  });
}
