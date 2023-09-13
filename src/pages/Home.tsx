import { Country } from '../types'
import CountryCard from '../components/CountryCard'
import './Home.css'
import { useState } from 'react'
import { useCountries } from '../hooks/Countries'
import { sortingFns } from '../utils/constants'

function HomePage() {
  const [sortParam, setSortParam] = useState('alphabetically')

  const { data, isLoading } = useCountries()

  if (isLoading) return <h1>Loading...</h1>
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
          .sort(sortingFns[sortParam])
          .map((c: Country) => <CountryCard country={c} key={c.cca3} />)}
      </div>
    </>
  )
}

export default HomePage
