import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import GenreFilter from "./GenreFilter";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";

const Books = () => {
  const { data, loading } = useQuery(ALL_BOOKS);

  if (loading) {
    return (
      <div>
        <Typography variant="h6">loading...</Typography>
      </div>
    );
  }

  const books = data?.allBooks;

  if (!books) {
    return null;
  }

  return (
    <div>
      <Typography variant="h2" color="secondary">
        books
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="h5" color="secondary">
                  author
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" color="secondary">
                  published
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author.name}</TableCell>
                <TableCell>{book.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <GenreFilter />
    </div>
  );
};

export default Books;
