import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../services/slices/userSlice";
import { RootState } from "../../services/store";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
  InfiniteRowModelModule,
  ModuleRegistry,
  NumberFilterModule,
  RowSelectionModule,
  TextFilterModule,
} from "ag-grid-community";
import { useThemeContext } from "../../context/ThemeContext";
import Layout from "../../layout";
import {
  ActionBar,
  ButtonContainer,
  TableContainer,
  UsersContainer,
} from "./styled.component";
import ButtonStyled from "../../components/ButtonStyled";
import AddEditUserModal from "../../components/AddEditUserModal";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import DeleteUserModal from "../../components/DeleteUserModal";
import UserGrid from "../../components/UserGrid";
import { Typography } from "@mui/material";

// Register the InfiniteRowModelModule
ModuleRegistry.registerModules([
  InfiniteRowModelModule,
  NumberFilterModule,
  TextFilterModule,
  RowSelectionModule,
]);

const Users: React.FC = () => {
  const { loadingFetch, error } = useSelector(
    (state: RootState) => state.users
  );
  const { mode } = useThemeContext();
  const gridRef = useRef<any>(null);

  const [openAddEditUser, setOpenAddEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [selectedItem, setSelectedItem] = useState<User | undefined>();

  const handleSelection = (selectedItem: User | undefined) => {
    setSelectedItem(selectedItem);
  };

  const handleOpenAddEditUser = () => {
    setOpenAddEditUser(true);
  };

  const handleCloseAddEditUser = () => {
    setOpenAddEditUser(false);
    gridRef.current?.setGridOption();
    if (selectedItem) {
      toast.success("User updated successfully!");
    } else {
      toast.success("User added successfully!");
    }
  };

  const handleOpenDeleteUser = () => {
    setOpenDeleteUser(true);
  };

  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
    gridRef.current?.setGridOption();
    toast.success("User deleted successfully!");
  };

  const handleCancelPopup = () => {
    setOpenAddEditUser(false);
    setOpenDeleteUser(false);
  };

  if (loadingFetch) return <p>Loading...</p>;
  if (!loadingFetch && error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <ToastContainer />
      <UsersContainer mode={mode}>
        <ActionBar>
          <Typography
            variant="h6"
            sx={(theme) => ({
              fontWeight: 500,
              color: theme.palette.primary.text.primary,
            })}
          >
            Users List
          </Typography>
          {!selectedItem && (
            <ButtonStyled color="primary" onClick={handleOpenAddEditUser}>
              Add User
            </ButtonStyled>
          )}
          {selectedItem && (
            <ButtonContainer>
              <ButtonStyled color="primary" onClick={handleOpenAddEditUser}>
                Edit User
              </ButtonStyled>
              <ButtonStyled color="error" onClick={handleOpenDeleteUser}>
                Delete User
              </ButtonStyled>
            </ButtonContainer>
          )}
        </ActionBar>
        <TableContainer>
          <UserGrid onSelectionChanged={handleSelection} ref={gridRef} />
        </TableContainer>
      </UsersContainer>
      {openAddEditUser && (
        <AddEditUserModal
          open={openAddEditUser}
          existingUser={selectedItem}
          handleClose={handleCloseAddEditUser}
          handleCancel={handleCancelPopup}
        />
      )}
      {openDeleteUser && (
        <DeleteUserModal
          open={openDeleteUser}
          id={selectedItem?.id ?? ""}
          handleClose={handleCloseDeleteUser}
          handleCancel={handleCancelPopup}
        />
      )}
    </Layout>
  );
};

export default Users;
