import { useState } from "react";
import { ALL_BOOKS, CREATE_BOOK, ALL_AUTHORS } from "../queries.js";
import { useMutation } from "@apollo/client/react";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { addBookToCache } from "../utils/apolloCache";

const NewBook = ({ setError, setSuccess }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onCompleted: (data) => {
      console.log("THIS IS NEW BOOK DATA", data.addBook);
      setSuccess(`${data?.addBook.title} added!`);
    },
    onError: (error) => {
      setError(error.message);
      setTitle("");
      setPublished("");
      setAuthor("");
      setGenres([]);
      setGenre("");
    },
    update: (cache, response) => {
      const newBook = response.data.addBook;
      console.log("THIS IS RESPONSE in NewBook", response);
      addBookToCache(cache, newBook);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    try {
      await createBook({
        variables: { title, author, published, genres },
      });
    } catch (error) {
      setError(error.message);
    }

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h3" color="secondary" sx={{ pt: 3, pb: 3 }}>
        add new book
      </Typography>
      <Box
        component="form"
        onSubmit={submit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          label="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <TextField
          label="published"
          type="number"
          value={published}
          onChange={({ target }) => setPublished(Number(target.value))}
        />
        <TextField
          label="genre"
          value={genre}
          onChange={({ target }) => setGenre(target.value)}
        />
        <Button
          onClick={addGenre}
          type="button"
          sx={{ alignSelf: "flex-start" }}
          variant="outlined"
        >
          add genre
        </Button>
        <Typography variant="body1" color="primary">
          genres: {genres.join(" ")}
        </Typography>
        <Button type="submit" variant="contained">
          create book
        </Button>
      </Box>
    </Box>
  );
};

export default NewBook;
