import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCountries } from '../hooks/Countries';

export default function InfoPage() {
  //Satt til NOR, bør settes til cca3 til landet man har klikket på
  const { countryCode } = useParams<{ countryCode: string }>()
  console.log(countryCode)
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
    ) //
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

  const { data } = useCountries()
  const country = data.find((element: any) => element.cca3 === countryCode);


  //Legg inn all info som trengs
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        <img src={country.flags.png} alt={country.name.common} />
        {<button onClick={handleOnClick}>{message}</button>}
      </div>
      <div className='infoSection'>
        <p>Hovedstad: {country.capital}</p>
        <p>Befolkning: {country.population}</p>
        <p>Verdensdel: {country.region}</p>
        <p>Størrelse: {country.area}</p>
      </div>
    </>
  )
}
