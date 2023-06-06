import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import Header from "../../components/Header";

const Streams = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "url",
      headerName: "Url",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "streamType",
      headerName: "Stream Type",
      flex: 1,
    },
    {
      field: "liveView",
      headerName: "Live View",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <div onClick={() => {
            fetch(`https://localhost:8888/getStreamUrlById/1`)
              .then(response => response.json())
              .then(data => {
                console.log(data);
              });
          }}>
            <PlayCircleOutlineOutlinedIcon />
            <Typography variant="body1" color="textSecondary">
              {access ? "Live" : "Not Live"}
            </Typography>
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/getStreams")
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <Box m="20px">
      <Header title="Stream" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>
    </Box>
  );
};
export default Streams;