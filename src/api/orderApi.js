import axiosClient from './axiosClient';

const orderApi = {
  createOrder(data) {
    const url = '/orders';
    return axiosClient.post(url, data);
  },
  getOrdersByMember() {
    const url = '/orders';
    return axiosClient.get(url);
  },
  getAllOrders() {
    const url = '/orders/all';
    return axiosClient.get(url);
  },
  updateOrderStatus(id, status) {
    const url = `/orders/${id}`;
    return axiosClient.put(url, { status });
  }
};

export default orderApi;
