import { Typography, Box } from "@mui/material";
const Notify = ({ errorMessage, successMessage }) => {
  if (errorMessage) {
    return (
      <Box
        component="section"
        sx={{
          backgroundColor: "white",

          mb: 2,
        }}
      >
        <Typography style={{ color: "red" }} sx={{ pt: 4, pb: 2 }}>
          {errorMessage}
        </Typography>
      </Box>
    );
  }
  if (successMessage) {
    return (
      <Box
        component="section"
        sx={{
          backgroundColor: "white",

          mb: 2,
        }}
      >
        <Typography style={{ color: "green" }} sx={{ pt: 4, pb: 2 }}>
          {successMessage}
        </Typography>
      </Box>
    );
  }
};

export default Notify;
