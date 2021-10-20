import axios, { AxiosResponseHeaders } from "axios";
import { IData, IQuery, IUser } from "../shared/types";
import { createUrl } from "../utils/createUrl";

let baseUrl = process.env.REACT_APP_FRONTEND_URI_PROD;

if (process.env.NODE_ENV === "development")
  baseUrl = process.env.REACT_APP_FRONTEND_URI_DEV;

axios.defaults.baseURL = baseUrl;

export const fetchAllUsers = async (): Promise<IData[]> => {
  const { data } = await axios.get<IData[]>("/users");
  return data;
};

export const fetchPaginatedUser = async ({
  searchTerm,
  page,
  pageLimit,
  sort,
  order,
}: IQuery): Promise<{ data: IData[] }> => {
  const url = createUrl({ searchTerm, page, pageLimit, sort, order });
  const user = await axios.get<IData[]>(url);
  return { data: user.data };
};

export const fetchInfiniteUser = async ({
  page,
  pageLimit,
}: IQuery): Promise<{ data: IData[]; headers: AxiosResponseHeaders }> => {
  const url = createUrl({ page, pageLimit });
  const user = await axios.get<IData[]>(url);
  return { data: user.data, headers: user.headers };
};

export const deleteUser = async (id: string): Promise<IUser> => {
  return axios.delete(`/users/${id}`);
};

export const postUser = async (newUser: IUser): Promise<IUser> => {
  const { data } = await axios.post<IUser>("/users", newUser);
  return data;
};

export const fetchUserById = async (id: string): Promise<IUser> => {
  const { data } = await axios.get<IUser>(`/users/${id}`);
  return data;
};

export const updateUser = async ({
  updatedUser,
  id,
}: {
  updatedUser: IUser;
  id: string;
}) => {
  return axios.put(`/users/${id}`, updatedUser);
};
