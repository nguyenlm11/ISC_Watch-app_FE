import axiosClient from './axiosClient';

const watchApi = {
  getAllWatch(params) {
    const url = '/';
    return axiosClient.get(url, { params });
  },
  getAllWatchbyAdmin() {
    const url = '/watches';
    return axiosClient.get(url);
  },
  getDetailWatch(id) {
    const url = `/watches/${id}`;
    return axiosClient.get(url);
  },
  addWatch(data) {
    const url = '/watches';
    return axiosClient.post(url, data);
  },
  updateWatch(data) {
    const url = `/watches/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteWatch(id) {
    const url = `/watches/${id}`;
    return axiosClient.delete(url);
  },
  addComment(watchId, data) {
    const url = `/watches/${watchId}/comments`;
    return axiosClient.post(url, data);
  }
};

export default watchApi;
