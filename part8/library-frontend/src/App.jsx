import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useApolloClient, useSubscription } from "@apollo/client/react";
import { useState } from "react";
import Recommendations from "./components/Recommendations";
import LoginForm from "./components/LoginForm";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import { Toolbar, AppBar, Button, Container } from "@mui/material";
import { BOOK_ADDED } from "./queries";
import { addBookToCache } from "./utils/apolloCache";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token"),
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.data.bookAdded;
      console.log("This is data in subscription", data);
      addBookToCache(client.cache, newBook);
    },
  });

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.clearStore();
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
              {token && (
                <Button color="inherit" component={Link} to="/recommendations">
                  recommendations
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
            <Route path="/books" element={<Books setError={notifyError} />} />
            <Route
              path="/authors"
              element={
                <Authors setError={notifyError} setSuccess={notifySuccess} />
              }
            />
            <Route
              path="/addbook"
              element={
                token ? (
                  <NewBook setError={notifyError} setSuccess={notifySuccess} />
                ) : (
                  <Navigate replace to="/books" />
                )
              }
            />
            <Route
              path="/recommendations"
              element={
                token ? <Recommendations /> : <Navigate replace to="/books" />
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
