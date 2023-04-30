import { Stack, TextField, Typography, Button } from "@mui/material";

export default function SearchPage() {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        maxWidth: "300px",
        mx: "auto",
        mt: "23vh",
        backgroundColor: "#FEFEFE",
        p: "5px",
        height: "400px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4">Search</Typography>
      <Stack spacing={4} sx={{ mt: 2 }}>
        <TextField variant="outlined" label="Id of the document"></TextField>
        <TextField variant="outlined" label="upload document"></TextField>
      </Stack>
      <Button sx={{ minWidth: "200px", mt: 8 }} variant="contained">
        Submit
      </Button>
    </Stack>
  );
}
