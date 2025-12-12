import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableHead,
  Typography,
} from '@mui/material'

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
      <Typography variant="h3">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Number of blogs created</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersList
