import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
 
import postReducer from "./PostReducer";

import notificationReducer from "./NotificationReducer";

// export const reducers = combineReducers({authReducer,postReducer,notificationReducer})
export const reducers = combineReducers({
     authReducer,
     postReducer,
    notifications: notificationReducer, // Make sure 'notifications' is correctly mapped here
  });