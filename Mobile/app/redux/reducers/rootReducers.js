import { combineReducers } from "redux";

import headerTitleReducer from "./headerTitleReducer";
import groupReducer from "./groupReducer";

export const reducers = combineReducers({
  getGroups: groupReducer,
  headerTitle: headerTitleReducer,
});
