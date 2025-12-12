import { TextField, Button, Typography } from '@mui/material'
const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            id="username-input"
            data-testid="username-input"
            type="text"
            autoComplete="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            id="password-input"
            data-testid="password-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm
