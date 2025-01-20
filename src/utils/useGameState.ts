import { useEffect, useState } from 'react'
import { Choice, Outcome } from './gameLogic'
import { useLeaderboardData } from './useLeaderboardData'

export const useGameState = () => {
  const { addPoint } = useLeaderboardData()

  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [player1Choice, setPlayer1Choice] = useState<Choice | null>(null)
  const [player2Choice, setPlayer2Choice] = useState<Choice | null>(null)
  const [result, setResult] = useState<Outcome | null>(null)

  useEffect(() => {
    const savedGameData = sessionStorage.getItem('rpsls_game_data')

    try {
      if (savedGameData) {
        const {
          player1Name,
          player2Name,
          player1Choice,
          player2Choice,
          result,
        } = JSON.parse(savedGameData)

        setPlayer1Name(player1Name)
        setPlayer2Name(player2Name)
        setPlayer1Choice(player1Choice)
        setPlayer2Choice(player2Choice)
        setResult(result)
      }
    } catch {
      console.error('Error parsing game data')
    }
  }, [])

  interface SaveData {
    [key: string]: string | Outcome | null
  }

  const saveDataInSessionStorage = (newData: SaveData) => {
    const savedGameData = sessionStorage.getItem('rpsls_game_data')

    if (savedGameData) {
      try {
        const data = JSON.parse(savedGameData)
        sessionStorage.setItem(
          'rpsls_game_data',
          JSON.stringify({
            ...data,
            ...newData,
          })
        )
      } catch {
        console.error('Error parsing game data')
      }
    } else {
      sessionStorage.setItem('rpsls_game_data', JSON.stringify(newData))
    }
  }

  const savePlayerNameInSessionStorage = (
    player: 'player1' | 'player2',
    name: string
  ) => {
    saveDataInSessionStorage({ [`${player}Name`]: name })
  }

  const savePlayerChoiceInSessionStorage = (
    player: 'player1' | 'player2',
    choice: Choice | null
  ) => {
    saveDataInSessionStorage({ [`${player}Choice`]: choice })
  }

  const handleSetPlayerName = (player: 'player1' | 'player2', name: string) => {
    if (player === 'player1') {
      setPlayer1Name(name)
    } else {
      setPlayer2Name(name)
    }
    savePlayerNameInSessionStorage(player, name)
  }

  const handleSetPlayerChoice = (
    player: 'player1' | 'player2',
    choice: Choice | null
  ) => {
    if (player === 'player1') {
      setPlayer1Choice(choice)
    } else {
      setPlayer2Choice(choice)
    }
    savePlayerChoiceInSessionStorage(player, choice)
  }

  const handleSetResult = (result: Outcome | null) => {
    setResult(result)
    saveDataInSessionStorage({ result })
    if (result) {
      addPoint(result?.winner === 'player1' ? player1Name : player2Name)
    }
  }

  const handlePlayAgain = () => {
    setPlayer1Choice(null)
    setPlayer2Choice(null)
    handleSetPlayerChoice('player1', null)
    handleSetPlayerChoice('player2', null)
    handleSetResult(null)
  }

  const handleResetGame = () => {
    setPlayer1Name('')
    setPlayer2Name('')
    setPlayer1Choice(null)
    setPlayer2Choice(null)
    setResult(null)
    sessionStorage.removeItem('rpsls_game_data')
  }

  return {
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
  }
}
