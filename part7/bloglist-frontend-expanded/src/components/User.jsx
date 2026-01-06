// components/User.jsx
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const User = () => {
  const { id } = useParams()

  // Get users from React Query cache
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: blogService.fetchUsers,
    initialData: [],
  })

  const users = usersQuery.data

  const user = users.find((user) => user.id === id)

  if (usersQuery.isLoading) return <div>Loading...</div>

  if (!user) return <div>User not found</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs added:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
