import { Button, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import AddZoneDialog from "../AddZoneDialog";

function ZoneSection({ zones, selected, onSelected, onCreate }) {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
  };

  const ZoneBtn = ({ name, selected }) => (
    <Button
      onClick={() => onSelected(name)}
      variant={selected ? "contained" : "text"}
    >
      {name}
    </Button>
  );

  return (
    <>
      <Stack spacing={3}>
        <Stack direction={"row"} spacing={2}>
          {zones?.map((name, idx) => {
            return (
              <ZoneBtn key={idx} name={name} selected={name === selected} />
            );
          })}
          <Stack>
            <IconButton
              onClick={handleOpenDialog}
              color="primary"
              component="label"
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      {openAddDialog && (
        <AddZoneDialog
          zones={zones}
          title={"Nuova zona"}
          description={
            "Crea una nuova zona in cui configurare il cronotermostato"
          }
          open={openAddDialog}
          onClose={handleCloseDialog}
          onCreate={onCreate}
        />
      )}
    </>
  );
}

export default ZoneSection;
