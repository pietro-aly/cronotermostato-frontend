import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ConfigDialog from "./common/ConfigDialog";
import SliderComponent from "./common/SliderComponent";

function ConfigSetPointDialog({
  zones,
  title,
  description,
  open,
  onClose,
  onSave,
  dailySchedule,
  worksMode,
  workModeConfig,
}) {
  const [value, setValue] = React.useState([0, 10]);

  console.log("worksMode", worksMode);
  const getSetPointsRanges = (dailySchedule) => {
    let ranges = [];
    let idxRange = -1;

    const fixRange = (num) => +num + 1;

    dailySchedule.map((schedule, idx) => {
      if (idx === 0 || ranges[idxRange].workMode !== schedule.workMode) {
        idxRange++;
        ranges[idxRange] = {
          position: idxRange,
          start: +schedule.hour,
          end: fixRange(schedule.hour),
          workMode: schedule.workMode,
        };
      } else {
        ranges[idxRange].end = fixRange(schedule.hour);
      }
    });
    console.log("ranges", ranges);
    return thresholdManager(ranges);
  };

  const thresholdManager = (ranges) => {
    ranges = ranges.sort((a, b) => a.start - b.start);
    for (let i = 0; i < ranges.length; i++) {
      //const th_start_min = i > 0 ? +ranges[i - 1].end : 0;
      const th_start_min = i > 0 ? +ranges[i - 1].start + 1 : 0;
      const th_start_max = +ranges[i].end - 1;

      const th_end_min = +ranges[i].start + 1;
      //const th_end_max = i < ranges.length-1 ? +ranges[i+1].start : 24
      const th_end_max = i < ranges.length - 1 ? +ranges[i + 1].end - 1 : 24;

      let prevLinkRange;
      if (ranges[i - 1]?.end === ranges[i]?.start) {
        prevLinkRange = ranges[i - 1].position;
      }
      let nextLinkRange;
      if (ranges[i]?.end === ranges[i + 1]?.start) {
        nextLinkRange = ranges[i + 1].position;
      }

      ranges[i] = {
        ...ranges[i],
        thStart: [th_start_min, th_start_max],
        thEnd: [th_end_min, th_end_max],
        prevLinkRange,
        nextLinkRange
      };
    }
    return ranges;
  };

  const [setPointsRanges, setSetPointsRanges] = React.useState(
    getSetPointsRanges(dailySchedule)
  );

  const handleSetPointsRanges = (
    idxRange,
    workMode,
    start,
    end,
    skipCheck = false
  ) => {
    const { thStart, thEnd, prevLinkRange, nextLinkRange } = setPointsRanges[idxRange];
    let error = null;

    if (start < thStart[0] || start > thStart[1]) {
      start = start <= thStart[0] ? thStart[0] : thStart[1];
    }

    if (end < thEnd[0] || end > thEnd[1]) {
      end = end <= thEnd[0] ? thEnd[0] : thEnd[1];
    }

    let _setPointsRanges = JSON.parse(JSON.stringify(setPointsRanges));
    _setPointsRanges[idxRange] = {
      ..._setPointsRanges[idxRange],
      start,
      end,
      workMode,
      skipCheck,
      error,
    };

    //se l'attuale intervallo è legato ad un altro
    if (prevLinkRange != undefined) {
      _setPointsRanges[prevLinkRange] = {
        ..._setPointsRanges[prevLinkRange],
        end: start || 24,
      };
    }
    if (nextLinkRange != undefined) {
      _setPointsRanges[nextLinkRange] = {
        ..._setPointsRanges[nextLinkRange],
        start: end || 0,
      };
    }

    _setPointsRanges = thresholdManager(_setPointsRanges);

    setSetPointsRanges(_setPointsRanges);
  };

  console.log("setPointsRanges", setPointsRanges);

  React.useEffect(() => {
    if (!open) {
    }
  }, [open]);

  return (
    <ConfigDialog
      title={title}
      open={open}
      description={description}
      onClose={onClose}
      onSave={onSave}
    >
      <Stack mt={2}>
        {setPointsRanges.map((setPoint, idxRange) => (
          <Stack key={idxRange} mb={5}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <FormControl sx={{ m: 1, width: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={setPoint.workMode}
                  onChange={(e) =>
                    handleSetPointsRanges(
                      idxRange,
                      e.target.value,
                      setPoint.start,
                      setPoint.end,
                      idxRange === 0
                    )
                  }
                >
                  {Object.keys(worksMode)?.map((key) => (
                    <MenuItem key={key} value={key}>
                      {workModeConfig[key]?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="h6">
                Dalle{" "}
                <span style={{ fontWeight: "bold" }}>{setPoint.start}</span>{" "}
                alle <span style={{ fontWeight: "bold" }}>{setPoint.end}</span>
              </Typography>
            </Stack>
            <SliderComponent
              rangeColor={workModeConfig[setPoint.workMode].color}
              min={0}
              max={24}
              step={1}
              value={[setPoint.start, setPoint.end]}
              thumbsDisabled={[false, false]}
              rangeSlideDisabled={true}
              onThumbDragStart={(s) => {
                console.log("onThumbDragStart", s);
              }}
              onInput={(range) =>
                handleSetPointsRanges(
                  idxRange,
                  setPoint.workMode,
                  range[0],
                  range[1],
                  idxRange === 0
                )
              }
            />
            <Typography color={"error"} height={20}>
              {setPoint?.error}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </ConfigDialog>
  );
}

export default ConfigSetPointDialog;
