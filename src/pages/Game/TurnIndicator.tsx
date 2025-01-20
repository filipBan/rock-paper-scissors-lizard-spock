import { useGameState } from '../../utils/store'

export const TurnIndicator = () => {
  const { player1Name, player2Name, player1Choice, player2Choice } =
    useGameState()

  const getTurn = () => {
    if (!player1Name || !player2Name) {
      return 'Enter player names'
    } else if (!player1Choice) {
      return `${player1Name}'s turn`
    } else if (!player2Choice) {
      return `${player2Name}'s turn`
    }
  }

  return (
    <div className="h-12">
      <p className="text-xl">{getTurn()}</p>
    </div>
  )
}
