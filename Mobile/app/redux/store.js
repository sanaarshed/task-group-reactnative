import { reducers } from "./reducers/rootReducers";
import headerTitleReducer from "./reducers/headerTitleReducer";
import { createStore, applyMiddleware } from "redux";
import groupReducer from "./reducers/groupReducer";
import thunk from "redux-thunk";

const store = createStore(groupReducer);
// const store = createStore(groupReducer, applyMiddleware(thunk));

// const store = createStore(reducers);
// store.subscribe(() => console.log(store.getState()));

export default store;
