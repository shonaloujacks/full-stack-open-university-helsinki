import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import LogoutForm from "./components/LogoutForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch {
        setErrorMessage("Failed to fetch blogs");
      }
    };
    getBlogs();
  }, []);
ss
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      console.log(user);
    }
  }, []);

  console.log(user);

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(`Blog '${blogObject.title}' added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch {
      setErrorMessage(`Blog '${blogObject.title}' could not be added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="success">{message}</div>;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser("");
    console.log("Logged out user:", user);
  };

  const blogForm = () => (
    <Togglable buttonLabel="Create new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const handleBlogDelete = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    console.log(
      "Blog to delete:",
      blogToDelete,
      "USER.NAME",
      user.name,
      "blogToDelete.user.name",
      blogToDelete.user.name,
    );
    if (window.confirm(`Delete ${blogToDelete.title}?`))
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((blogToDelete) => blogToDelete.id !== id));
        setSuccessMessage(`${blogToDelete.title} has been deleted`);
      } catch {
        setErrorMessage(`${blogToDelete.title} has already been removed`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
  };

  const updateLikes = async (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id);
    const updatedEntry = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    console.log("BLOG TO UPDATE", blogToUpdate);

    try {
      await blogService.update(blogToUpdate.id, updatedEntry);
      setBlogs(
        blogs.map((blog) =>
          blog.id === blogToUpdate.id ? updatedEntry : blog,
        ),
      );
    } catch {
      setErrorMessage(`${blogToUpdate.title} could not be liked`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in </p>
          <LogoutForm handleLogout={handleLogout} />
          <h2>Blogs</h2>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={handleBlogDelete}
              name={user.name}
              updateLikes={updateLikes}
            />
          ))}
          {blogForm()}
        </div>
      )}
    </div>
  );
};
export default App;
