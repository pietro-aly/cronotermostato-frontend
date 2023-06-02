import { takeEvery, put, call, select } from "redux-saga/effects"
import { selectZoneError, selectZoneSuccess } from "./actions"
import { SELECT_ZONE } from "./actionTypes"
import { getChronoConfigs } from "../../service/ChronoService";
import { LOAD_CHRONO_CONFIGS_SUCCESS } from "../chrono/actionTypes";


function* initSelectZone({payload: {userConfig}}) {
  try {
    const idZoneSelected =  Object.keys(userConfig?.zone)[0];
    const selectedZone = userConfig?.zone[idZoneSelected];

    yield put(selectZoneSuccess({idZoneSelected, selectedZone}));
  } catch (error) {
    yield put(selectZoneError(error))
  }
}

function* selectZone({payload: idZone}) {
  try {
    const idZoneSelected = idZone;
    const configZones = yield select(_getConfigZones);
    const selectedZone = configZones[idZoneSelected];

    yield put(selectZoneSuccess({idZoneSelected, selectedZone}));
  } catch (error) {
    yield put(selectZoneError(error))
  }
}

function _getConfigZones({ Chrono }) {
  const configZones = Chrono?.configZones;
  return JSON.parse(JSON.stringify(configZones));
}


function* AppSaga() {
  yield takeEvery(SELECT_ZONE, selectZone)
  yield takeEvery(LOAD_CHRONO_CONFIGS_SUCCESS, initSelectZone)
}

export default AppSaga
