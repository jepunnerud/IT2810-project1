import { useQuery } from '@tanstack/react-query'
import { Country } from '../types'
import CountryCard from '../components/CountryCard'


//Kunne brukt koden fra Home.tsx på en litt bedre måte. Importert en funskjson is stedet for å kopiere over koden
export async function getFavouriteCountries(){
    const storedFavourites = localStorage.getItem('favourites')
    const data = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,cca3,independent'
      ).then((response) => response.json())
      const countries: Country[] = data
      const filteredCountries: Country[] = countries.filter(
        (country: Country) => country.independent
      )        
      const favouriteCountries: Country[] = filteredCountries.filter(
        (country: Country) => storedFavourites?.includes(country.cca3)
      )
      const sortedCountries: Country[] = favouriteCountries.sort((c1, c2) =>
        c1.name.common > c2.name.common ? 1 : -1
      )
      console.log(sortedCountries)
      return sortedCountries
    }


export default function FavouritesPage(){    
    const { data, isLoading } = useQuery({
        queryFn: () =>getFavouriteCountries (),
        queryKey: ['favoriteCountries'],
      })
      if (isLoading) return <h1>Loading...</h1>
      return (
        <>
        <h1>Favoritter</h1>
          <div className="card-container">
            {data?.map((c) => <CountryCard country={c} />)}
          </div>
        </>
      );
}
