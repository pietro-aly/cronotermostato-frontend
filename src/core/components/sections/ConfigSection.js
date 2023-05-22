import { IconButton, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import React from "react";
import CardSection from "../common/CardSection";
import ChronoSettings from "../../../config/chronothermostat.json";
import { getUserConfig } from "../../../service/UserConfig";
import WorkMode from "../WorkMode";
import Device from "../device/Device";
import ManageDeviceDialog from "../ManageDeviceDialog";

function ConfigSection({ style, zone, tempUpdateAll }) {
  const UserConfig = getUserConfig();
  const workMode = UserConfig.getWorkModeZone(zone);
  const workModeConfig = ChronoSettings.workMode;
  const deviceList = UserConfig.getDeviceList();
  const zoneDevicesList = UserConfig.getZoneDevicesList(zone);

  console.log(deviceList, zoneDevicesList);

  const [openManageDevice, setOpenManageDevice] = React.useState(false);

  const handleSetPointChanged = (workMode, value) => {
    UserConfig.setNewSetPointValue(zone, workMode, value);
    tempUpdateAll(new Date());
  };

  const handleNewDeviceList = (newDeviceList) => {
    UserConfig.setDevicesList(newDeviceList);
    tempUpdateAll(new Date());
  };

  const WorkModeConfiguration = () => (
    <Stack mt={3} direction={"row"} spacing={2}>
      {Object.keys(workMode).map((key, idx) => (
        <WorkMode
          key={idx}
          workMode={key}
          value={workMode[key]}
          label={workModeConfig[key].label}
          color={workModeConfig[key].color}
          onSetPointChanged={(value) => {
            handleSetPointChanged(key, value);
          }}
        />
      ))}
    </Stack>
  );
  const DeviceConfiguration = () => (
    <Stack mt={3} direction={"row"} spacing={2}>
      {zoneDevicesList.map((device) => (
        <Device name={device.name} state={"26°C"} />
      ))}
    </Stack>
  );

  const RightHeaderJSX = () => (
    <Stack
      direction={"row"}
      height={"fit-content"}
      width={"100%"}
      justifyContent={"end"}
    >
      <Stack height={22} component={"div"}>
        <IconButton
          disableRipple={false}
          sx={{ backgroundColor: "#F2F2F6", padding: "16px", borderRadius: 4 }}
          onClick={() => {
            setOpenManageDevice(true);
          }}
          color="primary"
          component="label"
        >
          <AddIcon fontSize="medium" />
        </IconButton>
      </Stack>
    </Stack>
  );

  const multipleSection = {
    first: {
      title: "Configurazione",
      subTitle: "Modalità di funzionamento",
      component: <WorkModeConfiguration />,
    },
    second: {
      title: "Configurazione",
      subTitle: "Valvole termostatiche",
      component: <DeviceConfiguration />,
      rightHeader: <RightHeaderJSX />,
    },
  };

  return (
    <>
      <Stack sx={{ ...style }}>
        <CardSection multipleSection={multipleSection} />
      </Stack>
      {openManageDevice && (
        <ManageDeviceDialog
          title={"Device"}
          description={"Gestione device zona"}
          devices={deviceList}
          zone={zone}
          open={openManageDevice}
          onClose={() => {
            setOpenManageDevice(false);
          }}
          onSave={(newDeviceList) => {
            handleNewDeviceList(newDeviceList);
          }}
        />
      )}
    </>
  );
}

export default ConfigSection;
