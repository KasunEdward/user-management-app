import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { User } from "../../services/slices/userSlice";
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
import { fetchUsersApi } from "../../services/apis/userApi";

// Register the InfiniteRowModelModule
ModuleRegistry.registerModules([
  InfiniteRowModelModule,
  NumberFilterModule,
  TextFilterModule,
  RowSelectionModule,
]);

interface UserGridProps {
  onSelectionChanged: (selectedItem: User | undefined) => void;
}

const UserGrid = forwardRef<any, UserGridProps>((props, ref) => {
const gridRef = useRef<any>(null); 
//   const gridRef = ref as React.MutableRefObject<any>;
useImperativeHandle(ref, () => ({
    getSelectedRows: () => gridRef.current?.api?.getSelectedRows(),
    refreshGrid: () => gridRef.current?.api?.refreshCells(),
    setGridOption:() => {
        gridRef.current?.setGridOption("datasource",datasource)
    },
  }));
  const { onSelectionChanged } = props;
  const { mode } = useThemeContext();

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
      console.log(gridParams);
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
    console.log(params);
    if (gridRef && gridRef.current) {
      gridRef.current = params.api;
    }
    // Set the datasource to the grid
    params.api.setGridOption("datasource", datasource);
  }, []);

  const themeLightWarm = themeQuartz.withPart(colorSchemeLightWarm).withParams({
    backgroundColor: "rgb(252, 253, 253)",
    foregroundColor: "rgb(2, 10, 31)",
    browserColorScheme: "light",
  });
  const themeDarkWarm = themeQuartz.withPart(colorSchemeDarkWarm);

  const handleSelection = () => {
    const selectedItems = gridRef.current.getSelectedNodes();
    onSelectionChanged(selectedItems?.length ? selectedItems[0].data : null);
  };

  return (
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
  );
});

export default UserGrid;
