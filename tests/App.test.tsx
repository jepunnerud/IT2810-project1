import { server } from './Handlers'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import HomePage from '../src/pages/Home' // assuming that App is located in the src folder
import { beforeEach, describe, expect, test, afterEach } from 'vitest'
import { QueryProvider } from './query-provider.tsx'

describe('Home Page Snapshot Test', () => {
  beforeEach(() => {
    server.listen()
  })

  afterEach(() => {
    server.close()
    sessionStorage.clear()
  })

  const renderHomePage = () => {
    return render(
      <QueryProvider>
        <HomePage />
      </QueryProvider>
    )
  }

  test('Alphabetic sorting', async () => {
    const alphabeticSorting = renderHomePage()
    //Ensure that the data has been loaded in before taking snapshot
    await waitFor(() => {
      screen.getAllByTestId('country-card')
    })
    expect(alphabeticSorting).toMatchSnapshot()
  })

  test('Population sorting', async () => {
    const populationSorting = renderHomePage()
    //Ensure that the data has been loaded in before taking snapshot
    await waitFor(() => {
      screen.getAllByTestId('country-card')
    })
    fireEvent.change(screen.getByTestId('sorting-parameter'), {
      target: { value: 'population' },
    })
    expect(populationSorting).toMatchSnapshot()
  })

  test('Searchbar', async () => {
    const searchbar = renderHomePage()
    //Ensure that the data has been loaded in before taking snapshot
    await waitFor(() => {
      screen.getAllByTestId('country-card')
    })

    fireEvent.change(screen.getByTestId('searchbar-input'), {
      target: { value: 'fi' },
    })
    await waitFor(() => {
      screen.getAllByTestId('country-card')
    })
    expect(searchbar).toMatchSnapshot()
  })
})
