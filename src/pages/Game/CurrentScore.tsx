import { useGameState } from '../../utils/store'
import { TurnIndicator } from './TurnIndicator'

export const CurrentScore = () => {
  const { player1Name, player2Name, currentScore } = useGameState()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <TurnIndicator />

      <div className="flex flex-col items-center justify-center h-8 gap-2 mb-4">
        {currentScore ? (
          <p className="text-2xl">
            {player1Name} {currentScore?.[player1Name] ?? 0} vs{' '}
            {currentScore?.[player2Name] ?? 0} {player2Name}
          </p>
        ) : null}
      </div>
    </div>
  )
}
