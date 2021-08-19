import { actionTypes } from "../contants/actionType";

headerTitleReducer = (state = { title: "" }, action) => {
  if (action.type === actionTypes.HEADER_TITLE)
    return { ...state, title: action.payload };
  else return state;
};

export default headerTitleReducer;
