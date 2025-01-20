import { type Choice } from '../../utils/gameLogic'
import { Rock, Paper, Scissors, Lizard, Spock } from '../../components'
import { type ReactNode } from 'react'

export const choices: Record<Choice, ReactNode> = {
  rock: <Rock />,
  paper: <Paper />,
  scissors: <Scissors />,
  lizard: <Lizard />,
  spock: <Spock />,
}
