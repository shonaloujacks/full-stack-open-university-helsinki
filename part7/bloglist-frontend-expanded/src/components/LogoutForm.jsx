import { Button } from '@mui/material'

const LogoutForm = ({ handleLogout }) => {
  return (
    <div>
      <label>
        <Button
          data-testid="logout-button"
          color="white"
          onClick={handleLogout}
          variant="outlined"
          size="small"
        >
          Logout
        </Button>
      </label>
    </div>
  )
}

export default LogoutForm
