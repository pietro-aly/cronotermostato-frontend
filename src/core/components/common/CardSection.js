import { Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const SingleSection = ({ title, subTitle, rightHeader, children }) => (
  <Stack>
    <Stack direction={"row"}>
      <Stack width={"100%"}>
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
  </Stack>
);

function CardSection({
  title,
  subTitle,
  rightHeader,
  children,
  multipleSection = null,
}) {
  return (
    <Paper sx={{ padding: 4, paddingTop: 4, borderRadius: 5 }}>
      {!multipleSection && (
        <SingleSection
          title={title}
          subTitle={subTitle}
          rightHeader={rightHeader}
          children={children}
        />
      )}
      {multipleSection && (
        <>
          <Stack direction={"row"}>
            <Stack width={'100%'}>
              <SingleSection
                title={multipleSection.first.title}
                subTitle={multipleSection.first.subTitle}
                rightHeader={multipleSection.first.rightHeader}
                children={multipleSection.first.component}
              />
            </Stack>
            <Divider orientation="vertical" flexItem sx={{marginLeft: 5, marginRight:5}} />
            <Stack width={'100%'}>
              <SingleSection
                title={multipleSection.second.title}
                subTitle={multipleSection.second.subTitle}
                rightHeader={multipleSection.second.rightHeader}
                children={multipleSection.second.component}
              />
            </Stack>
          </Stack>
        </>
      )}
    </Paper>
  );
}

export default CardSection;
