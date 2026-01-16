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

const Recommendations = () => {
  return (
    <div>
      <Typography variant="h3" color="secondary">
        books in your favourite genre
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
            <TableRow>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Recommendations;
