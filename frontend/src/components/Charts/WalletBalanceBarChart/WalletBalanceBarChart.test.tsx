import { render, screen } from "@testing-library/react";
import WalletBalanceBarChart from "./WalletBalanceBarChart";
import { vi } from "vitest";

// Mocking the ReactApexChart component
vi.mock("react-apexcharts", () => ({
  default: ({ series }: { series: number[] }) => (
    <div data-testid="react-apexchart-mock">
      <div data-testid="chart-series">{JSON.stringify(series)}</div>
    </div>
  ),
}));

describe("WalletBalanceBarChart Fallbacks", () => {
  it("displays 'Loading...' for missing data", () => {
    render(<WalletBalanceBarChart data={[]} />);

    // Check for loading text instead of chart when data is empty
    expect(screen.queryByTestId("chart-series")).not.toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders chart with data when provided", () => {
    const mockData = [
      {
        address: "63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9",
        balance: 2,
      },
    ];
    render(<WalletBalanceBarChart data={mockData} />);

    // Check that the chart displays the correct data when available
    expect(screen.getByTestId("chart-series")).toHaveTextContent("[2]");
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
