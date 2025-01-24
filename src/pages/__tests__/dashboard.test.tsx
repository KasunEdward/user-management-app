import { screen } from "@testing-library/react";
import Dashboard from "../dashboard";
import { renderWithProviders } from "../../utils/test-utils";
import { describe, expect, test } from "vitest";

describe("Dashboard", () => {
  test("renders the dashboard layout", () => {
    renderWithProviders(<Dashboard />);

    expect(screen.getByText("Users by cities")).toBeInTheDocument();
    expect(screen.getByText("Users by age category")).toBeInTheDocument();
  });
});
