import { AppBar, Toolbar, Button } from "@mui/material";

const GenreFilter = () => {
  return (
    <div>
      <AppBar
        color="transparent"
        position="fixed"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <Button variant="contained">refactoring</Button>
          <Button variant="contained">agile</Button>
          <Button variant="contained">patterns</Button>
          <Button variant="contained">design</Button>
          <Button variant="contained">crime</Button>
          <Button variant="contained">classic</Button>
          <Button variant="contained">all genres</Button>
        </Toolbar>
      </AppBar>
      ;
    </div>
  );
};

export default GenreFilter;
