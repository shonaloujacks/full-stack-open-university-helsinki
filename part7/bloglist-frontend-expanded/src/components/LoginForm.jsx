import { TextField, Button } from '@mui/material'
const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <div>
      <h2>Login</h2>
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
