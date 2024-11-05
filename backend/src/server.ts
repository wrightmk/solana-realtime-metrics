import { WebSocketServer } from "ws";
import { fetchMarketCap } from "./services/fetchMarketCap.js";
import { fetchTps } from "./services/fetchTps.js";
import { fetchWalletBalances } from "./services/fetchWalletBalances.js";
import { getOrSetCache } from "./cache.js";
import { MarketCap, Tps, WalletBalance } from "./types.js";

const wssPort = 8080;

// Set up WebSocket server for real-time data
const wss = new WebSocketServer({ port: wssPort });
wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");

  // Send initial data for each metric
  const sendInitialData = async () => {
    const marketCap = await getOrSetCache<MarketCap[]>(
      "marketCapData",
      fetchMarketCap,
      300
    );
    const tps = await getOrSetCache<Tps[]>("tpsData", fetchTps, 60);
    const walletBalances = await getOrSetCache<WalletBalance[]>(
      "walletBalanceData",
      fetchWalletBalances,
      300
    );

    ws.send(JSON.stringify({ marketCap, tps, walletBalances }));
  };

  sendInitialData();

  // Set intervals to poll for updates and broadcast to clients
  const intervals = {
    marketCap: setInterval(async () => {
      const data = await getOrSetCache<MarketCap[]>(
        "marketCapData",
        fetchMarketCap,
        300
      );
      ws.send(JSON.stringify({ marketCap: data }));
    }, 300000), // Every 5 minutes

    tps: setInterval(async () => {
      const data = await getOrSetCache<Tps[]>("tpsData", fetchTps, 60); // Cache for 1 minute to keep data fresh since samplePeriodSecs is 1 minute
      ws.send(JSON.stringify({ tps: data }));
    }, 60000), // Every 60 seconds

    walletBalances: setInterval(async () => {
      const data = await getOrSetCache<WalletBalance[]>(
        "walletBalanceData",
        fetchWalletBalances,
        300
      );
      ws.send(JSON.stringify({ walletBalances: data }));
    }, 300000), // Every 5 minutes
  };

  ws.on("close", () => {
    Object.values(intervals).forEach(clearInterval);
    console.log("Client disconnected from WebSocket");
  });
});

console.log(`WebSocket server running on port ${wssPort}`);
