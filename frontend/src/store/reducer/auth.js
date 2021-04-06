import * as actionType from "../action/actionType";
import updateObject from "../../helper/updateObject/updateObject";

const initState = {
  fullName: null,
  userId: null,
  error: null,
  loading: false,
  role: null,
  acToken: null,
  rfToken: null,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    fullName: action.fullName,
    userId: action.userId,
    error: null,
    loading: false,
    role: action.role,
    acToken: action.acToken,
    rfToken: action.rfToken,
  });
};

const authFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    fullName: "",
    userId: "",
    error: null,
    loading: false,
    role: null,
    acToken: null,
    rfToken: null,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return authStart(state, action);
    case actionType.AUTH_FAILED:
      return authFailed(state, action);
    case actionType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionType.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
