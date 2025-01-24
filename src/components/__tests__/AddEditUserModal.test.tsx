import { fireEvent, screen, waitFor } from "@testing-library/react";
import AddEditUserModal from "../AddEditUserModal";
import { renderWithProviders } from "../../utils/test-utils";
import { addUserRequest, updateUserRequest } from "../../services/slices/userSlice";
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
    // expect(screen.getByLabelText("Name")).toBeInTheDocument();
    // expect(screen.getByLabelText("City")).toBeInTheDocument();
    // expect(screen.getByLabelText("Age")).toBeInTheDocument();
  });

  test("renders modal with existing user data for editing", () => {
    const existingUser = { id:"1", name: "John Doe", age: 30, city: "Stockholm" };
    renderWithProviders(<AddEditUserModal {...defaultProps} existingUser={existingUser} />);
    
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("30")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Stockholm")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

//   test("displays validation errors on invalid form submission", async () => {
//     renderWithProviders(<AddEditUserModal {...defaultProps} />);
    
//     const submitButton = screen.getByText("Add");
//     fireEvent.click(submitButton);
    
//     expect(await screen.findByText("Name is required")).toBeInTheDocument();
//     expect(screen.getByText("Age is required")).toBeInTheDocument();
//     expect(screen.getByText("City is required")).toBeInTheDocument();
//   });

//   test("dispatches addUserRequest action on form submission", async () => {
//     const { store } = renderWithProviders(<AddEditUserModal {...defaultProps} />);
//     const nameInput = screen.getByLabelText("Name");
//     const cityInput = screen.getByLabelText("City");
//     const ageInput = screen.getByLabelText("Age");

//     fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
//     fireEvent.change(cityInput, { target: { value: "Los Angeles" } });
//     fireEvent.change(ageInput, { target: { value: "25" } });

//     const submitButton = screen.getByText("Add User");
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       const actions = store.getActions();
//       expect(actions).toContainEqual(addUserRequest({ name: "Jane Doe", age: 25, city: "Los Angeles" }));
//     });
//   });

//   test("dispatches updateUserRequest action when editing a user", async () => {
//     const existingUser = { name: "John Doe", age: 30, city: "Stockholm" };
//     const { store } = renderWithProviders(<AddEditUserModal {...defaultProps} existingUser={existingUser} />);

//     const nameInput = screen.getByLabelText("Name");
//     fireEvent.change(nameInput, { target: { value: "John Smith" } });

//     const submitButton = screen.getByText("Update User");
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       const actions = store.getActions();
//       expect(actions).toContainEqual(updateUserRequest({ name: "John Smith", age: 30, city: "Stockholm" }));
//     });
//   });

  test("calls handleCancel when the cancel button is clicked", () => {
    renderWithProviders(<AddEditUserModal {...defaultProps} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });

//   test("calls handleClose after successful submission", async () => {
//     const { store } = renderWithProviders(<AddEditUserModal {...defaultProps} />);
//     const nameInput = screen.getByLabelText("Name");
//     const cityInput = screen.getByLabelText("City");
//     const ageInput = screen.getByLabelText("Age");

//     fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
//     fireEvent.change(cityInput, { target: { value: "Los Angeles" } });
//     fireEvent.change(ageInput, { target: { value: "25" } });

//     const submitButton = screen.getByText("Add User");
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       const actions = store.getActions();
//       expect(actions).toContainEqual(addUserRequest({ name: "Jane Doe", age: 25, city: "Los Angeles" }));
//     });

//     await waitFor(() => {
//       expect(mockHandleClose).toHaveBeenCalledTimes(1);
//     });
//   });
});
