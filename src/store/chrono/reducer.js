import { CREATE_ZONE, CREATE_ZONE_ERROR, CREATE_ZONE_SUCCESS, LOAD_CHRONO_CONFIGS, 
  LOAD_CHRONO_CONFIGS_ERROR, LOAD_CHRONO_CONFIGS_SUCCESS, UPDATE_DAILY_SCHEDULE, 
  UPDATE_DAILY_SCHEDULE_ERROR, UPDATE_DAILY_SCHEDULE_SUCCESS, 
  UPDATE_WORK_MODE, UPDATE_WORK_MODE_ERROR, UPDATE_WORK_MODE_SUCCESS, UPDATE_ZONE_DEVICES, UPDATE_ZONE_DEVICES_ERROR, UPDATE_ZONE_DEVICES_SUCCESS } from "./actionTypes"

const initialState = {
  loadingChronoConfigs: false,
  chronoConfig: null,
  userChronoConfig: null,
  deviceRegistry: null,
  configZones: null,
  zones: [],
  loadingUpdateConfig: false
}

const App = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHRONO_CONFIGS:
      state = {
        ...state,
        loadingChronoConfigs: true,
      }
      break;
    case LOAD_CHRONO_CONFIGS_SUCCESS:
      state = {
        ...state,
        loadingChronoConfigs: false,
        chronoConfig: action.payload?.chronoConfig,
        userChronoConfig: action.payload?.userConfig,
        deviceRegistry: action.payload?.userConfig?.deviceRegistry,
        configZones: action.payload?.userConfig?.zone,
        zones: Object.keys(action.payload?.userConfig?.zone) || [],
      }
      break;
    case LOAD_CHRONO_CONFIGS_ERROR:
      state = {
        ...state,
        loadingChronoConfigs: false,
      }
      break;
    case CREATE_ZONE:
    case UPDATE_DAILY_SCHEDULE:
    case UPDATE_WORK_MODE:
    case UPDATE_ZONE_DEVICES:
      state = {
        ...state,
        loadingUpdateConfig: true,
      }
      break;
    case CREATE_ZONE_SUCCESS:
    case UPDATE_DAILY_SCHEDULE_SUCCESS:
    case UPDATE_WORK_MODE_SUCCESS:
    case UPDATE_ZONE_DEVICES_SUCCESS:
      state = {
        ...state,
        loadingUpdateConfig: false,
        userChronoConfig: action.payload,
        deviceRegistry: action.payload?.deviceRegistry,
        configZones: action.payload?.zone,
        zones: Object.keys(action.payload?.zone) || [],
      }
      break;
    case CREATE_ZONE_ERROR:
    case UPDATE_DAILY_SCHEDULE_ERROR:
    case UPDATE_WORK_MODE_ERROR:
    case UPDATE_ZONE_DEVICES_ERROR:
      state = {
        ...state,
        loadingUpdateConfig: false,
      }
      break;
    default:
      state = { ...state }
      break
  }
  return state
}

export default App
