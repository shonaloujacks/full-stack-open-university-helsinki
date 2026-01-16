import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useApolloClient } from "@apollo/client/react";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import { Toolbar, AppBar, Button, Container } from "@mui/material";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token"),
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const client = useApolloClient();

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const notifySuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 10000);
  };

  console.log("THIS IS TOKEN", token);

  return (
    <Router>
      <Container>
        <div>
          <Notify errorMessage={errorMessage} successMessage={successMessage} />
          <AppBar position="static" sx={{ backgroundColor: "primary" }}>
            <Toolbar>
              <Button color="inherit" component={Link} to="/authors">
                authors
              </Button>
              <Button color="inherit" component={Link} to="/books">
                books
              </Button>
              {token && (
                <Button color="inherit" component={Link} to="/addbook">
                  add book
                </Button>
              )}
              {token ? (
                <Button
                  color="inherit"
                  onClick={onLogout}
                  variant="outlined"
                  sx={{ ml: "auto" }}
                >
                  logout
                </Button>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{ ml: "auto" }}
                >
                  login
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route
              path="/authors"
              element={
                <Authors setError={notifyError} setSuccess={notifySuccess} />
              }
            />
            <Route
              path="/addbook"
              element={
                <NewBook setError={notifyError} setSuccess={notifySuccess} />
              }
            />
            <Route
              path="/login"
              element={
                token ? (
                  <Navigate replace to="/books" />
                ) : (
                  <LoginForm setToken={setToken} setError={notifyError} />
                )
              }
            />
          </Routes>
        </div>
      </Container>
    </Router>
  );
};

export default App;
