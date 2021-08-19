import { actionTypes } from "../contants/actionType";

const apiUrl = "https://sana-todo-api.herokuapp.com/groups";

export const getGroups = () => async (dispatch) => {
  dispatch({ type: GET_POSTS_BULK_REQUEST });

  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    if (json) {
      dispatch({
        type: actionTypes.GET_GROUPS_SUCCESS,
        payload: "data fetched : " + json,
      });
    } else {
      dispatch({
        type: actionTypes.GET_GROUPS_FAIL,
        payload: "the data is null",
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.GET_GROUPS_FAIL,
      payload: "Error in getting data: " + e,
    });
  }
};

export const getGroupsFunc = (dispatch) => {
  return () => getGroups(dispatch);
};
