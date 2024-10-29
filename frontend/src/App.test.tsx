import { render, screen } from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";

beforeAll(() => {
  vi.mock("./components/TpsTimeSeriesChart", () => ({
    default: () => <div data-testid="tps-chart">Mocked TPS Chart</div>,
  }));

  vi.mock("./components/MarketCapPieChart", () => ({
    default: () => (
      <div data-testid="marketcap-chart">Mocked Market Cap Chart</div>
    ),
  }));

  vi.mock("./components/WalletBalanceBarChart", () => ({
    default: () => (
      <div data-testid="wallet-balance-chart">Mocked Wallet Balance Chart</div>
    ),
  }));
});

describe("App Layout and Section Headings", () => {
  it("renders the main sections with correct headings", () => {
    render(<App />);
    expect(screen.getByText("Real-Time Solana Metrics")).toBeInTheDocument();
    expect(
      screen.getByText("Solana Transactions Per Second (TPS)")
    ).toBeInTheDocument();
    expect(screen.getByText("Market Cap Distribution")).toBeInTheDocument();
    expect(screen.getByText("Whale Wallets")).toBeInTheDocument();
  });
});
