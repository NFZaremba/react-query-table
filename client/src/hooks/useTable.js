import useSearch from './useSearch'
import usePagination from './usePagination'
import useSort from './useSorting'

const useTable = (data, pageLimit) => {
  const { searchTerm, setSearchTerm, debouncedSearchTerm } = useSearch('')
  const { sortBy, orderBy, onSort, sortedItems } = useSort(data)
  const { currentPage, currentData, maxPage, reset, next, prev, jump } = usePagination(sortedItems, pageLimit)

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
  }
}

export default useTable
