import { Button, IconButton, Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import CardSection from "../common/CardSection";
import WeeklyChart from "../WeeklyChart";
import { getUserConfig } from "../../../service/UserConfig";
import ChronoSettings from "../../../config/chronothermostat.json";
import ConfigSetPointDialog from "../ConfigSetPointDialog";

function WeeklyProgrammingSection({ style, zone }) {
  const UserConfig = getUserConfig();
  const workMode = UserConfig.getWorkModeZone(zone);
  const daysConfig = ChronoSettings.days;
  const workModeConfig = ChronoSettings.workMode;

  const [selectedDay, setSelectedDay] = React.useState(daysConfig["lun"].key);
  const [dailySchedule, setDailySchedule] = React.useState(
    UserConfig.getDailyScheduleZone(zone, selectedDay, true)
  );
  const [openConfigDialog, setOpenConfigDialog] = React.useState(true)

  React.useEffect(() => {
    loadDailySchedule(selectedDay);
  }, [selectedDay]);

  const changeSelectedDay = (day) => {
    setSelectedDay(day);
  };

  const loadDailySchedule = (day) => {
    const _dailyScehdule = UserConfig.getDailyScheduleZone(
      zone,
      selectedDay,
      true
    );
    setDailySchedule(_dailyScehdule);
  };

  const RightHeaderJSX = () => (
    <Stack direction={"row"} spacing={3} height={'fit-content'} width={'100%'} justifyContent={'end'}>
      {GroupWeeklyButton()}
      <Stack height={22} component={"div"} >
        <IconButton
          disableRipple={false}
          sx={{backgroundColor: "#F2F2F6", padding:"16px",  borderRadius: 4 }}
          onClick={
            ()=>{setOpenConfigDialog(true)}
          }
          color="primary"
          component="label"
        >
          <EditIcon fontSize="medium"/>
        </IconButton>
      </Stack>
    </Stack>
  );

  const GroupWeeklyButton = () => {
    return (
      <Stack
        direction={"row"}
        sx={{ padding: 1, backgroundColor: "#F2F2F6", borderRadius: 4 }}
      >
        {Object.keys(daysConfig)?.map((day, idx) => (
          <Button
            key={idx}
            disableElevation={true}
            sx={{ borderRadius: 3, textTransform: "none", fontSize: "1rem" }}
            variant={day === selectedDay ? "contained" : "text"}
            onClick={() => {
              changeSelectedDay(day);
            }}
          >
            {daysConfig[day].shortName}
          </Button>
        ))}
      </Stack>
    );
  };

  return (
    <>
      <Stack sx={{ ...style }}>
        <CardSection
          title="Cronotermostato"
          subTitle={"Programmazione Settimanale"}
          rightHeader={RightHeaderJSX()}
        >
          <Stack mt={5} height={370} width={"100%"}>
            <WeeklyChart
              dailySchedule={dailySchedule}
              workModeConfig={workModeConfig}
            />
          </Stack>
        </CardSection>
      </Stack>
      <ConfigSetPointDialog
          title={"Configurazione"}
          description={
            "Programmazione giornaliera"
          }
          dailySchedule={dailySchedule}
          worksMode={workMode}
          workModeConfig={workModeConfig}
          open={openConfigDialog}
          onClose={()=>{setOpenConfigDialog(false)}}
          onCreate={()=>{console.log("creazione")}}
        />
    </>
  );
}

export default WeeklyProgrammingSection;
