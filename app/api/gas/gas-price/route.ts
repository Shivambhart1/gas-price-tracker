import { NextResponse } from "next/server";

const RPCS = {
  ethereum: "https://eth-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM",
  polygon: "https://polygon-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM",
  arbitrum: "https://arb-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM",
};

async function fetchRPCData(rpcUrl: string, method: string, params: any[] = []): Promise<any> {
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  });

  const data = await response.json();
  return data.result;
}

async function getNetworkGasData(rpcUrl: string) {
  try {
    const gasPrice = await fetchRPCData(rpcUrl, "eth_gasPrice");
    
    const latestBlock = await fetchRPCData(rpcUrl, "eth_getBlockByNumber", ["latest", false]);
    
    const feeHistory = await fetchRPCData(rpcUrl, "eth_feeHistory", [
      "0x1", 
      "latest",
      [50] 
    ]);

    const gasPriceWei = BigInt(gasPrice);
    const baseFeeWei = latestBlock?.baseFeePerGas ? BigInt(latestBlock.baseFeePerGas) : BigInt(0);
    const priorityFeeWei = feeHistory?.reward?.[0]?.[0] ? BigInt(feeHistory.reward[0][0]) : BigInt(0);
    
    const maxFeeWei = baseFeeWei + priorityFeeWei + BigInt(2000000000); 

    return {
      gasPrice: gasPriceWei.toString(),
      lastBaseFeePerGas: baseFeeWei.toString(),
      maxFeePerGas: maxFeeWei.toString(),
      maxPriorityFeePerGas: priorityFeeWei.toString(),
    };
  } catch (error) {
    console.error("Error fetching gas data:", error);
    const gasPrice = await fetchRPCData(rpcUrl, "eth_gasPrice");
    return {
      gasPrice: gasPrice,
      lastBaseFeePerGas: "0",
      maxFeePerGas: gasPrice,
      maxPriorityFeePerGas: "0",
    };
  }
}

export async function GET() {
  try {
    const [ethGasData, polyGasData, arbGasData] = await Promise.all([
      getNetworkGasData(RPCS.ethereum),
      getNetworkGasData(RPCS.polygon),
      getNetworkGasData(RPCS.arbitrum),
    ]);

    return NextResponse.json({
      ethereum: ethGasData,
      polygon: polyGasData,
      arbitrum: arbGasData,
    });
  } catch (error) {
    console.error("Failed to fetch gas prices:", error);
    return NextResponse.json({ error: "Failed to fetch gas prices" }, { status: 500 });
  }
}