import { useState } from 'react'
import useDebounce from './useDebounce'

const useSearch = (defaultValue) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue)
  const debouncedSearchTerm = useDebounce(searchTerm, 250)

  return {
    debouncedSearchTerm,
    searchTerm,
    setSearchTerm,
  }
}

export default useSearch
