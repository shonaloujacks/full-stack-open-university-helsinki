import { AppBar, Toolbar, Button } from "@mui/material";

const GenreFilter = ({ setGenre }) => {
  return (
    <div>
      <AppBar
        color="transparent"
        position="fixed"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <Button variant="contained" onClick={() => setGenre("refactoring")}>
            refactoring
          </Button>
          <Button variant="contained" onClick={() => setGenre("agile")}>
            agile
          </Button>
          <Button variant="contained" onClick={() => setGenre("patterns")}>
            patterns
          </Button>
          <Button variant="contained" onClick={() => setGenre("design")}>
            design
          </Button>
          <Button variant="contained" onClick={() => setGenre("crime")}>
            crime
          </Button>
          <Button variant="contained" onClick={() => setGenre("classic")}>
            classic
          </Button>
          <Button variant="contained" onClick={() => setGenre("")}>
            all genres
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default GenreFilter;
