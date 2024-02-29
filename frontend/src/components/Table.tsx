import { DataGrid, GridOverlay, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState, useMemo } from "react";
import { getTimesheets } from "../api/TimesheetsApi";
import { minutesToTimeString } from "../utils/timeHelper";
import { moneyFormat } from "../utils/moneyHelper";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useAppState } from "../providers/AppContext";
import { useQuery } from "react-query";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Timesheet {
  id: string;
  description: string;
  projects: string;
  tanggal_mulai: string;
  tanggal_berakhir: string;
  waktu_mulai: string;
  waktu_berakhir: string;
  total_durasi: number;
}

const Table = () => {
  const {
    valuePostFilter,
    valueFilter,
    setShowEditModal,
    setEditID,
    valuePengaturan,
    setValueDeleteDialog,
    setDeleteID,
    renderTable,
  } = useAppState();
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);

  const durationAccumulated = useMemo(() => {
    return (
      timesheets.reduce((acc, curr) => {
        return acc + curr.total_durasi;
      }, 0) / 60000
    );
  }, [timesheets]);

  const { isLoading, error, data, refetch } = useQuery("timesheetsData", () =>
    getTimesheets(valueFilter, valuePostFilter)
  );

  useEffect(() => {
    if (data) {
      setTimesheets(data.data);
    }
    refetch();
  }, [valueFilter, valuePostFilter, renderTable, data]);

  const deleteTimesheetAction = (id: number) => {
    setValueDeleteDialog(true);
    setDeleteID(id);
  };

  const editTimesheet = (id: number) => {
    setShowEditModal(true);
    setEditID(id);
  };

  const NoRowsOverlay = () => {
    return <GridOverlay>Belum Ada Kegiatan</GridOverlay>;
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      flex: 0.1,
      width: 150,
      hideable: true,
    },
    {
      field: "description",
      headerName: "Judul Kegiatan",
      flex: 0.1,
      width: 150,
    },
    {
      field: "projects",
      headerName: "Nama Proyek",
      flex: 0.1,
      width: 225,
      valueGetter: (params) => params.row["project.description"],
    },
    {
      field: "tanggal_mulai",
      headerName: "Tanggal Mulai",
      flex: 0.1,
      width: 175,
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "tanggal_berakhir",
      headerName: "Tanggal Berakhir",
      flex: 0.1,
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "waktu_mulai",
      headerName: "Waktu Mulai",
      flex: 0.1,
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("HH:mm"),
    },
    {
      field: "waktu_berakhir",
      headerName: "Waktu Berakhir",
      flex: 0.1,
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("HH:mm"),
    },
    {
      field: "total_durasi",
      headerName: "Durasi",
      flex: 0.1,
      width: 150,
      valueFormatter: (params) => minutesToTimeString(params.value / 60000),
    },
    {
      field: "col8",
      headerName: "Aksi",
      flex: 0.1,
      width: 150,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", 
            }}
          >
            <Button
              onClick={() => {
                editTimesheet(params.row.id);
              }}
            >
              <DriveFileRenameOutlineIcon
                sx={{
                  borderColor: "#F15858",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  color: "#F15858",
                  borderRadius: "20%",
                }}
              />
            </Button>
            <Button
              onClick={() => {
                deleteTimesheetAction(params.row.id);
              }}
            >
              <DeleteOutlineIcon
                sx={{
                  borderColor: "#F15858",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  color: "#F15858",
                  borderRadius: "20%",
                }}
              />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          overflowX: "auto",
          height: 300,
          width: "100%",
        }}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid
            columnVisibilityModel={{
              id: false,
            }}
            components={{
              NoRowsOverlay: NoRowsOverlay,
            }}
            pageSizeOptions={[5, 10, 25, 100]}
            rows={timesheets}
            columns={columns}
            sx={{
              "&:hover": {
                backgroundColor: "gray.100",
                "@media (prefers-color-scheme: dark)": {
                  backgroundColor: "gray.800",
                  borderColor: "gray.700",
                },
              },
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f7f8fb",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0.25rem",
            marginRight: "0.25rem",
            marginTop: "0.25rem",
          }}
        >
          <Typography sx={{ color: "#68BBE3" }}>Total Durasi</Typography>
          <Box sx={{ justifyContent: "flex-end" }}>
            <Typography sx={{ color: "#68BBE3" }}>
              {minutesToTimeString(durationAccumulated)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: "0.25rem",
          }}
        >
          <Typography sx={{ fontSize: "1.1rem", color: "#2775EC" }}>
            Total Pendapatan
          </Typography>
          <Box sx={{ justifyContent: "flex-end" }}>
            <Typography sx={{ fontSize: "1.1rem", color: "#2775EC" }}>
              {moneyFormat(
                durationAccumulated !== 0 ? valuePengaturan.rate : 0,
                durationAccumulated
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Table;
