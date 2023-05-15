import Home from './pages/Home';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';
import { initUserConfig } from './service/UserConfig';
import userSettings from "./config/userSettings.json";

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});



function App() {
  initUserConfig(userSettings);

  //TODO: STARTUP PROCESS
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Home/>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
