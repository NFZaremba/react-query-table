import React from "react";

export interface IData {
  [k: string]: boolean | number | string;
}

export interface IQuery {
  searchTerm?: string;
  page: number;
  pageLimit: number;
  sort?: string;
  order?: string;
}

export interface IComponentBase {
  children: React.ReactNode;
  className?: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

export type QueryOptions = {
  id: string;
  onSuccess?: () => void;
  onError?: () => void;
};
