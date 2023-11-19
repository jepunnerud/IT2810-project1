import { Link } from 'react-router-dom'
import { Country } from '../types'
import './CountryCard.css'

function CountryCard(props: { country: Country }) {
  return (
    <>
      <Link to={'/info/' + props.country.cca3}>
        <div data-testid="country-card" className="card">
          <img src={props.country.flags.png} alt={props.country.name.common} />
          <p>{props.country.name.common}</p>
        </div>
      </Link>
    </>
  )
}

export default CountryCard
