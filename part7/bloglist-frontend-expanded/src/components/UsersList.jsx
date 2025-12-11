import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: blogService.fetchUsers,
    initialData: [],
  })

  const users = usersQuery.data

  if (usersQuery.isLoading) return <div>Loading users...</div>
  if (usersQuery.isError) return <div>Users not availble</div>

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              {user.name} — blogs created: {user.blogs.length}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
