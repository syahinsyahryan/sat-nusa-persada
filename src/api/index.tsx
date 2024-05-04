import axios from "axios";

// interfaces
import { User } from "../utils/interface";

const urlEndPoint = "https://jsonplaceholder.typicode.com";

export const getUserAPI = async () => {
  const url = `${urlEndPoint}/users`;
  const response = await axios.get(url);
  return response;
};

export const insertUser = async (payload: User) => {
  const url = `${urlEndPoint}/users`;
  const response = await axios.post(url, payload);
  return response;
};

export const editUser = async (payload: User) => {
  const url = `${urlEndPoint}/users/${payload.id}`;
  const response = await axios.put(url, payload);
  return response;
};

export const deleteUser = async (id: number) => {
  const url = `${urlEndPoint}/users/${id}`;
  const response = await axios.delete(url);
  return response;
};
