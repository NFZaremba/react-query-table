import useSearch from "./useSearch";
import usePagination from "./usePagination";
import useSorting from "./useSorting";
import { IData } from "../shared/types";

const useTable = <T extends Array<IData>>(data: T, pageLimit: number) => {
  const { searchTerm, setSearchTerm, debouncedSearchTerm } = useSearch("");
  const { sortBy, orderBy, onSort, sortedItems } = useSorting(data);
  const { currentPage, currentData, maxPage, reset, next, prev, jump } =
    usePagination(sortedItems, pageLimit);

  return {
    search: {
      searchTerm,
      setSearchTerm,
      debouncedSearchTerm,
    },
    paginate: {
      currentPage,
      currentData,
      maxPage,
      next,
      prev,
      jump,
      reset,
    },
    sort: {
      sortBy,
      orderBy,
      onSort,
    },
  };
};

export default useTable;
