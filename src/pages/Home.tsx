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

  const [query, setQuery] = useState<string[]>([])

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const data = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,area'
      ).then((response) => response.json())
      return data
    },
    queryKey: ['allCountries'],
  })

  const search = () => {
    const searchOptions = {
      keys: ['value'],
      threshold: 0.3,
    }
    const fuse = new Fuse(
      data!.map((c: Country) => c.name.common),
      searchOptions
    )
    const fuseResults: Fuse.FuseResult<string>[] = fuse.search(
      (document.getElementById('input') as HTMLInputElement).value
    )
    const results = [] as string[]
    console.log(fuseResults)
    fuseResults.map((result) => results.push(result.item))
    setQuery(results)
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
            onInput={search}
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
        {data
          ?.filter(
            (c: Country) => query.includes(c.name.common) || query.length === 0
          )
          ?.sort(sortingFns[sortParam])
          ?.map((c: Country) => <CountryCard country={c} key={c.cca3} />)}
      </div>
    </>
  )
}

export default HomePage
