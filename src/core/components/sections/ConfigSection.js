import { Stack } from "@mui/material";

import React from "react";
import CardSection from "../common/CardSection";
import ChronoSettings from "../../../config/chronothermostat.json";
import { getUserConfig } from "../../../service/UserConfig";
import WorkMode from "../WorkMode";

function ConfigSection({ style, zone, tempUpdateAll }) {
  const UserConfig = getUserConfig();
  const workMode = UserConfig.getWorkModeZone(zone);
  const workModeConfig = ChronoSettings.workMode;

  const handleSetPointChanged = (workMode, value)=>{
    UserConfig.setNewSetPointValue(zone, workMode, value);
    tempUpdateAll(new Date())
  }

  return (
    <Stack sx={{ ...style }}>
      <CardSection
        title="Configurazione"
        subTitle={"Modalità di funzionamento"}
      >
        <Stack mt={3} direction={"row"} spacing={2}>
          {Object.keys(workMode).map((key, idx) => (
            <WorkMode 
              key={idx}  
              workMode={key}
              value={workMode[key]}
              label={workModeConfig[key].label}
              color={workModeConfig[key].color} 
              onSetPointChanged={(value)=>{handleSetPointChanged(key, value)}}

            />
          ))}
        </Stack>
      </CardSection>
    </Stack>
  );
}

export default ConfigSection;
