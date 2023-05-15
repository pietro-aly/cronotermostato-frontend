import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

function CardSection({ title, subTitle, children }) {
  return (
    <Paper sx={{ padding: 4, paddingTop:4, borderRadius: 5 }}>
      <Stack>
        <Typography variant="h6" color="text.secondary" component="div">
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {subTitle}
        </Typography>
      </Stack>
      <Stack>{children}</Stack>
    </Paper>
  );
}

export default CardSection;
