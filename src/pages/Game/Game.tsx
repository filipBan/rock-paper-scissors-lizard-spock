import { useEffect } from 'react'

import { getGameResult } from '../../utils/gameLogic'
import { useGameState } from '../../utils/store'
import { PlayerNames } from './PlayerNames'
import { ChoiceList } from './ChoiceList'
import { Result } from './Result'
import { Controls } from './Controls'
import { useLeaderboardData } from '../../utils/useLeaderboardData'
import { CurrentScore } from './CurrentScore'

export function Game() {
  const {
    player1Name,
    player2Name,
    player1Choice,
    player2Choice,
    result,
    setResult,
    currentScore,
    setCurrentScore,
  } = useGameState()
  const { addPoint } = useLeaderboardData()

  useEffect(() => {
    if (player1Choice && player2Choice && !result) {
      const result = getGameResult(player1Choice, player2Choice)

      setResult(result)

      if (result.winner === 'player1') {
        addPoint(player1Name)
        setCurrentScore({
          ...currentScore,
          [player1Name]: (currentScore?.[player1Name] ?? 0) + 1,
        })
      } else if (result.winner === 'player2') {
        addPoint(player2Name)
        setCurrentScore({
          ...currentScore,
          [player2Name]: (currentScore?.[player2Name] ?? 0) + 1,
        })
      }
    }
  }, [
    setResult,
    player1Choice,
    player1Name,
    player2Choice,
    player2Name,
    result,
    addPoint,
    setCurrentScore,
    currentScore,
  ])

  return (
    <div>
      <PlayerNames />

      <div className="flex flex-col items-center justify-center gap-4 mt-4">
        <CurrentScore />
        <ChoiceList />
        <Result />
        <Controls />

        <img
          className="max-w-sm"
          src="/RPSLS.webp"
          alt="Rock paper scissors lizard spock diagram"
        />
      </div>
    </div>
  )
}
