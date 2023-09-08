import { Country } from '../types'

function CountryCard(props: { country: Country }) {
  return (
    <>
      <a href="/">
        <div className="card">
          <img src={props.country.flags.png} alt={props.country.name.common} />
          <p>{props.country.name.common}</p>
        </div>
      </a>
    </>
  )
}

export default CountryCard
