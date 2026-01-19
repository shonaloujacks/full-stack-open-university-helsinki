import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";
import BirthYearForm from "./BirthYearForm";
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

const Authors = ({ setError, setSuccess }) => {
  const { data, loading } = useQuery(ALL_AUTHORS);

  if (loading) {
    return (
      <div>
        <Typography variant="h6">loading...</Typography>
      </div>
    );
  }

  const authors = data?.allAuthors;

  if (!authors) {
    return null;
  }

  return (
    <div>
      <Typography variant="h2" color="secondary">
        authors
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 10 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="h5" color="secondary">
                  born
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" color="secondary">
                  books
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {authors.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.born}</TableCell>
                <TableCell>{a.bookCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BirthYearForm setError={setError} setSuccess={setSuccess} />
    </div>
  );
};

export default Authors;
