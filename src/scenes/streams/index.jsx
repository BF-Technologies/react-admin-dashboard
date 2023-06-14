import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import Header from "../../components/Header";
import Player from "../player";
import "../../index.css"


const Streams = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8090/media-streams").then((response) => {
      const data = response.data;
      setData(data);
    });
  }, []);

  const handlePlayClick = (event, url) => {
    const response = axios.post('http://localhost:8080/start', {
      streamUrl: url,
    }).then((response) => {
      console.log(data)
      const data = response.data;
      
      setSelectedUrl(data);
    });
    console.log("!!!!!!!!!!!!: "+ selectedUrl)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUrl("");
    setIsModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "id" },
    {
      field: "name",
      headerName: "name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "url",
      headerName: "url",
      headerAlign: "left",
      align: "left",
      flex: 1,
      cellClassName: "url-column--cell",
    },
    {
      field: "type",
      headerName: "Stream Type",
      flex: 1,
    },
    {
      field: "play",
      headerName: "Play",
      flex: 1,
      cellClassName: "play-column--cell",
      renderCell: (params) => (
        <PlayCircleOutlineOutlinedIcon
          onClick={(event) => handlePlayClick(event, params.row.url)}
        />
      ),
    },
  ];

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
            display: "none", // Remove checkbox
          },
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          className="fullscreen-modal"
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          <div>
            <Player wsUrl={selectedUrl} />
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default Streams;
