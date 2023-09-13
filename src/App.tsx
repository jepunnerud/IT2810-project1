
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
//our changesUse ours
import InfoPage from './pages/Info'
import FavouritesPage from './pages/Favourites'
//import AboutPage from './pages/About'
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
    text: 'About',
    path: '/about',
  },
]

function App() {
  return (
    <>
      <header>
        <NavBar items={navBarItems}></NavBar>
      </header>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="info" element={<InfoPage />}></Route>
            <Route path="favourites" element={<FavouritesPage />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
