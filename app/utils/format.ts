export const weiToGwei = (wei: bigint): string => {
  return (wei / (BigInt(10) ** BigInt(9))).toString()
}

export const weiToUsd = (wei: bigint): string => {
  return (wei / (BigInt(10) ** BigInt(9))).toString()
}