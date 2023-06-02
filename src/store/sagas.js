import { all, fork } from "redux-saga/effects"

import ChronoSaga from "./chrono/saga";
import AppSaga from "./app/saga";


export default function* rootSaga() {
  yield all([
    fork(ChronoSaga),
    fork(AppSaga)
  ])
}
