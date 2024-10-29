import { render, screen } from "@testing-library/react";
import TpsTimeSeriesChart from "./TpsTimeSeriesChart";
import { vi } from "vitest";

// Mocking the ReactApexChart component
vi.mock("react-apexcharts", () => ({
  default: ({
    series,
  }: {
    series: { name: string; data: { x: number; y: number }[] }[];
  }) => (
    <div data-testid="react-apexchart-mock">
      <div data-testid="chart-series">{JSON.stringify(series)}</div>
    </div>
  ),
}));

describe("TpsTimeSeriesChart Fallbacks", () => {
  it("displays 'Loading...' for missing data", () => {
    render(<TpsTimeSeriesChart data={[]} />);

    // Check for loading text instead of chart when data is empty
    expect(screen.queryByTestId("chart-series")).not.toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders chart with data when provided", () => {
    const mockData = [{ slot: 30909, tps: 13124 }];
    render(<TpsTimeSeriesChart data={mockData} />);

    // Adjust the expected content to match the actual series structure
    const expectedSeries = JSON.stringify([
      { name: "TPS", data: [{ x: 30909, y: 13124 }] },
    ]);

    // Check that the chart displays the correct data when available
    expect(screen.getByTestId("chart-series")).toHaveTextContent(
      expectedSeries
    );
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
