import { Country } from '../types'
import CountryCard from '../components/CountryCard'
import { useCountries } from '../hooks/Countries'
import { sortingFns } from '../utils/constants'

export default function FavouritesPage() {
  const storedFavourites = localStorage.getItem('favourites')
  const { data, isLoading } = useCountries()
  const favoriteCountries: Country[] = data
    ? data.filter(
      (country: Country) =>
        storedFavourites?.includes(country.cca3)
    )
    : []
  if (isLoading) return <h1>Loading...</h1>
  return (
    <>
      <h1>Favoritter</h1>
      <div className="card-container">
        {favoriteCountries
          ?.sort(sortingFns['alphabetically'])
          .map((c) => <CountryCard country={c} />)}
      </div>
    </>
  )
}
