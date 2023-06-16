import { Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const SingleSection = ({ title, subTitle, rightHeader, children }) => (
  <Stack height="100%">
    <Stack direction="row" justifyContent="space-between">
      <Stack>
        <Typography variant="h6" color="text.secondary" component="div">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold" component="div">
          {subTitle}
        </Typography>
      </Stack>
      {rightHeader}
    </Stack>
    <Stack flexGrow={1}>{children}</Stack>
  </Stack>
);

function CardSection({ title, subTitle, rightHeader, children, multipleSection = null }) {
  return (
    <Paper sx={{ padding: 4, borderRadius: 5, height: "100%" }}>
      {!multipleSection ? (
        <SingleSection title={title} subTitle={subTitle} rightHeader={rightHeader}>
          {children}
        </SingleSection>
      ) : (
        <Stack direction="row" height="100%">
          <Stack width={multipleSection.first?.width || '100%'}>
            <SingleSection
              title={multipleSection.first.title}
              subTitle={multipleSection.first.subTitle}
              rightHeader={multipleSection.first.rightHeader}
            >
              {multipleSection.first.component}
            </SingleSection>
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
          <Stack width={multipleSection.second?.width || '100%'} sx={{ padding: '16px', marginTop: '100px', marginBottom: '20px' }}>
            <SingleSection
              title={multipleSection.second.title}
              subTitle={multipleSection.second.subTitle}
              rightHeader={multipleSection.second.rightHeader}
              children={multipleSection.second.component}
            />
          </Stack>
        </Stack>
      )}
    </Paper>
  );
}

export default CardSection;
