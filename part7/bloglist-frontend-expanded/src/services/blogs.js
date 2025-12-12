import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log('Returned blog:', response.data)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const fetchUsers = async () => {
  const response = await axios.get('/api/users')
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addComment = async (id, commentText) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    text: commentText,
  })
  console.log('New comment:', response.data)
  return response.data
}

export default {
  getAll,
  create,
  setToken,
  update,
  deleteBlog,
  fetchUsers,
  getById,
  addComment,
}
