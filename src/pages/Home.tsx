import { useCountries } from '../hooks/Countries'
import { sortingFns } from '../utils/constants'
import { Country } from '../types'
import CountryCard from '../components/CountryCard'
import './Home.css'
import '../utils/Loader.css'
import { useState } from 'react'
import './SelectionMenu.css'

function HomePage() {
  const [sortParam, setSortParam] = useState('alphabetically')
  const { data, isLoading } = useCountries()

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
        {data.sort(sortingFns[sortParam]).map((c: Country) => (
          <CountryCard country={c} key={c.cca3} />
        ))}
      </div>
    </>
  )
}

export default HomePage
