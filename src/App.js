import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline, Typography } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import store from "./store";
import Startup from "./Startup";

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
          <Startup />
        
      </ThemeProvider>
    </Provider>
  );
}

export default App;
