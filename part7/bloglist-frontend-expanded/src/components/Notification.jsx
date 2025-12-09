const LogoutForm = ({ handleLogout }) => {
  return (
    <div>
      <label>
        <button data-testid="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </label>
    </div>
  )
}

export default LogoutForm
