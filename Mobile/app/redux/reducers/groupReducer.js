import { actionTypes } from "../contants/actionType";

const initialState = {
  groups: {
    isLoading: null,
    error: null,
    data: null,
  },
};

function groupReducer(state = initialState.groups, action) {
  console.log("group reducer action payload : ", action.payload);
  // console.log("group reducer state : ", state);
  switch (action.type) {
    case actionTypes.GET_GROUPS_REQ:
      return {
        ...state,
        group: {
          isLoading: true,
          error: null,
          data: null,
        },
      };
    case actionTypes.GET_GROUPS_SUCCESS:
      return {
        ...state,
        byBulk: {
          isLoading: false,
          error: false,
          data: action.payload,
        },
      };
    case actionTypes.GET_GROUPS_FAIL:
      return {
        ...state,
        byBulk: {
          isLoading: false,
          error: action.payload,
          data: false,
        },
      };
    default:
      return state;
  }
}
export default groupReducer;
