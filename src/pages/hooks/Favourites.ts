import { useQuery } from '@tanstack/react-query'
import { Country } from '../../types'
import CountryCard from '../../components/CountryCard'



export async function getFavouriteCountries() {

  /*
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
    
    */

  const useQueryResult = useQuery({
    queryKey: ['favouriteCountries'],
    queryFn: async () => {
      const data = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,cca3,independent'
      ).then((res) => res.json());
      return data;
    },
  });
  return useQueryResult;
}