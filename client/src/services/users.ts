import axios from "axios";
import { createUrl } from "../utils/createUrl";

let baseUrl = process.env.REACT_APP_FRONTEND_URI_PROD;

if (process.env.NODE_ENV === "development")
  baseUrl = process.env.REACT_APP_FRONTEND_URI_DEV;

axios.defaults.baseURL = baseUrl;

export const fetchAllUsers = async () => {
  const { data } = await axios.get("/users");
  return { data };
};

export const fetchUser = async ({
  searchTerm,
  page,
  pageLimit,
  sort,
  order,
}: {
  searchTerm: string;
  page: number;
  pageLimit: number;
  sort: string;
  order: string;
}) => {
  const url = createUrl({ searchTerm, page, pageLimit, sort, order });
  const user = await axios.get(url);
  return { data: user.data, headers: user.headers };
};

export const deleteUser = async (id: number) => {
  return axios.delete(`/users/${id}`);
};

export const postUser = async (newUser: any) => {
  const { data } = await axios.post("/users", newUser);
  return data;
};

export const fetchUserById = async (id: number) => {
  const { data } = await axios.get(`/users/${id}`);
  return data;
};

export const updateUser = async ({
  updatedUser,
  id,
}: {
  updatedUser: any;
  id: number;
}) => {
  return axios.put(`/users/${id}`, updatedUser);
};
