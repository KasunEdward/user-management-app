import { fireEvent, screen } from "@testing-library/react";
import AddEditUserModal from "../AddEditUserModal";
import { renderWithProviders } from "../../utils/test-utils";
import { describe, expect, test, vi } from "vitest";

const mockHandleClose = vi.fn();
const mockHandleCancel = vi.fn();

const defaultProps = {
  open: true,
  existingUser: undefined,
  handleClose: mockHandleClose,
  handleCancel: mockHandleCancel,
};

describe("AddEditUserModal", () => {
  test("renders modal with 'Add User' title", () => {
    renderWithProviders(<AddEditUserModal {...defaultProps} />);
    
    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  test("renders modal with existing user data for editing", () => {
    const existingUser = { id:"1", name: "John Doe", age: 30, city: "Stockholm" };
    renderWithProviders(<AddEditUserModal {...defaultProps} existingUser={existingUser} />);
    
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("30")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Stockholm")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  test("calls handleCancel when the cancel button is clicked", () => {
    renderWithProviders(<AddEditUserModal {...defaultProps} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });

});
