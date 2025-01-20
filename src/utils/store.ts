import { create } from 'zustand'
import type { Choice, Outcome, Player } from './gameLogic'
import { persist, createJSONStorage } from 'zustand/middleware'

type CurrentScore = Record<string, number>

type Store = {
  player1Name: string
  player2Name: string
  player1Choice: Choice | null
  player2Choice: Choice | null
  result: Outcome | null
  currentScore: CurrentScore | null
  setCurrentScore: (score: CurrentScore) => void
  setPlayerName: (player: Player, name: string) => void
  setPlayerChoice: (player: Player, choice: Choice | null) => void
  setResult: (result: Outcome | null) => void
  playAgain: () => void
  resetGame: () => void
}

export const useGameState = create<Store>()(
  persist(
    (set) => ({
      player1Name: '',
      player2Name: '',
      player1Choice: null,
      player2Choice: null,
      result: null,
      currentScore: null,
      setCurrentScore: (score) => set({ currentScore: score }),
      setPlayerName: (player, name) => set({ [`${player}Name`]: name }),
      setPlayerChoice: (player, choice) => set({ [`${player}Choice`]: choice }),
      setResult: (result) => set({ result }),
      playAgain: () => {
        set({ player1Choice: null, player2Choice: null, result: null })
      },
      resetGame: () => {
        set({
          player1Name: '',
          player2Name: '',
          player1Choice: null,
          player2Choice: null,
          result: null,
          currentScore: null,
        })
      },
    }),
    {
      name: 'rpsls_game_data',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
