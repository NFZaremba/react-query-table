import { useMemo, useState, useCallback } from "react";
import { IData } from "../types";

const usePagination = (data: IData[] = [], pageLimit: number = 15) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / pageLimit);

  const currentData = useCallback(() => {
    const begin = (currentPage - 1) * pageLimit;
    const end = begin + pageLimit;
    console.log(begin, end);
    return data.slice(begin, end);
  }, [currentPage, data, pageLimit]);

  let actions = useMemo(
    () => ({
      next: () => {
        setCurrentPage((currentPage) =>
          !maxPage ? currentPage + 1 : Math.min(currentPage + 1, maxPage)
        );
      },
      prev: () => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
      },
      jump: (page: number) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage(() => Math.min(pageNumber, maxPage));
      },
      reset: () => {
        setCurrentPage(1);
      },
    }),
    [maxPage]
  );

  return { ...actions, currentData, maxPage, currentPage };
};

export default usePagination;
