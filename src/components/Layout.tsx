import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="w-full h-screen ">
      <nav className="navbar bg-base-200">
        <button className="mr-6 text-xl btn btn-ghost">
          <Link to="/">Home</Link>
        </button>

        <div className="gap-4">
          <Link to="/game">Game</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </div>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
