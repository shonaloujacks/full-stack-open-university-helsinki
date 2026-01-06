import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      return state.push(action.payload)
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    likeBlog(state, action) {
      const id = action.payload
      const blog = state.find((blog) => blog.id === id)
      if (blog) {
        blog.likes += 1
      }
    },
  },
})

const { setBlogs, createBlog, deleteBlog, likeBlog } = blogSlice.actions

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(createBlog(newBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const increaseLikes = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const blogToUpdate = state.blogs.find((blog) => blog.id === id)
    await blogService.update(id, { likes: blogToUpdate.likes + 1 })
    dispatch(likeBlog(id))
  }
}

export default blogSlice.reducer
