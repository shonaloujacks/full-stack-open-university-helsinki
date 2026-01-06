import blogService from '../services/blogs'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Typography, Button, TextField } from '@mui/material'

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
      <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
        Comments
      </Typography>
      <form onSubmit={handleAddComment}>
        <TextField
          type="text"
          label="comment"
          value={commentText}
          onChange={({ target }) => setCommentText(target.value)}
          sx={{ mb: 3 }}
        ></TextField>
        <Button type="submit" sx={{ mt: 1 }}>
          Add comment
        </Button>
      </form>
      <div>
        {[...comments].map((comment) => (
          <div key={comment._id}>
            <Typography>
              <b>{comment.text}</b>
            </Typography>
            <Typography sx={{ mb: 3 }}>
              {new Date(comment.date).toLocaleDateString('en-GB')}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogComments
