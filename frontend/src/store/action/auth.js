import localStorageService from "../../helper/localStorage/localStorageService";
import * as actionType from "./actionType";

export const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authSuccess = (userData) => {
  return {
    type: actionType.AUTH_SUCCESS,
    fullName: userData.fullName,
    userId: userData.userId,
    acToken: userData.acToken,
    rfToken: userData.rfToken,
    role: userData.role,
  };
};

export const authFailed = (error) => {
  return {
    type: actionType.AUTH_FAILED,
    error,
  };
};

export const authLogout = () => {
  localStorageService.clearAll();
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const onTryAutoLogin = () => {
  return (dispatch) => {
    const acToken = localStorageService.getAccessToken();
    const rfToken = localStorageService.getRefreshToken();
    if (!rfToken || !acToken) {
      return dispatch(authLogout());
    }
    const userData = localStorageService.getUserData();
    dispatch(authSuccess(userData));
  };
};
