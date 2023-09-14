import { useEffect, useState } from 'react'
import { Country } from '../types'
import { useParams } from 'react-router-dom'

//Satt til NOR, bør settes til cca3 til landet man har klikket på

function Info() {
  const { countryCode } = useParams()

  const [countryData, setCountryData] = useState<Country[] | null>(null)
  const getCountryData = async () => {
    const data = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    ).then((response) => response.json())
    setCountryData(data)
  }
  useEffect(() => {
    getCountryData()
  }, [])

  const [isFavourite, setIsFavourite] = useState(false)
  const [message, setMessage] = useState('')

  const storedFavourites = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  )

  useEffect(() => {
    setIsFavourite(storedFavourites.includes(countryCode))

    if (storedFavourites.includes(countryCode)) {
      setMessage('Fjern fra favoritter')
    } else {
      setMessage('Legg til favoritt')
    }
  }, [storedFavourites])

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

  let box = <div> Data missing ...</div>
  if (countryData && countryData[0]) {
    const data = countryData[0]
    box = (
      <div>
        <h1>{data.name.common}</h1>
        <p>Capital: {data.capital[0]}</p>
        <p>Continent: {data.continents}</p>
        <p>Population: {data.population}</p>
        <p>Area: {data.area} sqk</p>
        <img src={data.flags.png} />

        <button onClick={handleOnClick}>{message}</button>
      </div>
    )
  }
  return box
}

export default Info
