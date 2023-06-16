import {
  LOAD_CHRONO_CONFIGS, LOAD_CHRONO_CONFIGS_ERROR, LOAD_CHRONO_CONFIGS_SUCCESS,
  CREATE_ZONE, CREATE_ZONE_ERROR, CREATE_ZONE_SUCCESS,
  UPDATE_DAILY_SCHEDULE, UPDATE_DAILY_SCHEDULE_ERROR, UPDATE_DAILY_SCHEDULE_SUCCESS, 
  UPDATE_WORK_MODE, UPDATE_WORK_MODE_SUCCESS, UPDATE_WORK_MODE_ERROR, 
  UPDATE_ZONE_DEVICES, UPDATE_ZONE_DEVICES_SUCCESS, UPDATE_ZONE_DEVICES_ERROR
} from "./actionTypes"

export const loadChronoConfigs = () => {
  return {
    type: LOAD_CHRONO_CONFIGS,
    payload: null,
  }
}
export const loadChronoConfigsSuccess = chronoConfigs => {
  return {
    type: LOAD_CHRONO_CONFIGS_SUCCESS,
    payload: chronoConfigs,
  }
}
export const loadChronoConfigsError = (error) => {
  return {
    type: LOAD_CHRONO_CONFIGS_ERROR,
    payload: error,
  }
}


export const createZone = (name) => {
  return {
    type: CREATE_ZONE,
    payload: name,
  }
}
export const createZoneSuccess = userChronoConfig => {
  return {
    type: CREATE_ZONE_SUCCESS,
    payload: userChronoConfig,
  }
}
export const createZoneError = (error) => {
  return {
    type: CREATE_ZONE_ERROR,
    payload: error,
  }
}


export const updateDailyScehdule = (idZone, idDay, schedule) => {
  return {
    type: UPDATE_DAILY_SCHEDULE,
    payload: {idZone, idDay, schedule},
  }
}
export const updateDailyScehduleSuccess = userChronoConfig => {
  return {
    type: UPDATE_DAILY_SCHEDULE_SUCCESS,
    payload: userChronoConfig,
  }
}
export const updateDailyScehduleError = (error) => {
  return {
    type: UPDATE_DAILY_SCHEDULE_ERROR,
    payload: error,
  }
}


export const updateWorkMode = (idZone, idWorkMode, setPoint) => {
  return {
    type: UPDATE_WORK_MODE,
    payload: {idZone, idWorkMode, setPoint},
  }
}
export const updateWorkModeSuccess = userChronoConfig => {
  return {
    type: UPDATE_WORK_MODE_SUCCESS,
    payload: userChronoConfig,
  }
}
export const updateWorkModeError = (error) => {
  return {
    type: UPDATE_WORK_MODE_ERROR,
    payload: error,
  }
}


export const updateZoneDevices = (idZone, mapZoneDevices) => {
  return {
    type: UPDATE_ZONE_DEVICES,
    payload: {idZone, mapZoneDevices},
  }
}
export const updateZoneDevicesSuccess = userChronoConfig => {
  return {
    type: UPDATE_ZONE_DEVICES_SUCCESS,
    payload: userChronoConfig,
  }
}
export const updateZoneDevicesError = (error) => {
  return {
    type: UPDATE_ZONE_DEVICES_ERROR,
    payload: error,
  }
}

