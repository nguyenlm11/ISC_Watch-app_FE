// brandApi.js
import axiosClient from './axiosClient';

const brandApi = {
  getAllBrand(params) {
    const url = 'brand';
    return axiosClient.get(url, { params });
  },
  addBrand(data) {
    const url = '/brand';
    return axiosClient.post(url, data);
  },
  updateBrand(data) {
    const url = `/brand/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteBrand(id) {
    const url = `/brand/${id}`;
    return axiosClient.delete(url);
  }
};

export default brandApi;
