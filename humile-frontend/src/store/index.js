import { combineReducers } from "redux";

import adminReducer from "./admin/reducer";
import userReducer from "./user/reducer";
import languageReducer from "./language/reducer";
import settingReducer from "./setting/reducer";
import planReducer from "./plan/reducer";
import complainReducer from "./complain/reducer";
import redeemReducer from "./redeem/reducer";
import hostReducer from "./host/reducer";
import dashboardReducer from "./dashboard/reducer";
import spinnerReducer from "./spinner/reducer";
import googleFbAdReducer from "./googleFbAd/reducer";
import bannerReducer from "./banner/reducer";
import { gameReducer } from "./Game/reducer";
import { categoryReducer } from "./Category/reducer";
import reportedUserReducer from "./reportedUser/reducer";
import messageReducer from "./message/reducer";

export default combineReducers({
  admin: adminReducer,
  user: userReducer,
  language: languageReducer,
  setting: settingReducer,
  plan: planReducer,
  complain: complainReducer,
  redeem: redeemReducer,
  host: hostReducer,
  dashboard: dashboardReducer,
  spinner: spinnerReducer,
  googleFbAd: googleFbAdReducer,
  banner: bannerReducer,
  game: gameReducer,
  category: categoryReducer,
  report: reportedUserReducer,
  message: messageReducer
});
