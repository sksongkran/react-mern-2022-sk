import styled from "@emotion/styled";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

interface CMDataGridProp extends DataGridProps {
  showOutline?: boolean;
}

const CMDataGrid = styled(DataGrid)<CMDataGridProp>(({ showOutline, theme }) => ({
  "& .MuiDataGrid-cell:focus": { outline: showOutline ? "solid #2196f3 1px" : "solid #2196f3 0px" },
  "& .MuiDataGrid-row:nth-of-type(even)": {
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#e0f7fa !important",
    },
  },
  "& .MuiDataGrid-row:nth-of-type(odd)": {
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#e0f7fa !important",
    },
  },
}));

export default CMDataGrid;
