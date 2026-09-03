import { httpClient } from './httpClient.js';

export const userApi = {
  listUsers: () => httpClient.get('/users').then((res) => res.data),

  getUser: (userId) => httpClient.get(`/users/${userId}`).then((res) => res.data),

  updateUser: (userId, payload) =>
    httpClient.put(`/users/${userId}`, payload).then((res) => res.data),

  addAddress: (userId, payload) =>
    httpClient.post(`/users/${userId}/addresses`, payload).then((res) => res.data),

  updateAddress: (userId, addressId, payload) =>
    httpClient.put(`/users/${userId}/addresses/${addressId}`, payload).then((res) => res.data),

  deleteAddress: (userId, addressId) =>
    httpClient.delete(`/users/${userId}/addresses/${addressId}`),
};
