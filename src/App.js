import "./App.css";
import React, { useEffect, useState } from "react";
import { useGetSpaces } from "./queries/snapshot/api";
import SnapshotSpaces from "./components/Snapshot";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Parcel Analytics
          </Typography>
        </Toolbar>
      </AppBar>
      <Box display={"flex"}>
        <Box
          boxShadow={"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"}
          width={"15%"}
        >
          <Tabs
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            value={selectedTab}
            onChange={handleChange}
            centered
          >
            <Tab label="Snapshot" />
            <Tab label="Coordinape" />
            <Tab label="Gnosis" />
          </Tabs>
        </Box>
        <Box width={"85%"} padding="16px">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            paddingBottom="16px"
          >
            Snapshot Daos Data
          </Typography>
          <SnapshotSpaces></SnapshotSpaces>
        </Box>
      </Box>
    </div>
  );
};

export default App;
