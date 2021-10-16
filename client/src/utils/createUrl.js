const QUERY_MAP = {
  page: "_page",
  pageLimit: "_limit",
  searchTerm: "q",
  sort: "_sort",
  order: "_order",
};

export const createUrl = (query) => {
  let baseUrl = "/users?";
  const queryString = Object.entries(query)
    .reduce((acc, [key, value]) => {
      if (value) {
        return [...acc, `${QUERY_MAP[key]}=${value}`];
      }
      return acc;
    }, [])
    .join("&");
  return baseUrl + queryString;
};
