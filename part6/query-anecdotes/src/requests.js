const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseURL)
      if (!response.ok) {
        throw new Error('Failed to fetch anecdote')
      }
      return await response.json()
    }

  export const createAnecdote = async (newAnecdote) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newAnecdote)
    }

    const response = await fetch(baseURL, options)

    if (!response.ok) {
      throw new Error('Failed to create anecdote')
    }
    return await response.json();
  }