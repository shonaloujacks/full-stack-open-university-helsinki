const LogoutForm = ({ handleLogout }) => {
    
  return (
    <div>
      <label>
        <button onClick={handleLogout}>Logout</button>
      </label>
    </div>
  )
}


export default LogoutForm;