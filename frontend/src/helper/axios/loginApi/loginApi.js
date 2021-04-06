import axiosClient from "../axiosClient";

const loginApi = {
  postIdToken: (tokenId) => {
    const url = "/oisp/auth/googlelogin";
    return axiosClient.post(url, { tokenId: tokenId });
  },
};

export default loginApi;
