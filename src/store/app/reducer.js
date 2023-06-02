import { SELECT_ZONE, SELECT_ZONE_ERROR, SELECT_ZONE_SUCCESS } from "./actionTypes"

const initialState = {
  idZoneSelected: null,
  selectedZone: null,
}

const App = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ZONE:
      state = {
        ...state,
        idZoneSelected: action.payload.idZone,
        error: null
      }
      break;
    case SELECT_ZONE_SUCCESS:
      state = {
        ...state,
        idZoneSelected: action.payload.idZoneSelected,
        selectedZone: action.payload?.selectedZone,
      }
      break;
    case SELECT_ZONE_ERROR:
      state = {
        ...state,
        error: action.payload.error,
      }
      break;
    default:
      state = { ...state }
      break
  }
  return state
}

export default App
