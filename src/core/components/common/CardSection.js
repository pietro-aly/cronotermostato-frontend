import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

function CardSection({ title, subTitle, rightHeader, children }) {
  return (
    <Paper sx={{ padding: 4, paddingTop: 4, borderRadius: 5 }}>
      <Stack direction={"row"}>
        <Stack  width={'100%'}>
          <Typography variant="h6" color="text.secondary" component="div">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={"bold"} component="div">
            {subTitle}
          </Typography>
        </Stack>
        {rightHeader}
      </Stack>
      <Stack>{children}</Stack>
    </Paper>
  );
}

export default CardSection;
