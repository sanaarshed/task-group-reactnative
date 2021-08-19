import { reducers } from "./reducers/rootReducers";
import headerTitleReducer from "./reducers/headerTitleReducer";
import { createStore } from "redux";
import groupReducer from "./reducers/groupReducer";

const store = createStore(groupReducer);
store.subscribe(() => console.log(store.getState()));
export default store;
