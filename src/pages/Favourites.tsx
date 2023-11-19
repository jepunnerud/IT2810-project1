import { Country } from '../types'
import CountryCard from '../components/CountryCard'
import { useCountries } from '../hooks/Countries'
import { sortingFns } from '../utils/constants'
import '../utils/Loader.css'
import './Favourites.css'

export default function FavouritesPage() {
  const storedFavourites = localStorage.getItem('favourites')
  const { data, isLoading } = useCountries()
  const favoriteCountries: Country[] = data
    ? data.filter(
        (country: Country) => storedFavourites?.includes(country.cca3)
      )
    : []
  if (isLoading) return <span className="loader"></span>
  return (
    <div className="favourites-parent-container">
      <h1>Favourites</h1>
      <div className="card-container">
        {favoriteCountries
          ?.sort(sortingFns['alphabetically'])
          .map((c) => <CountryCard country={c} />)}
      </div>
    </div>
  )
}
