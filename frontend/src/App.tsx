import React from "react";
import MarketCapPieChart from "./components/Charts/MarketCapPieChart/MarketCapPieChart";
import TpsTimeSeriesChart from "./components/Charts/TpsTimeSeriesChart/TpsTimeSeriesChart";
import WalletBalanceBarChart from "./components/Charts/WalletBalanceBarChart/WalletBalanceBarChart";
import useInitializeWebSocket from "./hooks/useInitializeWebSocket";

const App: React.FC = () => {
  const { marketCapData, tpsData, walletBalanceData } =
    useInitializeWebSocket();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Real-Time Solana Metrics</h1>

      <div className="chart-container">
        <div className="chart-card" data-testid="tps-chart">
          <h2>Solana Transactions Per Second (TPS)</h2>
          <TpsTimeSeriesChart data={tpsData} />
        </div>
        <div className="chart-card pie-chart" data-testid="marketcap-chart">
          <h2>Market Cap Distribution</h2>
          <MarketCapPieChart data={marketCapData} />
        </div>
        <div className="chart-card" data-testid="wallet-balance-chart">
          <h2>Whale Wallets</h2>
          <WalletBalanceBarChart data={walletBalanceData} />
        </div>
      </div>
    </div>
  );
};

export default App;
