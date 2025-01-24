import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BarChart, { BarsProps } from "../BarChart"; 
import { ChartItem } from "../../services/slices/statsSlice";
const mockData: ChartItem[] = [
  { name: "Category A", value: 50 },
  { name: "Category B", value: 30 },
  { name: "Category C", value: 20 },
];

const defaultProps: BarsProps = {
  width: 400,
  height: 300,
  data: mockData,
  events: true,
};

describe("BarChart Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<BarChart {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("renders labels for all bars", () => {
    render(<BarChart {...defaultProps} />);
    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it("renders an axis with correct ticks", () => {
    render(<BarChart {...defaultProps} />);
    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument(); // Tick labels
    });
  });

  it("does not render bars if width is less than 10", () => {
    const { container } = render(<BarChart {...defaultProps} width={5} />);
    expect(container.querySelectorAll("rect").length).toBe(0);
  });

  it("handles empty data array gracefully", () => {
    render(<BarChart {...defaultProps} data={[]} />);
    expect(screen.queryByRole("graphics-symbol")).not.toBeInTheDocument();
  });
});
