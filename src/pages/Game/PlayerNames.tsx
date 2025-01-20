import { useGameState } from '../../utils/store'
import { choices } from './choices'

export const PlayerNames = () => {
  const {
    player1Name,
    player2Name,
    player1Choice,
    player2Choice,
    setPlayerName,
  } = useGameState()

  return (
    <div className="flex flex-col items-center justify-center h-32 gap-2 p-4 sm:flex-row lg:gap-12 md:gap-8 sm:gap-4">
      <label className="flex items-center w-full max-w-64 md:max-w-xs input input-bordered">
        <input
          className="grow"
          type="text"
          placeholder="Player 1 name"
          value={player1Name}
          onChange={(e) => setPlayerName('player1', e.target.value)}
        />
        {player1Choice && (
          <div className="[&>svg]:w-6 text-slate-700">
            {choices[player1Choice]}
          </div>
        )}
      </label>

      <label className="flex items-center w-full max-w-64 md:max-w-xs input input-bordered">
        <input
          className="grow"
          type="text"
          placeholder="Player 2 name"
          value={player2Name}
          onChange={(e) => setPlayerName('player2', e.target.value)}
        />
        {player2Choice && (
          <div className="[&>svg]:w-6 text-slate-700">
            {choices[player2Choice]}
          </div>
        )}
      </label>
    </div>
  )
}
