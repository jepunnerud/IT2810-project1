import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCountry } from '../hooks/Countries'
import '../utils/Loader.css'

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
        ? 'Fjern fra favoritter'
        : 'Legg til favoritt'
    )
  }, [storedFavourites, countryCode])

  function handleOnClick() {
    if (!isFavourite) {
      storedFavourites.push(countryCode)
      localStorage.setItem('favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
      setMessage('Fjern fra favoritter')
    } else {
      const newList: string[] = storedFavourites.filter(
        (code: string) => code !== countryCode
      )
      localStorage.setItem('favourites', JSON.stringify(newList))
      setIsFavourite(false)
      setMessage('Legg til favoritt')
    }
  }

  const { data, isLoading } = useCountry(countryCode)

  if (isLoading) return <span className="loader"></span>

  const country = data[0]

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        <img src={country.flags.png} alt={country.name.common} />
        {<button onClick={handleOnClick}>{message}</button>}
      </div>
      <div className="infoSection">
        <p>Hovedstad: {country.capital}</p>
        <p>Befolkning: {country.population}</p>
        <p>Verdensdel: {country.region}</p>
        <p>Størrelse: {country.area}</p>
      </div>
    </>
  )
}
