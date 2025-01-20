import { Choice } from '../../utils/gameLogic'
import { useGameState } from '../../utils/store'
import { choices } from './choices'

export const ChoiceList = () => {
  const {
    player1Name,
    player2Name,
    player1Choice,
    player2Choice,
    setPlayerChoice,
  } = useGameState()

  const areButtonsDisabled = !player1Name || !player2Name

  const handleChoice = (choice: Choice) => {
    if (!player1Choice) {
      setPlayerChoice('player1', choice)
    } else if (!player2Choice) {
      setPlayerChoice('player2', choice)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-wrap justify-center w-full gap-4 max-w-64 sm:max-w-full">
        {Object.entries(choices).map(([name, component]) => (
          <div className="tooltip" data-tip={name} key={name}>
            <button
              className="btn btn-primary w-16 h-16 [&>svg]:w-8"
              disabled={areButtonsDisabled}
              onClick={() => handleChoice(name as Choice)}
            >
              {component}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
