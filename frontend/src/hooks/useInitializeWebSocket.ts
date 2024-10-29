import { useEffect, useState } from "react";
import { initializeWebSocket, MetricData } from "../services/websocketService";
import { MarketCap, Tps, WalletBalance } from "../types";

export default function useInitializeWebSocket() {
  const [marketCapData, setMarketCapData] = useState<MarketCap[]>([]);
  const [tpsData, setTpsData] = useState<Tps[]>([]);
  const [walletBalanceData, setWalletBalanceData] = useState<WalletBalance[]>(
    []
  );

  useEffect(() => {
    // Custom hook for initializing WebSocket connection
    const ws = initializeWebSocket((data: MetricData) => {
      console.log("Incoming Data:", data);
      if (data.marketCap) setMarketCapData(data.marketCap);
      if (data.tps) setTpsData(data.tps);
      if (data.walletBalances) setWalletBalanceData(data.walletBalances);
    });

    return () => {
      ws.close();
    };
  }, []);

  return { marketCapData, tpsData, walletBalanceData };
}
