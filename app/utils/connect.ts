
import { WebSocketProvider } from "ethers";

export const testConnection = async () => {
  const ethProvider = new WebSocketProvider('https://eth-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM');
  const polygonProvider = new WebSocketProvider('https://polygon-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM');
  const arbitrumProvider = new WebSocketProvider('https://arb-mainnet.g.alchemy.com/v2/Fe0mK1G6yPCmgzZDJM4OzjZGseAC0sCM');

  try {
    const [ethBlock, polyBlock, arbBlock] = await Promise.all([
      ethProvider.getBlockNumber(),
      polygonProvider.getBlockNumber(),
      arbitrumProvider.getBlockNumber(),
    ]);

    console.log("Ethereum connected, latest block:", ethBlock);
    console.log("Polygon connected, latest block:", polyBlock);
    console.log("Arbitrum connected, latest block:", arbBlock);
  } catch (error) {
    console.error("Connection failed:", error);
  }
};
