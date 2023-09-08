import { Country } from '../types'

function CountryCard(props: { country: Country }) {
  return (
    <>
      <div className="card">
        <img src={props.country.flags.png} alt={props.country.name.common} />
        <p>{props.country.name.common}</p>
      </div>
    </>
  )
}

export default CountryCard
