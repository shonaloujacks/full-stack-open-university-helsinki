import { useQuery } from "@apollo/client/react";
import { USER, ALL_BOOKS } from "../queries";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// get user's fav genre from the me query (set up in front end) then pass that value as a variable to the ALL_BOOKS query

const Recommendations = () => {
  const { data: userData, loading: userLoading } = useQuery(USER);
  console.log("userData LOADING", userLoading);

  const genre = userData?.me?.favoriteGenre;
  console.log("THIS IS GENRE", genre);

  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genres: [genre] },
    skip: !genre,
  });
  console.log("book LOADING", loading);
  if (userLoading)
    return (
      <div>
        <Typography variant="h6">loading...</Typography>
      </div>
    );

  console.log("userData", userData);

  const books = data?.allBooks;
  console.log("THIS IS BOOKS", books);
  if (loading) {
    return (
      <div>
        <Typography variant="h6">loading...</Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h3" color="secondary">
        recommendations
      </Typography>
      <Typography variant="h5" color="secondary">
        books in your favourite genre <b>{genre}</b>
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 10 }}>
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
    </div>
  );
};

export default Recommendations;
