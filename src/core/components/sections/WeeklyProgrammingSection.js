import { Card, CardContent, Stack } from "@mui/material";
import React from "react";
import CardSection from "../common/CardSection";
import WeeklyChart from "../WeeklyChart";
import { getUserConfig } from "../../../service/UserConfig";
import ChronoSettings from "../../../config/chronothermostat.json"


function WeeklyProgrammingSection({ style, zone }) {

  const UserConfig = getUserConfig();

  const day = "lun";
  const dailySchedule = UserConfig.getDailyScheduleZone(zone, day, true);
  const workModeConfig = ChronoSettings.workMode;

  return (
    <Stack sx={{ ...style }}>
      <CardSection
        title="Cronotermostato"
        subTitle={"Programmazione Settimanale"}
      >
        <Stack mt={5} height={370} width={'80%'}>
          <WeeklyChart dailySchedule={dailySchedule} workModeConfig={workModeConfig}/>
        </Stack>
      </CardSection>
    </Stack>
  );
}

export default WeeklyProgrammingSection;
