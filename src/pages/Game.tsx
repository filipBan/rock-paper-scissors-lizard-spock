import { ReactNode, useEffect, useState } from 'react'
import { Lizard } from '../components/icons/Lizard'
import { Paper } from '../components/icons/Paper'
import { Rock } from '../components/icons/Rock'
import { Scissors } from '../components/icons/Scissors'
import { Spock } from '../components/icons/Spock'
import { Choice, Outcome, playGame } from '../utils/gameLogic'
import { useLeaderboardData } from '../utils/useLeaderboardData'

const choices: Record<Choice, ReactNode> = {
  rock: <Rock />,
  paper: <Paper />,
  scissors: <Scissors />,
  lizard: <Lizard />,
  spock: <Spock />,
}

export function Game() {
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [player1Choice, setPlayer1Choice] = useState<Choice | null>()
  const [player2Choice, setPlayer2Choice] = useState<Choice | null>()
  const [result, setResult] = useState<Outcome | null>(null)
  const { addPoint } = useLeaderboardData()

  useEffect(() => {
    if (player1Choice && player2Choice && !result) {
      const result = playGame(player1Choice, player2Choice)

      setResult(result)

      if (result.winner === 'player1') {
        addPoint(player1Name)
      } else if (result.winner === 'player2') {
        addPoint(player2Name)
      }
    }
  }, [addPoint, player1Choice, player1Name, player2Choice, player2Name, result])

  const areButtonsDisabled = !player1Name || !player2Name

  const handleChoice = (choice: Choice) => {
    if (!player1Choice) {
      setPlayer1Choice(choice)
    } else if (!player2Choice) {
      setPlayer2Choice(choice)
    }
  }

  const getWinnerName = () => {
    if (result?.winner === 'player1') {
      return player1Name
    } else if (result?.winner === 'player2') {
      return player2Name
    }
  }

  const handlePlayAgain = () => {
    setPlayer1Choice(null)
    setPlayer2Choice(null)
    setResult(null)
  }

  const handleReset = () => {
    setPlayer1Name('')
    setPlayer2Name('')
    setPlayer1Choice(null)
    setPlayer2Choice(null)
    setResult(null)
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-32 gap-2 p-4 sm:flex-row lg:gap-12 md:gap-8 sm:gap-4">
        <label className="flex items-center w-full max-w-64 md:max-w-xs input input-bordered">
          <input
            className="grow"
            type="text"
            placeholder="Player 1 name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
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
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
          {player2Choice && (
            <div className="[&>svg]:w-6 text-slate-700">
              {choices[player2Choice]}
            </div>
          )}
        </label>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap justify-center gap-4 max-w-64 sm:max-w-full">
          {Object.entries(choices).map(([name, component]) => (
            <button
              key={name}
              className="btn btn-primary w-16 h-16 [&>svg]:w-8"
              disabled={areButtonsDisabled}
              onClick={() => handleChoice(name as Choice)}
            >
              {component}
            </button>
          ))}
        </div>

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

        <div className="flex gap-4">
          <button
            className="w-32 btn"
            onClick={handlePlayAgain}
            disabled={!result}
          >
            Play again
          </button>
          <button className="w-32 btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
