import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { User } from "../../services/slices/userSlice";
import { RootState } from "../../services/store";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
  InfiniteRowModelModule,
  INumberFilterParams,
  ModuleRegistry,
  NumberFilterModule,
  RowSelectionModule,
  TextFilterModule,
  themeQuartz,
} from "ag-grid-community";
import { colorSchemeDarkWarm, colorSchemeLightWarm } from "ag-grid-community";
import { useThemeContext } from "../../context/ThemeContext";
import Layout from "../../layout";
import {
  ButtonContainer,
  TableContainer,
  UsersContainer,
} from "./styled.component";
import { fetchUsersApi } from "../../services/apis/userApi";
import ButtonStyled from "../../components/ButtonStyled";
import AddEditUserModal from "../../views/AddEditUserModal";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import DeleteUserModal from "../../views/DeleteUserModal";

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

  const [openAddEditUser, setOpenAddEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [selectedItem, setSelectedItem] = useState<User | undefined>();

  const gridRef = useRef<any>(null);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      floatingFilter: true,
      minWidth: 150,
    };
  }, []);

  // Define column definitions for AG Grid
  const [columnDefs] = useState([
    {
      field: "id" as keyof User,
      headerName: "ID",
      sortable: false,
      filter: false,
      width: 100,
      checkboxSelection: true,
    },
    {
      field: "name" as keyof User,
      headerName: "Name",
      sortable: true,
    },
    {
      field: "age" as keyof User,
      headerName: "Age",
      sortable: true,
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      } as INumberFilterParams,
      width: 100,
    },
    {
      field: "city" as keyof User,
      headerName: "City",
      sortable: true,
      filter: "agTextColumnFilter",
      flex: 1,
    },
  ]);

  const datasource = {
    rowCount: undefined, // Infinite scrolling
    getRows: async (gridParams: any) => {
      const { startRow, endRow, sortModel, filterModel } = gridParams;
      try {
        // Call the reusable API function
        const { data } = await fetchUsersApi({
          start: startRow,
          limit: endRow - startRow,
          sortModel,
          filterModel,
        });

        // Check if this is the last page
        const lastRow =
          data.length < endRow - startRow ? startRow + data.length : undefined;

        gridParams.successCallback(data, lastRow);
      } catch (error) {
        // Handle API errors
        gridParams.failCallback();
      }
    },
  };

  const onGridReady = useCallback(async (params: any) => {
    gridRef.current = params.api;
    // Set the datasource to the grid
    params.api.setGridOption("datasource", datasource);
  }, []);

  const themeLightWarm = themeQuartz.withPart(colorSchemeLightWarm).withParams({
    backgroundColor: "rgb(216, 225, 230)",
    foregroundColor: "rgb(2, 10, 31)",
    browserColorScheme: "light",
  });
  const themeDarkWarm = themeQuartz.withPart(colorSchemeDarkWarm);

  const handleSelection = () => {
    const selectedItems = gridRef.current.getSelectedNodes();
    setSelectedItem(selectedItems?.length ? selectedItems[0].data : null);
  };

  const handleOpenAddEditUser = () => {
    setOpenAddEditUser(true);
  };

  const handleCloseAddEditUser = () => {
    if (gridRef.current)
      gridRef.current.setGridOption("datasource", datasource);
    setOpenAddEditUser(false);
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
    if (gridRef.current)
      gridRef.current.setGridOption("datasource", datasource);
    setOpenDeleteUser(false);
    toast.success("User deleted successfully!");
  };

  if (loadingFetch) return <p>Loading...</p>;
  if (!loadingFetch && error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <ToastContainer />
      <UsersContainer mode={mode}>
        <ButtonContainer>
          {!selectedItem && (
            <ButtonStyled color="primary" onClick={handleOpenAddEditUser}>
              Add User
            </ButtonStyled>
          )}
          {selectedItem && (
            <>
              <ButtonStyled color="primary" onClick={handleOpenAddEditUser}>
                Edit User
              </ButtonStyled>
              <ButtonStyled color="error" onClick={handleOpenDeleteUser}>
                Delete User
              </ButtonStyled>
            </>
          )}
        </ButtonContainer>
        <TableContainer>
          <AgGridReact
            ref={gridRef}
            theme={mode === "light" ? themeLightWarm : themeDarkWarm}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowModelType="infinite"
            cacheBlockSize={100} // Number of rows to fetch at once
            onGridReady={onGridReady}
            rowSelection={"single"}
            onSelectionChanged={handleSelection}
          />
        </TableContainer>
      </UsersContainer>
      {openAddEditUser && (
        <AddEditUserModal
          open={openAddEditUser}
          existingUser={selectedItem}
          handleClose={handleCloseAddEditUser}
        />
      )}
      {openDeleteUser && (
        <DeleteUserModal
          open={openDeleteUser}
          id={selectedItem?.id ?? ""}
          handleClose={handleCloseDeleteUser}
        />
      )}
    </Layout>
  );
};

export default Users;
