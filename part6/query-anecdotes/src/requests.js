const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      return await response.json()
    }