import { combineReducers } from "redux";

import Chrono from "./chrono/reducer";
import App from "./app/reducer";

const rootReducer = combineReducers({
  Chrono,
  App
});

export default rootReducer;
