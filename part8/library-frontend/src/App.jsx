import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import { Toolbar, AppBar, Button, Container } from "@mui/material";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  return (
    <Router>
      <Container>
        <div>
          <Notify errorMessage={errorMessage} />
          <AppBar position="static" sx={{ backgroundColor: "primary" }}>
            <Toolbar>
              <Button color="inherit" component={Link} to="/authors">
                authors
              </Button>
              <Button color="inherit" component={Link} to="/books">
                books
              </Button>
              <Button color="inherit" component={Link} to="/addbook">
                add book
              </Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/addbook" element={<NewBook setError={notify} />} />
          </Routes>
        </div>
      </Container>
    </Router>
  );
};

export default App;
