import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { Button } from "@mui/material";
import { fetchUsersApi } from "../../services/apis/userApi";
import ButtonStyled from "../../components/ButtonStyled";
import AddEditUserModal from "../../views/AddEditUserModal";

// Register the InfiniteRowModelModule
ModuleRegistry.registerModules([InfiniteRowModelModule, NumberFilterModule, TextFilterModule,]);

const Users: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { total, loading, error, data } = useSelector(
    (state: RootState) => state.users
  );
  const { mode } = useThemeContext();

  const [openAddEditUser, setOpenAddEditUser] = useState(false);

  const defaultColDef = useMemo(() => {
    return {
        flex: 1,
        filter:true,
        floatingFilter: true,
        minWidth:150
    }
}, [])

  // Define column definitions for AG Grid
  const [columnDefs] = useState([
    {
      field: "id" as keyof User,
      headerName: "ID",
      sortable: false,
      filter:false,
      width: 100,
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
    {
      headerName: "Actions",
      field: "actions" as keyof User,
      cellRendererFramework: (params: any) => (
        <button onClick={() => handleDelete(params.data.id)}>Delete</button>
      ),
      width: 150,
    },
  ]);

  const limit = 100;

  const onGridReady = useCallback(async (params: any) => {
    const datasource = {
      rowCount: undefined, // Infinite scrolling
      getRows: async (gridParams: any) => {
        const { startRow, endRow, sortModel, filterModel } = gridParams;
        console.log("startRow", startRow);
  
        try {
          // Call the reusable API function
          const {data} = await fetchUsersApi({
            start: startRow,
            limit: endRow - startRow,
            sortModel,
            filterModel,
          });
  
          // Check if this is the last page
          const lastRow = data.length < (endRow - startRow) ? startRow + data.length : undefined;
  
          // Pass data to the grid
          console.log("data", data);
          gridParams.successCallback(data, lastRow);
        } catch (error) {
          // Handle API errors
          gridParams.failCallback();
        }
      },
    };
  
    // Set the datasource to the grid
    params.api.setGridOption("datasource",datasource);
  }, []);
  

  const themeLightWarm = themeQuartz.withPart(colorSchemeLightWarm);
  const themeDarkWarm = themeQuartz.withPart(colorSchemeDarkWarm);

  // Delete user handler
  const handleDelete = (id: number) => {
    // dispatch(deleteUser(id));
  };

  const handleOpenAddEditUser = () => {
    setOpenAddEditUser(true);
  };

  const handleCloseAddEditUser = () => {
    setOpenAddEditUser(false);
  }

  if (loading) return <p>Loading...</p>;
  if (!loading && error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <UsersContainer>
        <ButtonContainer>
          <ButtonStyled color="primary" onClick={handleOpenAddEditUser}>
            Add User
          </ButtonStyled>
        </ButtonContainer>
        <TableContainer>
          <AgGridReact
            theme={mode === "light" ? themeLightWarm : themeDarkWarm}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowModelType="infinite"
            cacheBlockSize={100} // Number of rows to fetch at once
            onGridReady={onGridReady}
          />
        </TableContainer>
      </UsersContainer>
      {openAddEditUser && <AddEditUserModal open={openAddEditUser} handleClose={handleCloseAddEditUser} isEdit />}
    </Layout>
  );
};

export default Users;
