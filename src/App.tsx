import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Game } from './pages/Game'
import { Leaderboard } from './pages/Leaderboard'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  )
}

export default App
