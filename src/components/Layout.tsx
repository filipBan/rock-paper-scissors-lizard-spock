import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="w-full h-screen ">
      <nav className="border-b border-base-300 navbar bg-base-200">
        <button className="mr-6 text-xl btn btn-ghost">
          <Link to="/">Home</Link>
        </button>

        <div className="gap-4">
          <button className="btn btn-link">
            <Link to="/game">Game</Link>
          </button>
          <button className="btn btn-link">
            <Link to="/leaderboard">Leaderboard</Link>
          </button>
        </div>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
