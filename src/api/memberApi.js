import axiosClient from './axiosClient';

const memberApi = {
  getAllAccounts: (params) => {
    const url = '/user';
    return axiosClient.get(url, { params });
  },
  login: async (data) => {
    const url = '/auth/login';
    const response = await axiosClient.post(url, data);
    const userData = response.data;
    if (userData && userData.token) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
    }
    return response; 
  },
  register: async (data) => {
    const url = '/auth/register';
    const response = await axiosClient.post(url, data);
    return response; 
  },
  getProfile: () => {
    const url = '/auth/profile';
    return axiosClient.get(url);
  },
  updateProfile: (data) => {
    const url = '/auth/profile';
    return axiosClient.put(url, data);
  },
  changePassword: (data) => {
    const url = '/auth/profile/change-password';
    return axiosClient.put(url, data);
  },
};

export default memberApi;
