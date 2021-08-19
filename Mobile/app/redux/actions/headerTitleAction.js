import { actionTypes } from "../contants/actionType";

export const headerTitleAction = (title) => ({
  type: actionTypes.HEADER_TITLE,
  payload: title,
});
