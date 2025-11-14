const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  return await response.json()

}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  }
  
  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  return await response.json()
}

const increaseVotes = async (anecdoteToUpdate) => {

  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1
  }
  const response = await fetch(`http://localhost:3001/anecdotes/${anecdoteToUpdate.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  })

  if (!response.ok) {
    throw new Error('Failed to increase votes')
  }
  return await response.json()
}

export default { getAll, createNew, increaseVotes }