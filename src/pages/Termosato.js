import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const Termostato = ({ selectedZone, chronoConfig }) => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentWorkMode, setCurrentWorkMode] = useState("");
  const [setPoint, setSetPoint] = useState(null);
  const [workModeColor, setWorkModeColor] = useState("#000000");

  useEffect(() => {
    const intervalID = setInterval(updateData, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [selectedZone, chronoConfig]);

  useEffect(() => {
    console.log("selectedZone", selectedZone);
  }, [selectedZone, chronoConfig]);

  const updateData = () => {
    const currentDate = new Date();
    const formattedDateTime = formatDate(currentDate);

    setCurrentDateTime(formattedDateTime);

    let idCurrentDay = getIdDayFromDayNumber(chronoConfig.days, currentDate.getDay());

    if (selectedZone) {
      const { weeklyProgramming } = selectedZone;

      if (weeklyProgramming && weeklyProgramming[idCurrentDay]) {
        const currentDayConfig = weeklyProgramming[idCurrentDay];
        const schedule = currentDayConfig.schedule;

        const currentSchedule = schedule.find((item) => parseInt(item.hour, 10) === currentDate.getHours());
        if (currentSchedule) {
          const { workMode, setPoint } = currentSchedule;

          setCurrentWorkMode(workMode);
          setSetPoint(setPoint);

          const currentWorkModeConfig = chronoConfig.workMode[workMode];
          const workModeColor = currentWorkModeConfig ? currentWorkModeConfig.color : "#000000";
          setWorkModeColor(workModeColor);
        } else {
          setCurrentWorkMode("");
          setSetPoint(null);
          setWorkModeColor("#000000");
        }
      }
    }
  };

  const getIdDayFromDayNumber = (days, dayNumber) => {
    let idDays = Object.keys(days);
    return idDays[dayNumber - 1];
  };

  const formatDate = (date) => {
    const options = { weekday: "long", hour: "numeric", minute: "numeric", hour12: false, timeZone: "Europe/Rome" };
    const formattedDate = date.toLocaleDateString("it-IT", options);
    return formattedDate;
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontWeight: 700, color: "gray" }}>
      <Typography>Data e ora attuali:</Typography>
      <Typography variant="h4" style={{ color: "black", fontWeight: "bold" }}>{currentDateTime}</Typography>
   
      {currentWorkMode && (
        <>
          <Typography style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontWeight: 700, color: "gray" }}>Stato attuale:</Typography>
          <Typography variant="h4" style={{ color: workModeColor, fontWeight: "bold", textTransform: "uppercase" }}>{currentWorkMode}</Typography>
        </>
      )}

      {setPoint !== null && (
        <>
          <Typography style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontWeight: 700, color: "gray" }}>Temp. da raggiungere:</Typography>
          <Typography variant="h4" style={{ color: "black", fontWeight: "bold" }}>
            <DeviceThermostatIcon /> {setPoint} °C
          </Typography>
        </>
      )}
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  selectedZone: state.App.selectedZone,
  chronoConfig: state.Chrono.chronoConfig,
});

export default connect(mapStateToProps)(Termostato);
