import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import InfoPage from './pages/Info'
import FavouritesPage from './pages/Favourites'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
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
