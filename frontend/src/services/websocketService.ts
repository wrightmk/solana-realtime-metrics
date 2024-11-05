import { TMarketCap, TTps, TWalletBalance } from "../types";

export type MetricData = {
  marketCap?: TMarketCap[];
  tps?: TTps[];
  walletBalances?: TWalletBalance[];
};

export const mockWebSocketData = (data: MetricData) => {
  return data;
};

// Initialize WebSocket connection to get chart data from server
export const initializeWebSocket = (
  onDataUpdate: (data: MetricData) => void
) => {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onmessage = (event) => {
    try {
      const data: MetricData = JSON.parse(event.data);
      onDataUpdate(data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  return ws;
};
