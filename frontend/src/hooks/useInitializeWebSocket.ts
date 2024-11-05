import { useEffect, useState } from "react";
import { initializeWebSocket, MetricData } from "../services/websocketService";
import { TMarketCap, TTps, TWalletBalance } from "../types";

export default function useInitializeWebSocket() {
  const [marketCapData, setMarketCapData] = useState<TMarketCap[]>([]);
  const [tpsData, setTpsData] = useState<TTps[]>([]);
  const [walletBalanceData, setWalletBalanceData] = useState<TWalletBalance[]>(
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
