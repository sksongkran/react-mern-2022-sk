import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { imageUrl } from "./../../../constants";
import { GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { Avatar, Grid, Paper, Stack, Typography } from "@mui/material";
import { getTransactions, shopSelector } from "../../../store/slices/shopSlice";
import { useAppDispatch } from "../../../store/store";
import CMDataGrid from "../../fragments/CMDataGrid";

const Transaction = (props: any) => {
  const dispatch = useAppDispatch();
  const [orderList, setOrderList] = useState([]);
  const [selectedId, setSelectedId] = useState<GridRowId>(0);

  const shopReducer = useSelector(shopSelector);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const transactionColumns: GridColDef[] = [
    {
      headerName: "ID",
      field: "transaction_id",
      width: 50,
    },

    {
      headerName: "DATE",
      field: "timestamp",
      width: 150,
      renderCell: (params: GridRenderCellParams<string>) => (
        <Moment format="YYYY/MM/DD hh:mm">{params.value}</Moment>
      ),
    },
    {
      headerName: "STAFF",
      width: 120,
      field: "staff_id",
    },
    {
      headerName: "TOTAL",
      field: "total",
      width: 70,
      renderCell: (params: GridRenderCellParams<string>) => (
        <NumericFormat
          value={params.value}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
        />
      ),
    },
    {
      headerName: "PAID",
      field: "paid",
      width: 70,
      renderCell: (params: GridRenderCellParams<string>) => (
        <NumericFormat
          value={params.value}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
        />
      ),
    },
    {
      headerName: "#SKU",
      width: 100,
      field: "order_list",
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography>{JSON.parse(params.value).length} SKU</Typography>
      ),
    },
    {
      headerName: "IMG",
      width: 50,
      field: "order_list",
      renderCell: (params: GridRenderCellParams<any>) => {
        const orderList = JSON.parse(params.value);
        if (orderList.length > 0) {
          return <Avatar src={`${imageUrl}/images/${orderList[0].image}`} />;
        } else {
          return <span>NO Data</span>;
        }
      },
    },
  ];

  return (
    <Paper sx={{ padding: 4 }}>
      <Grid container spacing={2} sx={{ height: "80vh" }}>
        <Grid item xs={orderList.length ? 7 : 12}>
          <CMDataGrid
            showOutline={false}
            getRowId={(row) => row.transaction_id}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectedId(newSelectionModel[0]);
            }}
            selectionModel={[selectedId]}
            onRowClick={(e) => {
              setOrderList(JSON.parse(e.row.order_list));
            }}
            rows={shopReducer.transactionAllResult}
            columns={transactionColumns}
            rowsPerPageOptions={[5]}
          />
        </Grid>
        <Grid item xs={orderList.length ? 5 : 0}>
          <ul>
            {orderList.map((item: any) => (
              <Stack direction="row" spacing={1}>
                <Avatar src={`${imageUrl}/images/${item.image}`} />
                <li>{item.name}</li>
              </Stack>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Transaction;
