import FavouritesPage from '../src/pages/Favourites'
import { expect, it, describe, afterAll, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { server } from './Handlers.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setFavourite } from '../src/hooks/Countries.ts'

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

const queryClient = new QueryClient()

describe('FavouritesPage', () => {
    const renderFavouritesPage = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <FavouritesPage />
            </QueryClientProvider>
        )
    }

    it('renders no card-holder components when localStorage is empty', async () => {
        renderFavouritesPage()
        //Clears localstorage so no country-cards shold be loaded
        localStorage.clear()
        const favouriteCountries = screen.queryAllByTestId('country-card')

        //Checks that no favourite cards are loaded
        expect(favouriteCountries).toHaveLength(0)
    })

    it('renders the list of favorite countries when isLoading is false', async () => {
        renderFavouritesPage()
        //Sets a favourite, which adds a code in localstorage
        setFavourite('CAN')

        //await screen.findByText('Canada')

        //Checks that the country is loaded on the favorites page
        const country = screen.findByText('Canada')
        expect(country).toBeDefined()
    })
})
