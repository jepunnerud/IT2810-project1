import { useQuery } from '@tanstack/react-query'
import { Country, SortingMap } from '../types'
import CountryCard from '../components/CountryCard'
import './Home.css'
import { useState } from 'react'
import './SelectionMenu.css'

function HomePage() {
  const [sortParam, setSortParam] = useState('alphabetically')

  const sortingFns: SortingMap = {
    alphabetically: (c1: Country, c2: Country) =>
      c1.name.common > c2.name.common ? 1 : -1,
    population: (c1: Country, c2: Country) =>
      c1.population > c2.population ? -1 : 1,
    area: (c1: Country, c2: Country) => (c1.area > c2.area ? -1 : 1),
  }

  async function getAllCountries(): Promise<Country[]> {
    const data = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,cca3,independent,population,area'
    ).then((response) => response.json())
    const countries: Country[] = data
    const filteredCountries: Country[] = countries.filter(
      (country: Country) => country.independent
    )
    const sortedCountries: Country[] = filteredCountries.sort(
      sortingFns[sortParam]
    )
    return sortedCountries
  }

  const { data, isLoading } = useQuery({
    queryFn: () => getAllCountries(),
    queryKey: ['allCountries'],
  })

  if (isLoading) return <span className="loader"></span>
  return (
    <>
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
      <div className="card-container">
        {data
          ?.sort(sortingFns[sortParam])
          ?.map((c) => <CountryCard country={c} key={c.cca3} />)}
      </div>
    </>
  )
}

export default HomePage
