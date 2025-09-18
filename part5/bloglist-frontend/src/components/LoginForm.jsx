const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label>
            username
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
            password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm
