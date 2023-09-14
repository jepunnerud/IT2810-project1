import { useQuery } from '@tanstack/react-query'
import { Country } from '../types'
import CountryCard from '../components/CountryCard'
import '../utils/Loader.css'
import { useState } from 'react'
import Fuse from 'fuse.js'
import { sortingFns } from '../utils/constants'
import './Home.css'
import './SelectionMenu.css'
import './SearchBar.css'

function HomePage() {
  const [sortParam, setSortParam] = useState('alphabetically')
  const [searchInput, setSearchInput] = useState('')
  const [queryData, setQueryData] = useState<string[]>([])

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const data = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,area'
      ).then((response) => response.json())
      return data
    },
    queryKey: ['allCountries'],
  })

  const handleSearch = (e: InputEvent) => {
    const query = (e.target as HTMLInputElement).value
    console.log('Query: ' + query)
    console.log('Search input state: ' + searchInput)
    setSearchInput(query)
    search(query)
  }

  const search = (query: string) => {
    const searchOptions = {
      keys: ['value'],
      threshold: 0.3,
    }
    const fuse = new Fuse(
      data!.map((c: Country) => c.name.common),
      searchOptions
    )
    const fuseResults: Fuse.FuseResult<string>[] = fuse.search(query)
    const results = [] as string[]
    fuseResults.map((result) => results.push(result.item))
    setQueryData(results)
  }

  if (isLoading) return <span className="loader"></span>
  return (
    <>
      <div className="home-top-container">
        <div className="searchbar-container">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span className="material-symbols-outlined">search</span>
          <input
            id="input"
            className="searchbar-input"
            placeholder={'Search'}
            onInput={() => handleSearch}
          ></input>
        </div>
        <div className="dropdown-container">
          <label htmlFor="sorting-parameter">Sort by </label>
          <select
            id="sorting-parameter"
            value={sortParam}
            onChange={(e) => {
              setSortParam(e.target.value)
            }}
          >
            <option value="alphabetically">Name</option>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </div>
      </div>
      <div className="card-container">
        {queryData.length === 0 && searchInput.length > 0 ? (
          <span>No countries matched your query</span>
        ) : (
          data
            ?.filter(
              (c: Country) =>
                queryData.includes(c.name.common) || queryData.length === 0
            )
            ?.sort(sortingFns[sortParam])
            ?.map((c: Country) => <CountryCard country={c} key={c.cca3} />)
        )}
      </div>
    </>
  )
}

export default HomePage
