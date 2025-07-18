import { ethers } from 'ethers'
import { arbProvider, ethProvider, PolyProvider } from '../lib/providers'

const RPCS = {
  ethereum: ethProvider,
  polygon: PolyProvider,
  arbitrum: arbProvider,
}

export async function fetchGasPrices() {
  const result: any = {}

  for (const [chain, rpc] of Object.entries(RPCS)) {
    const provider = new ethers.providers.JsonRpcProvider(rpc)
    const feeData = await provider.getFeeData()
    result[chain] = {
      gasPrice: feeData.gasPrice?.toString(),
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
      maxFeePerGas: feeData.maxFeePerGas?.toString(),
    }
  }

  return result
}
