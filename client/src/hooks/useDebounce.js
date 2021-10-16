import { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    // Cancel timeout if value changes and avoid memory leaks
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce
