import { Stack } from "@mui/material";
import React from "react";
import ZoneSection from "../core/components/sections/ZonesSection";
import WeeklyProgrammingSection from "../core/components/sections/WeeklyProgrammingSection";
import ConfigSection from "../core/components/sections/ConfigSection";
import { connect } from "react-redux";


function Home() {
  return (
    <Stack sx={{ backgroundColor: "#F2F2F6", height: "100vh", padding: 5 }}>
      <ZoneSection />
      <WeeklyProgrammingSection style={{ marginTop: 5 }}/>
      <ConfigSection style={{ marginTop: 5 }} />
    </Stack>
  );
}

const mapStateToProps = ({ Chrono }) => ({});
const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
