import { getPathWithParams } from "../helpers/util";
import { CHRONO_CONFIGS, NEW_ZONE, UPDATE_DAILY_SCHEDULE, UPDATE_WORK_MODE, UPDATE_ZONE_DEVICES } from "../constant/endpoint"
import { get, patch, post, put } from "./common/webService";


export const getChronoConfigs = async () => {
  try {
    const response = await get(CHRONO_CONFIGS);
    return responseHandler(response);
  } catch (error) {
    throw _handleError(error);
  }
}

export const postNewZone = async (name) => {
  try {
    const response = await post(NEW_ZONE, {zoneName: name});
    return responseHandler(response);
  } catch (error) {
    throw _handleError(error);
  }
}

export const patchDailySchedule = async (idZone, idDay, schedule) => {
  try {
    const response = await patch(getPathWithParams(UPDATE_DAILY_SCHEDULE, idZone, idDay), {schedule});
    return responseHandler(response);
  } catch (error) {
    throw _handleError(error);
  }
}

export const patchWorkMode = async (idZone, idWorkMode, setPoint) => {
  try {
    const response = await patch(getPathWithParams(UPDATE_WORK_MODE, idZone, idWorkMode), {setPoint});
    return responseHandler(response);
  } catch (error) {
    throw _handleError(error);
  }
}

export const patchZoneDevices = async (mapZoneDevices) => {
  try {
    const response = await patch(UPDATE_ZONE_DEVICES, {mapZoneDevices});
    return responseHandler(response);
  } catch (error) {
    throw _handleError(error);
  }
}



export function responseHandler(response) {
  const { outcome, payload } = response;
  if(outcome.status === 'success'){
    return payload;
  }else{
    throw response;
  }
}

export function _handleError(error) {
  var errorObj = {};
  if (typeof error === 'object' && error !== null) {
    errorObj = {
      code: error?.code,
      message: error?.message
    };
  } else {
    errorObj = {
      code: error,
      message: error
    };
  }

  //TODO:show error toast
  //logError(errorObj.code);
  return errorObj;
}