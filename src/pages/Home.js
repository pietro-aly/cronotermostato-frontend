import { Stack } from "@mui/material";
import React from "react";
import ZoneSection from "../core/components/sections/ZonesSection";
import WeeklyProgrammingSection from "../core/components/sections/WeeklyProgrammingSection";
import ConfigSection from "../core/components/sections/ConfigSection";
import userSettings from "../config/userSettings.json";
import {getUserConfig} from "../service/UserConfig";


function Home() {
  let UserConfig = getUserConfig();
  let zones = UserConfig.getZones();
  const [zoneSelected, setZoneSelected] = React.useState(zones[0]);
  const [updateAll, setUpdateAll] = React.useState(new Date());
  
  const createNewZone = (zoneName) => {
    UserConfig.setNewZone(zoneName);
    zones = UserConfig.getZones();
    setZoneSelected(zoneName)
  };
  
  return (
    <Stack sx={{ backgroundColor: "#F2F2F6", height: "100vh", padding: 5 }}>
      <ZoneSection
        zones={zones}
        selected={zoneSelected}
        onSelected={setZoneSelected}
        onCreate={createNewZone}
      />
      <WeeklyProgrammingSection style={{ marginTop: 5 }} zone={zoneSelected} />
      <ConfigSection style={{ marginTop: 5 }} zone={zoneSelected} tempUpdateAll={setUpdateAll} />

    </Stack>
  );
}

export default Home;
