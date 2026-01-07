import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from "../queries";
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

const BirthYearForm = () => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: (data) => {
      console.log("THIS IS NEW BIRTH YEAR DATA", data.editAuthor);
    },
  });

  const { data, loading } = useQuery(ALL_AUTHORS);

  if (loading || !data) {
    return <Typography>Loading authors...</Typography>;
  }

  const authorsWithNoBirthYear = data.allAuthors.filter(
    (author) => author.born === null,
  );

  const submit = async (event) => {
    event.preventDefault();

    await editBirthYear({
      variables: { name, setBornTo: Number(birthYear) },
    });

    setName("");
    setBirthYear("");
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h4" color="secondary" sx={{ pt: 4, pb: 2 }}>
        Set birth year
      </Typography>

      <Box
        component="form"
        onSubmit={submit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl fullWidth>
          <InputLabel id="author-label">Author</InputLabel>
          <Select
            labelId="author-label"
            id="author"
            name="name"
            value={name}
            label="Author"
            onChange={(event) => setName(event.target.value)}
          >
            <MenuItem value="" disabled>
              Select an author
            </MenuItem>
            {authorsWithNoBirthYear.map((author) => (
              <MenuItem key={author.id} value={author.name}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Birth year"
          type="number"
          value={birthYear}
          onChange={(event) => setBirthYear(event.target.value)}
          fullWidth
        />

        <Button type="submit" variant="contained">
          Update author
        </Button>
      </Box>
    </Box>
  );
};

export default BirthYearForm;
