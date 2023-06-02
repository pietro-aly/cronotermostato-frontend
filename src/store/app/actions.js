import {
  SELECT_ZONE, SELECT_ZONE_SUCCESS, SELECT_ZONE_ERROR
} from "./actionTypes"

export const updateSelectedZone = (idZone) => {
  return {
    type: SELECT_ZONE,
    payload: idZone,
  }
}

export const selectZone = (idZone) => {
  return {
    type: SELECT_ZONE,
    payload: idZone,
  }
}
export const selectZoneSuccess = configZone => {
  return {
    type: SELECT_ZONE_SUCCESS,
    payload: configZone,
  }
}
export const selectZoneError = (error) => {
  return {
    type: SELECT_ZONE_ERROR,
    payload: error,
  }
}