/* Redux */
import React from "react";
import { connect } from "react-redux";
import Home from "./pages/Home";
import { initUserConfig } from "./service/UserConfig";
import userSettings from "./config/userSettings.json";
import { loadChronoConfigs } from "./store/chrono/actions";
import LoaderScreen from "./pages/LoaderScreen";


function Startup({loadChronoConfigs, loadingChronoConfigs, chronoConfig, userChronoConfig}) {
  initUserConfig(userSettings);
  const [startupProcess, setStartupProcess] = React.useState(false);
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    if (!startupProcess) {
      setStartupProcess(true);
    }
  }, []);

  React.useEffect(()=>{
    if(startupProcess){
      loadChronoConfigs();
    }
  }, [startupProcess])

  React.useEffect(()=>{
    if(chronoConfig !== null && !userChronoConfig !== null){
      setAppIsReady(true);
    }
  }, [chronoConfig, loadingChronoConfigs, userChronoConfig])


  return (
    <>
      {
        appIsReady && 
          <Home/>
      }
      {
        !appIsReady && 
          <LoaderScreen/>
      }
    </>
  );
}

const mapStateToProps = ({ Chrono }) => ({
  loadingChronoConfigs: Chrono.loadingChronoConfigs,
  chronoConfig: Chrono.chronoConfig,
  userChronoConfig: Chrono.userChronoConfig,
});

const mapDispatchToProps = dispatch => ({
  loadChronoConfigs: () => dispatch(loadChronoConfigs()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Startup)
