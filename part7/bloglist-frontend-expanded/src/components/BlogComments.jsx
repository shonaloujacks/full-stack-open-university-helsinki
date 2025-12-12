import blogService from '../services/blogs'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const BlogComments = () => {
  const [commentText, setCommentText] = useState('')
  const queryClient = useQueryClient()

  const { id } = useParams()

  const blogQuery = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getById(id),
  })

  const addCommentMutation = useMutation({
    mutationFn: ({ id, commentText }) =>
      blogService.addComment(id, commentText),
    onSuccess: () => queryClient.invalidateQueries(['blogs', id]),
  })

  if (blogQuery.isLoading) return <div>Loading comments...</div>

  const blog = blogQuery.data
  const comments = blog.comments
  console.log(commentText)

  const handleAddComment = async (event) => {
    event.preventDefault()
    await addCommentMutation.mutateAsync({ id, commentText })
    setCommentText('')
  }

  return (
    <div>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          label="comment"
          value={commentText}
          onChange={({ target }) => setCommentText(target.value)}
        ></input>
        <button type="submit">Add comment</button>
      </form>
      <div>
        <h2>Comments</h2>
        {[...comments].map((comment) => (
          <li key={comment._id}>
            <b>{comment.text}</b>
            <p>{new Date(comment.date).toLocaleDateString('en-GB')}</p>
          </li>
        ))}
      </div>
    </div>
  )
}

export default BlogComments
