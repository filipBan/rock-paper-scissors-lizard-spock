import { ReactNode, useEffect } from 'react'

import { Choice, getGameResult } from '../../utils/gameLogic'
import { useGameState } from '../../utils/useGameState'
import { Rock, Paper, Scissors, Lizard, Spock } from '../../components'

const choices: Record<Choice, ReactNode> = {
  rock: <Rock />,
  paper: <Paper />,
  scissors: <Scissors />,
  lizard: <Lizard />,
  spock: <Spock />,
}

export function Game() {
  const {
    player1Name,
    player2Name,
    player1Choice,
    player2Choice,
    result,
    handleSetPlayerName,
    handleSetPlayerChoice,
    handleSetResult,
    handlePlayAgain,
    handleResetGame,
  } = useGameState()

  useEffect(() => {
    if (player1Choice && player2Choice && !result) {
      const result = getGameResult(player1Choice, player2Choice)

      handleSetResult(result)
    }
  }, [
    handleSetResult,
    player1Choice,
    player1Name,
    player2Choice,
    player2Name,
    result,
  ])

  const areButtonsDisabled = !player1Name || !player2Name

  const handleChoice = (choice: Choice) => {
    if (!player1Choice) {
      handleSetPlayerChoice('player1', choice)
    } else if (!player2Choice) {
      handleSetPlayerChoice('player2', choice)
    }
  }

  const getWinnerName = () => {
    if (result?.winner === 'player1') {
      return player1Name
    } else if (result?.winner === 'player2') {
      return player2Name
    }
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
            onChange={(e) => handleSetPlayerName('player1', e.target.value)}
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
            onChange={(e) => handleSetPlayerName('player2', e.target.value)}
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
          <button className="w-32 btn" onClick={handleResetGame}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
