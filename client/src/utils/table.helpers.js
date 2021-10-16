export const getLastPage = (dataLength, pageLimit) => {
  return dataLength < pageLimit;
};

export const getFirstPage = (currentPage) => {
  return currentPage <= 1;
};
