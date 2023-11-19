import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import InfoPage from './pages/Info'
import FavouritesPage from './pages/Favourites'
import NavBar from './components/NavBar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavBarItem } from './types'

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

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/project1">
          <header>
            <NavBar items={navBarItems}></NavBar>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/info/:countryCode" element={<InfoPage />}></Route>
            <Route path="/favourites" element={<FavouritesPage />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
