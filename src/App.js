import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Tab, Tabs, Typography } from "@mui/material";
import Customerlist from "./components/Customerlist";
import Trainingslist from "./components/Trainingslist";
import CalendarView from "./components/CalendarView";
import ChartView from "./components/ChartView";
import './App.css';

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Personal Trainer APP
        </Typography>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={tabIndex}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Customers" />
          <Tab label="Trainings" />
          <Tab label="Training Calendar" />
          <Tab label="Training Time Chart" />
        </Tabs>
      </AppBar>
      {tabIndex === 0 && <Customerlist></Customerlist>}
      {tabIndex === 1 && <Trainingslist></Trainingslist>}
      {tabIndex === 2 && <CalendarView></CalendarView>}
      {tabIndex === 3 && <ChartView></ChartView>}
    </div>
  );
}

export default App;
