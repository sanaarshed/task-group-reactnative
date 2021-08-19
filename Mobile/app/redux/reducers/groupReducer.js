import { actionTypes } from "../contants/actionType";

const initialState = {
  groups: {
    isLoading: null,
    error: null,
    data: null,
  },
};

function groupReducer(state = initialState, action) {
  console.log("group reducer action payload : ", action);
  switch (action.type) {
    case actionTypes.GET_GROUPS_REQ:
      return { ...state, groups: { isLoading: true, error: null, data: null } };
    case actionTypes.GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: {
          isLoading: false,
          error: null,
          data: " action.payload",
        },
      };
    case actionTypes.GET_GROUPS_FAIL:
      return {
        ...state,
        groups: { isLoading: false, error: action.payload, data: null },
      };
    default:
      state;
  }
}
export default groupReducer;
