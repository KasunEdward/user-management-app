import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersRequest, User } from "../../services/slices/userSlice";
import { RootState, AppDispatch } from "../../services/store";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
  ColDef,
  InfiniteRowModelModule,
  INumberFilterParams,
  ITextFilterParams,
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

  const themeLightWarm = themeQuartz.withPart(colorSchemeLightWarm);
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
  };

  if (loadingFetch) return <p>Loading...</p>;
  if (!loadingFetch && error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <UsersContainer>
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
              <ButtonStyled color="primary" onClick={handleOpenAddEditUser}>
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
    </Layout>
  );
};

export default Users;
