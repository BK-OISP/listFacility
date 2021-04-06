const localStorageService = {
  setUserData(tokenObj) {
    localStorage.setItem("acToken", tokenObj.acToken);
    localStorage.setItem("rfToken", tokenObj.rfToken);
    localStorage.setItem("fullName", tokenObj.fullName);
    localStorage.setItem("role", JSON.stringify(tokenObj.role));
    localStorage.setItem("userId", tokenObj.userId);
  },

  getUserData() {
    return {
      acToken: this.getAccessToken(),
      rfToken: this.getRefreshToken(),
      fullName: this.getFullName(),
      role: this.getRole(),
      userId: this.getUserId(),
    };
  },

  getAccessToken() {
    return localStorage.getItem("acToken");
  },

  setAccessToken(acToken) {
    return localStorage.setItem("acToken", acToken);
  },

  getRefreshToken() {
    return localStorage.getItem("rfToken");
  },

  setRefreshToken(rfToken) {
    return localStorage.setItem("rfToken", rfToken);
  },

  getFullName() {
    return localStorage.getItem("fullName");
  },

  getRole() {
    return JSON.parse(localStorage.getItem("role"));
  },

  getUserId() {
    return localStorage.getItem("userId");
  },

  clearAll() {
    return localStorage.clear();
  },
};

export default localStorageService;
