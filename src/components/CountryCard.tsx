import { Country } from '../types'
import './CountryCard.css'

function CountryCard(props: { country: Country }) {
  return (
    <>
      <a href={'/info/' + props.country.cca3}>
        <div className="card" data-testid="country-card">
          <img src={props.country.flags.png} alt={props.country.name.common} />
          <p>{props.country.name.common}</p>
        </div>
      </a>
    </>
  )
}

export default CountryCard
