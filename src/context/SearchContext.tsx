import { createContext, useContext, useState } from 'react'

const SearchContext = createContext({
  search: '',
  searchHandler: (_s: string) => {},
})

const SearchProvider = (children: React.ReactNode) => {
  const [search, setSearch] = useState('')

  const searchHandler = (query: string) => setSearch(query)
  return (
    <SearchContext.Provider value={{ search, searchHandler }}>
      {children}
    </SearchContext.Provider>
  )
}

const useSearch = () => useContext(SearchContext)

export { SearchContext, SearchProvider, useSearch }
