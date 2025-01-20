import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import { Home, Game, Leaderboard } from './pages'

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
