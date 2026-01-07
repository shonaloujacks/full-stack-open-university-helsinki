import { useState } from "react";
import { ALL_BOOKS, CREATE_BOOK, ALL_AUTHORS } from "../queries.js";
import { useMutation, useQuery } from "@apollo/client/react";
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

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const { data } = useQuery(ALL_BOOKS);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS, ALL_AUTHORS }],
    onCompleted: (data) => {
      console.log("THIS IS NEW BOOK DATA", data.addBook);
    },
    onError: (error) => setError(error.message),
  });

  const submit = async (event) => {
    event.preventDefault();

    await createBook({
      variables: { title, author, published, genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");

    const books = data?.allBooks;
    console.log("THIS IS BOOK LIST AFTER NEW BOOK", books);
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h3" color="secondary" sx={{ pt: 4, pb: 2 }}>
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
          sx={{ justifyContent: "flex-start" }}
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
