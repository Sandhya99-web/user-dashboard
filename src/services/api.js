import axios from "axios";

const BASE = "https://dummyjson.com/users";

export const getUsers = (limit, skip) =>
  axios.get(`${BASE}?limit=${limit}&skip=${skip}`);

export const getUser = (id) =>
  axios.get(`${BASE}/${id}`);

export const deleteUser = (id) =>
  axios.delete(`${BASE}/${id}`);

export const updateUser = (id, userData) =>
  axios.put(`${BASE}/${id}`, userData);

export const createUser = (userData) =>
  axios.post(`${BASE}/add`, userData);