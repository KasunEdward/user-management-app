import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PieChart, { PieProps } from "../PieChart"; 
import { ChartItem } from "../../services/slices/statsSlice";

const mockData: ChartItem[] = [
  { name: "Category A", value: 50, color: "red" },
  { name: "Category B", value: 30, color: "blue" },
  { name: "Category C", value: 20, color: "green" },
];

const defaultProps: PieProps = {
  width: 400,
  height: 400,
  data: mockData,
};

describe("PieChart Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<PieChart {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("renders labels for all arcs", () => {
    render(<PieChart {...defaultProps} />);
    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it("handles an empty data array gracefully", () => {
    render(<PieChart {...defaultProps} data={[]} />);
    expect(screen.queryByRole("graphics-symbol")).not.toBeInTheDocument(); // No paths rendered
  });
});
