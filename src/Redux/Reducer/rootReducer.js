import { combineReducers } from "redux";

import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  userData: userReducer,
  adminData: adminReducer
});

export default rootReducer;
