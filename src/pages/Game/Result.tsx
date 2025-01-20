import { useGameState } from '../../utils/store'

export const Result = () => {
  const { player1Name, player2Name, result } = useGameState()

  const getWinnerName = () => {
    if (result?.winner === 'player1') {
      return player1Name
    } else if (result?.winner === 'player2') {
      return player2Name
    }
  }

  return (
    <div className="h-32">
      {result && (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          {result.winner === 'tie' ? (
            <p className="text-2xl">It's a tie!</p>
          ) : (
            <p className="text-2xl">Winner is {getWinnerName()}!</p>
          )}
          {result.reason && <p className="text-xl">{result.reason}</p>}
        </div>
      )}
    </div>
  )
}
