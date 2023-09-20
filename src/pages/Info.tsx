import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCountry } from '../hooks/Countries'
import '../utils/Loader.css'
import './Info.css'
import { Country } from '../types'

export default function InfoPage() {
  let { countryCode } = useParams<{ countryCode: string }>()
  countryCode = countryCode ? countryCode : ''
  const [isFavourite, setIsFavourite] = useState(false)
  const [message, setMessage] = useState('')

  const storedFavourites = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  )

  useEffect(() => {
    setIsFavourite(storedFavourites.includes(countryCode))
    setMessage(
      storedFavourites.includes(countryCode)
        ? 'Remove from favourites'
        : 'Add to favourites'
    )
  }, [storedFavourites, countryCode])

  function handleOnClick() {
    if (!isFavourite) {
      storedFavourites.push(countryCode)
      localStorage.setItem('favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
    } else {
      const newList: string[] = storedFavourites.filter(
        (code: string) => code !== countryCode
      )
      localStorage.setItem('favourites', JSON.stringify(newList))
      setIsFavourite(false)
    }
  }

  const { data, isLoading } = useCountry(countryCode)

  if (isLoading) return <span className="loader"></span>

  const country: Country = data[0]

  return (
    <div className="info-page-container">
      <h1>{country.name.common}</h1>
      <div className="content-parent">
        <div className="flag-button-container">
          <img src={country.flags.png} alt={country.name.common} />
          {<button onClick={handleOnClick}>{message}</button>}
        </div>
        <div className="info-card">
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <p>Continent: {country.region}</p>
          <p>Area: {country.area}</p>
        </div>
      </div>
    </div>
  )
}
