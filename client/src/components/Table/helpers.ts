export const isLastPage = (dataLength: number = 0, pageLimit: number) => {
  return dataLength < pageLimit;
};

export const isFirstPage = (currentPage: number) => {
  return currentPage <= 1;
};
