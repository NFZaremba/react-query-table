import { IQuery } from "../types";

type QueryMap = { [k: string]: string };

const QUERY_MAP: QueryMap = {
  page: "_page",
  pageLimit: "_limit",
  searchTerm: "q",
  sort: "_sort",
  order: "_order",
};

export const createUrl = (query: IQuery) => {
  let baseUrl = "/users?";
  const queryString = Object.entries(query)
    .reduce<string[]>((acc, next) => {
      const [key, value] = next;
      if (value) {
        return [...acc, `${QUERY_MAP[key]}=${value}`];
      }
      return acc;
    }, [])
    .join("&");
  return baseUrl + queryString;
};
