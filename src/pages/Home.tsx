import { useQuery } from '@tanstack/react-query'
import { Country } from '../types'
import CountryCard from '../components/CountryCard'

function HomePage() {
  async function getAllCountries(): Promise<Country[]> {
    const data = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,cca3,independent'
    ).then((response) => response.json())
    const countries: Country[] = data
    const filteredCountries: Country[] = countries.filter(
      (country: Country) => country.independent
    )
    const sortedCountries: Country[] = filteredCountries.sort((c1, c2) =>
      c1.name.common > c2.name.common ? 1 : -1
    )
    console.log(sortedCountries)
    return sortedCountries
  }

  const { data, isLoading } = useQuery({
    queryFn: () => getAllCountries(),
    queryKey: ['allCountries'],
  })

  if (isLoading) return <h1>Loading...</h1>
  return (
    <>
      <div className="card-container">
        {data?.map((c) => <CountryCard country={c} />)}
      </div>
    </>
  )
}

export default HomePage
