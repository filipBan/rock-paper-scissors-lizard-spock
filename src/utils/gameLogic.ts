export type Choice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock'
export type Result = 'player1' | 'player2' | 'tie'

export interface Outcome {
  winner: Result
  reason?: string
}

const rules = new Map<Choice, Map<Choice, string>>([
  [
    'scissors',
    new Map([
      ['paper', 'cuts'],
      ['lizard', 'decapitates'],
    ]),
  ],
  [
    'paper',
    new Map([
      ['rock', 'covers'],
      ['spock', 'disproves'],
    ]),
  ],
  [
    'rock',
    new Map([
      ['scissors', 'crushes'],
      ['lizard', 'crushes'],
    ]),
  ],
  [
    'lizard',
    new Map([
      ['paper', 'eats'],
      ['spock', 'poisons'],
    ]),
  ],
  [
    'spock',
    new Map([
      ['scissors', 'smashes'],
      ['rock', 'vaporizes'],
    ]),
  ],
])

export function playGame(
  player1Choice: Choice,
  player2Choice: Choice
): Outcome {
  if (player1Choice === player2Choice) {
    return { winner: 'tie' }
  }

  const player1Beats = rules.get(player1Choice)
  if (player1Beats?.has(player2Choice)) {
    const action = player1Beats.get(player2Choice)
    return {
      winner: 'player1',
      reason: `${player1Choice} ${action} ${player2Choice}`,
    }
  }

  const player2Beats = rules.get(player2Choice)
  if (player2Beats?.has(player1Choice)) {
    const action = player2Beats.get(player1Choice)
    return {
      winner: 'player2',
      reason: `${player2Choice} ${action} ${player1Choice}`,
    }
  }

  throw new Error('Invalid game state')
}
