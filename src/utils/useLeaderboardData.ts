import { useEffect, useState } from 'react'

type LeaderboardData = Record<string, number>

export const useLeaderboardData = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({})

  useEffect(() => {
    const data = getLeaderboardData()
    setLeaderboardData(data)
  }, [])

  const getLeaderboardData = (): LeaderboardData => {
    const data: string | null = sessionStorage.getItem('leaderboard')
    if (data) {
      try {
        return JSON.parse(data)
      } catch (error) {
        console.error('Error parsing leaderboard data', error)
      }
    }
    return {}
  }

  const saveLeaderboardData = async (data: LeaderboardData) => {
    sessionStorage.setItem('leaderboard', JSON.stringify(data))
  }

  const clearLeaderboardData = async () => {
    setLeaderboardData({})
    sessionStorage.removeItem('leaderboard')
  }

  const addPoint = async (playerName: string) => {
    const leaderboardData = getLeaderboardData()
    leaderboardData[playerName] = (leaderboardData[playerName] || 0) + 1
    await saveLeaderboardData(leaderboardData)
  }

  return { leaderboardData, clearLeaderboardData, addPoint }
}
