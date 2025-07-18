import { JsonRpcProvider } from 'ethers'

const RPCS = {
  ethereum: "https://eth-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM",
  polygon: "https://polygon-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM",
  arbitrum: "https://arb-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM",
}

export async function fetchGasPrices() {
  const result: Record<string, {
    gasPrice?: string,
    maxPriorityFeePerGas?: string,
    maxFeePerGas?: string
  }> = {}

  for (const [chain, rpcUrl] of Object.entries(RPCS)) {
    const provider = new JsonRpcProvider(rpcUrl)
    const feeData = await provider.getFeeData()
    result[chain] = {
      gasPrice: feeData.gasPrice?.toString(),
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
      maxFeePerGas: feeData.maxFeePerGas?.toString(),
    }
  }

  return result
}
