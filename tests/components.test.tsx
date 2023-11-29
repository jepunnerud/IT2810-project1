import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NavBar from '../src/components/NavBar'
import CountryCard from '../src/components/CountryCard'
import { NavBarItem } from '../src/types'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
const navBarItems: NavBarItem[] = [
  {
    text: 'Home',
    path: '/',
  },
  {
    text: 'Favourites',
    path: '/favourites',
  },
]
const mockCountry = {
  flags: {
    png: 'https://flagcdn.com/w320/us.png',
    svg: 'https://flagcdn.com/us.svg',
    alt: 'The flag of the United States of America is composed of thirteen equal horizontal bands of red alternating with white. A blue rectangle, bearing fifty small five-pointed white stars arranged in nine rows where rows of six stars alternate with rows of five stars, is superimposed in the canton.',
  },
  name: {
    common: 'United States',
    official: 'United States of America',
    nativeName: 'United States',
  },
  cca3: 'USA',
  independent: true,
  capital: 'Washington, D.C.',
  region: 'Americas',
  continents: 'Americas',
  area: 9372610,
  population: 329484123,
}

describe('Testing components', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <NavBar items={navBarItems}></NavBar>
        </MemoryRouter>
      </QueryClientProvider>
    )
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    )
  })

  test('navbar renders', () => {
    expect(screen.getByTestId('navbar-container')).toBeDefined
  })

  test('countrycard renders', () => {
    expect(screen.getByTestId('navbar-container')).toBeDefined
  })
})
