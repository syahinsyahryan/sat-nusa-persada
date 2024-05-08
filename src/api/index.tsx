import axios, { AxiosResponse } from "axios";
import { User } from "../utils/interface";

const urlEndPoint = "https://jsonplaceholder.typicode.com";
const userURL = `${urlEndPoint}/users`;

export const getUser = async (
  currentPage: number,
  pageSize: number
): Promise<AxiosResponse<User[]>> => {
  try {
    const response = await axios.get<User[]>(
      `${userURL}?_page=${currentPage}&_limit=${pageSize}`
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch users. Please try again later.");
  }
};

export const insertUser = async (
  payload: User
): Promise<AxiosResponse<User>> => {
  try {
    const response = await axios.post<User>(userURL, payload);
    return response;
  } catch (error) {
    throw new Error("Failed to insert user. Please try again later.");
  }
};

export const editUser = async (payload: User): Promise<AxiosResponse<User>> => {
  try {
    const response = await axios.put<User>(`${userURL}/${payload.id}`, payload);
    return response;
  } catch (error) {
    throw new Error("Failed to edit user. Please try again later.");
  }
};

export const deleteUser = async (id: number): Promise<AxiosResponse<void>> => {
  try {
    const response = await axios.delete<void>(`${userURL}/${id}`);
    return response;
  } catch (error) {
    throw new Error("Failed to delete user. Please try again later.");
  }
};
