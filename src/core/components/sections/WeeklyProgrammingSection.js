import { Button, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import CardSection from "../common/CardSection";
import WeeklyChart from "../WeeklyChart";
import { getUserConfig } from "../../../service/UserConfig";
import ChronoSettings from "../../../config/chronothermostat.json";
import ConfigSetPointDialog from "../ConfigSetPointDialog";
import { connect } from "react-redux";
import { updateDailyScehdule } from "../../../store/chrono/actions";
import Termosato from "../../../pages/Termosato";
const getDailyScheduleZone = (configZone, selectedDay) => {
  if (
    configZone?.weeklyProgramming &&
    configZone?.weeklyProgramming[selectedDay]
  ) {
    return configZone?.weeklyProgramming[selectedDay]?.schedule;
  }
  return null;
};

function WeeklyProgrammingSection({ style, idZoneSelected, configZone, chronoConfig, updateDailyScehdule }) {
  const workMode = configZone?.workMode;
  const daysConfig = chronoConfig.days;
  const workModeConfig = chronoConfig.workMode;

  const [selectedDay, setSelectedDay] = React.useState(daysConfig["lun"].id);
  const [dailySchedule, setDailySchedule] = React.useState(
    getDailyScheduleZone(configZone, selectedDay)
  );
  const [openConfigDialog, setOpenConfigDialog] = React.useState(false);

  React.useEffect(() => {
    loadDailySchedule();
  }, [selectedDay, configZone]);

  const changeSelectedDay = (day) => {
    setSelectedDay(day);
  };

  const loadDailySchedule = () => {
    const _dailySchedule = getDailyScheduleZone(configZone, selectedDay);
    setDailySchedule(_dailySchedule);
  };

  const handleSaveConfiguration = (newDailySchedule) => {
    updateDailyScehdule(idZoneSelected, selectedDay, newDailySchedule);
  };

  const RightHeaderJSX = () => (
    <Stack
      direction={"row"}
      spacing={3}
      height={"fit-content"}
      width={"100%"}
      justifyContent={"end"}
    >
      {GroupWeeklyButton()}
      <Stack height={22} component={"div"}>
        <IconButton
          disableRipple={false}
          sx={{ backgroundColor: "#F2F2F6", padding: "16px", borderRadius: 4 }}
          onClick={() => {
            setOpenConfigDialog(true);
          }}
          color="primary"
          component="label"
        >
          <EditIcon fontSize="medium" />
        </IconButton>
      </Stack>
    </Stack>
  );

  const GroupWeeklyButton = () => {
    if (!daysConfig) {
      return null; // or handle the case when daysConfig is undefined
    }

    return (
      <Stack
        direction={"row"}
        sx={{ padding: 1, backgroundColor: "#F2F2F6", borderRadius: 4 }}
      >
        {Object.keys(daysConfig).map((day, idx) => (
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

  const multipleSection = {
    first: {
    
      title: "Cronotermostato",
      subTitle: "Programmazione Settimanale",
      component: (
        <Stack mt={5} height={370} width={"100%"}>
          <WeeklyChart
            dailySchedule={dailySchedule}
            workModeConfig={workModeConfig}
          />
        </Stack>
      ),
      rightHeader: <RightHeaderJSX />,
      resizable: true,
    },
    second: {
    
      component: <Termosato />,
      width: '40%',
      resizable: true,
    },
  };

  return (
    <>
      <Stack sx={{ ...style }}>
        <CardSection multipleSection={multipleSection} />
      </Stack>
      {openConfigDialog && (
        <ConfigSetPointDialog
          title={"Configurazione"}
          description={"Programmazione giornaliera"}
          dailySchedule={dailySchedule}
          worksMode={workMode}
          workModeConfig={workModeConfig}
          open={openConfigDialog}
          onClose={() => {
            setOpenConfigDialog(false);
          }}
          onSave={handleSaveConfiguration}
        />
      )}
    </>
  );
}

const mapStateToProps = ({ Chrono, App }) => ({
  chronoConfig: Chrono.chronoConfig,
  idZoneSelected: App.idZoneSelected,
  configZone: App.selectedZone,
});

const mapDispatchToProps = (dispatch) => ({
  updateDailyScehdule: (idZone, idDay, schedule) => dispatch(updateDailyScehdule(idZone, idDay, schedule)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyProgrammingSection);
