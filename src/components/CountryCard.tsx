import { Country } from '../types'
import { Link } from 'react-router-dom'
import './CountryCard.css'

function CountryCard(props: { country: Country }) {
  return (
    <Link to={`/info/${props.country.cca3}`} className="card-link">
      <div className="card">
        <img src={props.country.flags.png} alt={props.country.name.common} />
        <p>{props.country.name.common}</p>
      </div>
    </Link>
  )
}

export default CountryCard
