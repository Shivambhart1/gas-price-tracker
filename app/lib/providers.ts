import { ethers } from "ethers";

export const ethProvider = new ethers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM"
);
export const PolyProvider = new ethers.JsonRpcProvider(
  "https://polygon-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM"
);
export const arbProvider = new ethers.JsonRpcProvider(
  "https://arb-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM"
);
