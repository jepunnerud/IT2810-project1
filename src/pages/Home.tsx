import Fuse from 'fuse.js'
import CountryCard from '../components/CountryCard'
import { Country } from '../types'
import { useCallback, useEffect, useState } from 'react'
import { sortingFns } from '../utils/constants'
import { useCountries } from '../hooks/Countries'
import '../utils/Loader.css'
import './Home.css'
import './SelectionMenu.css'
import './SearchBar.css'

function HomePage() {
  const [sortParam, setSortParam] = useState('alphabetically')
  const [searchInput, setSearchInput] = useState('')
  const [queryData, setQueryData] = useState<string[]>([])
  const { data, isLoading } = useCountries()

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

  useEffect(() => {
    const p = sessionStorage.getItem('sortParam')
    if (p !== null) {
      setSortParam(p)
    }
  }, [])

  const updateCountryOrder = useCallback(() => {
    if (data) {
      const countries = [...data]
      const newCountryOrder = countries
        .sort(sortingFns[sortParam])
        .map((country: Country) => country.cca3)
      localStorage.setItem('countryOrder', JSON.stringify(newCountryOrder))
    }
  }, [data, sortParam])

  updateCountryOrder()

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
            data-testid="searchbar-input"
            onInput={(e) => {
              const query = e.currentTarget.value
              setSearchInput(query)
              search(query)
            }}
          ></input>
        </div>
        <div className="dropdown-container">
          <label htmlFor="sorting-parameter">Sort by </label>
          <select
            id="sorting-parameter"
            value={sortParam}
            data-testid="sorting-parameter"
            onChange={(e) => {
              setSortParam(e.target.value)
              sessionStorage.setItem('sortParam', e.target.value)
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
