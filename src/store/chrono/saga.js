import { takeEvery, put, call } from "redux-saga/effects"
import { createZoneError, createZoneSuccess, loadChronoConfigsError, loadChronoConfigsSuccess, updateDailyScehduleError, updateDailyScehduleSuccess, updateWorkModeError, updateWorkModeSuccess, updateZoneDevicesError, updateZoneDevicesSuccess } from "./actions"
import { CREATE_ZONE, LOAD_CHRONO_CONFIGS, UPDATE_DAILY_SCHEDULE, UPDATE_WORK_MODE, UPDATE_ZONE_DEVICES } from "./actionTypes"
import { getChronoConfigs, patchDailySchedule, patchWorkMode, patchZoneDevices, postNewZone } from "../../service/ChronoService";
import { selectZone, updateSelectedZone } from "../app/actions";


function* loadChronoConfigs() {
  try {
    const chronoConfigs = yield call(getChronoConfigs);
    yield put(loadChronoConfigsSuccess(chronoConfigs));
  } catch (error) {
    yield put(loadChronoConfigsError())
  }
}

function* createZone({payload: name}) {
  try {
    const userChronoConfig = yield call(postNewZone, name);
    const idZoneSelected = name.toLowerCase();

    yield put(createZoneSuccess(userChronoConfig));
    yield put(selectZone(idZoneSelected));
  } catch (error) {
    yield put(createZoneError(error))
  }
}

function* updateDailyScehdule({payload:{idZone, idDay, schedule}}) {
  try {
    const userChronoConfig = yield call(patchDailySchedule, idZone, idDay, schedule);
    yield put(updateDailyScehduleSuccess(userChronoConfig));
    yield put(updateSelectedZone(idZone));
  } catch (error) {
    yield put(updateDailyScehduleError(error))
  }
}

function* updateWorkMode({payload:{idZone, idWorkMode, setPoint}}) {
  try {
    const userChronoConfig = yield call(patchWorkMode, idZone, idWorkMode, setPoint);
    yield put(updateWorkModeSuccess(userChronoConfig));
    yield put(updateSelectedZone(idZone));
  } catch (error) {
    yield put(updateWorkModeError(error))
  }
}

function* updateZoneDevices({payload:{idZone, mapZoneDevices}}) {
  try {
    const userChronoConfig = yield call(patchZoneDevices, mapZoneDevices);
    yield put(updateZoneDevicesSuccess(userChronoConfig));
    yield put(updateSelectedZone(idZone));
  } catch (error) {
    yield put(updateZoneDevicesError(error))
  }
}

function* AppSaga() {
  yield takeEvery(LOAD_CHRONO_CONFIGS, loadChronoConfigs);
  yield takeEvery(CREATE_ZONE, createZone);
  yield takeEvery(UPDATE_DAILY_SCHEDULE, updateDailyScehdule);
  yield takeEvery(UPDATE_WORK_MODE, updateWorkMode);
  yield takeEvery(UPDATE_ZONE_DEVICES, updateZoneDevices);
}

export default AppSaga
