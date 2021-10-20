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
}

export interface IRouteState {
  background: {
    pathname: string;
  };
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

export interface IUserRouteParams {
  id: string;
}
