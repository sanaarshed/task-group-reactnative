import { actionTypes } from "../contants/actionType";

const apiUrl = "https://sana-todo-api.herokuapp.com/groups";

export const getGroups = async (dispatch) => {
  dispatch({
    type: actionTypes.GET_ONE_GROUP_REQ,
  });
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
    });
    const json = await response.json();
    if (json) {
      dispatch({
        type: actionTypes.GET_GROUPS_SUCCESS,
        payload: "data fetched : " + json,
      });
    } else {
      console.log("Error in group Actions. res is null ");
    }
  } catch (e) {
    dispatch({
      type: actionTypes.GET_GROUPS_FAIL,
      payload: "Error in getting data: " + e,
    });
  }
};
export const getGroupsfunc = (dispatch) => {
  return () => getGroups(dispatch);
};
