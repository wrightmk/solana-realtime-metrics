import { render, screen } from "@testing-library/react";
import MarketCapPieChart from "./MarketCapPieChart";
import { vi } from "vitest";

// Mocking the ReactApexChart component
vi.mock("react-apexcharts", () => ({
  default: ({ series }: { series: number[] }) => (
    <div data-testid="react-apexchart-mock">
      <div data-testid="chart-series">{JSON.stringify(series)}</div>
    </div>
  ),
}));

describe("MarketCapPieChart Fallbacks", () => {
  it("displays 'Loading...' for missing data", () => {
    render(<MarketCapPieChart data={[]} />);

    // Check for loading text instead of chart when data is empty
    expect(screen.queryByTestId("chart-series")).not.toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders chart with data when provided", () => {
    const mockData = [{ name: "TokenA", marketCap: 500000 }];
    render(<MarketCapPieChart data={mockData} />);

    // Check that the chart displays the correct data when available
    expect(screen.getByTestId("chart-series")).toHaveTextContent("[500000]");
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
