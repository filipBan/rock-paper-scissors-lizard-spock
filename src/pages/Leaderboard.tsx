import { useLeaderboardData } from '../utils/useLeaderboardData'

export function Leaderboard() {
  const { getLeaderboardData } = useLeaderboardData()

  const leaderboardData = getLeaderboardData()

  if (Object.keys(leaderboardData).length === 0) {
    return <div>No data</div>
  }

  return (
    <div>
      <h2>Leaderboard</h2>

      <div className="flex justify-center w-full overflow-x-auto">
        <table className="table text-lg max-w-32 md:max-w-lg">
          <thead>
            <tr>
              <th></th>
              <th>Player name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(leaderboardData).map(
              ([playerName, score], index) => (
                <tr key={playerName} className="hover">
                  <td>{index + 1}</td>
                  <td>{playerName}</td>
                  <td>{score}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
