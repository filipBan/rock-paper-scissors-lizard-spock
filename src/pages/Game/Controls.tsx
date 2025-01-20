import { useGameState } from '../../utils/store'

export const Controls = () => {
  const { result, playAgain, resetGame } = useGameState()

  return (
    <div className="flex gap-4 mb-4">
      <button className="w-32 btn" onClick={playAgain} disabled={!result}>
        Play again
      </button>
      <button className="w-32 btn" onClick={resetGame}>
        Reset
      </button>
    </div>
  )
}
