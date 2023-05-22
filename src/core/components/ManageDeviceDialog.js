import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ConfigDialog from "./common/ConfigDialog";
import DeviceSettingItem from "./device/DeviceSettingItem";

function ManageDeviceDialog({
  title,
  description,
  zone,
  devices,
  open,
  onClose,
  onSave,
}) {

  const [draftDevices, setDraftDevices] = React.useState(devices);

  const saveHandler = () => {
    onSave(draftDevices);
  };

  React.useEffect(() => {
    if (!open) {
    }
  }, [open]);

  const handleAdd = (idx)=>{
    let _draftDevices = JSON.parse(JSON.stringify(draftDevices));
    _draftDevices[idx].idZone = zone;
    setDraftDevices(_draftDevices)
  }

  const handleRemove = (idx) => {
    let _draftDevices = JSON.parse(JSON.stringify(draftDevices));
    _draftDevices[idx].idZone = null;
    setDraftDevices(_draftDevices)
  }

  return (
    <ConfigDialog
      title={title}
      open={open}
      description={description}
      onClose={onClose}
      onSave={saveHandler}
    >
      <Stack mt={2} height={700}>
        {draftDevices.map((deviceInfo, idx) => {
          return (
            <DeviceSettingItem
              name={deviceInfo.name}
              zone={deviceInfo?.idZone}
              currentZone={zone}
              variant="settings"
              onAdd={()=>handleAdd(idx)}
              onRemove={()=>handleRemove(idx)}
            />
          );
        })}
      </Stack>
    </ConfigDialog>
  );
}

export default ManageDeviceDialog;
