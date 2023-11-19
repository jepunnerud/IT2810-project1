import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCountry } from '../hooks/Countries'
import '../utils/Loader.css'
import './Info.css'
import { Country } from '../types'

export default function InfoPage() {
  const { countryCode = '' } = useParams<{ countryCode?: string }>()
  const [isFavourite, setIsFavourite] = useState(false)
  const [message, setMessage] = useState('')
  const { data, isLoading } = useCountry(countryCode)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const breakPoint = 1024

  const storedFavourites = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  )

  // This useEffect is used to re-render the page when the url changes. This is used because React's Link component doesn't automatically do this.
  useEffect(() => {
    const handleUrlChange = () => {
      window.location.reload()
    }

    // Listen for changes in the pathname
    const currentPathname = window.location.pathname
    const intervalId = setInterval(() => {
      if (window.location.pathname !== currentPathname) {
        handleUrlChange()
        clearInterval(intervalId)
      }
    })

    // Cleanup the interval when the component is unmounted
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    // Update the window width whenever the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    // Add a window resize event listener
    window.addEventListener('resize', handleResize)
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [windowWidth])

  const countryOrder = JSON.parse(localStorage.getItem('countryOrder') || '[]')
  const currentCountryIndex = countryOrder.indexOf(countryCode)

  useEffect(() => {
    setIsFavourite(storedFavourites.includes(countryCode))
    setMessage(
      storedFavourites.includes(countryCode)
        ? 'Remove from favourites'
        : 'Add to favourites'
    )
  }, [storedFavourites, countryCode])

  function handleOnClick() {
    if (!isFavourite) {
      storedFavourites.push(countryCode)
      localStorage.setItem('favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
    } else {
      const newList: string[] = storedFavourites.filter(
        (code: string) => code !== countryCode
      )
      localStorage.setItem('favourites', JSON.stringify(newList))
      setIsFavourite(false)
    }
  }

  function handleBackButton() {
    if (currentCountryIndex != null && currentCountryIndex > 0) {
      return '' + countryOrder[currentCountryIndex - 1]
    } else if (countryCode != null) {
      return '' + countryCode
    }
    return ''
  }

  function handleForwardButton() {
    if (
      currentCountryIndex != null &&
      currentCountryIndex < countryOrder.length - 1
    ) {
      return '' + countryOrder[currentCountryIndex + 1]
    } else if (countryCode != null) {
      return '' + countryCode
    }
    return ''
  }

  if (isLoading) return <span className="loader"></span>

  const country: Country = data[0]

  return (
    <div className="info-page-container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <h1>{country.name.common}</h1>
      {windowWidth <= breakPoint && (
        <div className="mobile-arrows">
          <Link
            to={`/info/${handleBackButton()}`}
            className={`material-symbols-outlined arrow`}
          >
            arrow_back_ios
          </Link>
          <Link
            to={`/info/${handleForwardButton()}`}
            className={`material-symbols-outlined arrow`}
          >
            arrow_forward_ios
          </Link>
        </div>
      )}
      <div className="content-parent">
        {windowWidth > breakPoint && (
          <Link
            to={`/info/${handleBackButton()}`}
            className={`material-symbols-outlined arrow`}
          >
            arrow_back_ios
          </Link>
        )}
        <div className="flag-button-container">
          <img src={country.flags.png} alt={country.name.common} />
          {<button onClick={handleOnClick}>{message}</button>}
        </div>
        <div className="info-card">
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <p>Continent: {country.region}</p>
          <p>Area: {country.area}</p>
        </div>
        {windowWidth > breakPoint && (
          <Link
            to={`/info/${handleForwardButton()}`}
            className={`material-symbols-outlined arrow`}
          >
            arrow_forward_ios
          </Link>
        )}
      </div>
    </div>
  )
}
