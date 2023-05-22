import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

function Device({ name, state, type, zone, variant }) {
  return (
    <Paper
      variant="outlined"
      sx={{ height: "50px", paddingX: 1.5, borderRadius: 2.5 }}
    >
      <Stack height={"100%"} direction={"row"} alignItems={"center"}>
        <DeviceThermostatIcon />
        <Typography variant="p" fontWeight={"bold"}>
          {`${name} ${state ? - + " " + state : ""}`}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default Device;
