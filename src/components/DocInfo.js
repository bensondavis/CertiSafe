import { Stack, TextField, Typography } from "@mui/material";

const DocInfo = ({
  name,
  details,
  issue,
  setName,
  setDetails,
  setIssue,
}) => {

  return (
    <Stack
      spacing={3}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      sx={{ mb: 4 }}
    >
      <Stack
        spacing={1}
        direction={"column"}
        alignItems={"flex-start"}
        sx={{ mt: 5 }}
      >
        <Typography>Enter Name in the document</Typography>
        <TextField
          label="Name"
          value={name}
          sx={{ width: "350px" }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></TextField>
      </Stack>

      {/* <Stack spacing={1} direction={"column"} alignItems={"flex-start"}>
        <Typography>Enter Email of the document owner</Typography>
        <TextField
          label="Email"
          value={email}
          sx={{ width: "350px" }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></TextField>
      </Stack> */}

      <Stack spacing={1} direction={"column"} alignItems={"flex-start"}>
        <Typography>Enter details in the document</Typography>
        <TextField
          label="Details"
          value={details}
          sx={{ width: "350px" }}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        ></TextField>
      </Stack>

      <Stack spacing={1} direction={"column"} alignItems={"flex-start"}>
        <Typography>Enter Issued date of the document</Typography>
        <TextField
          label="Issued Date: dd/mm/yyyy"
          value={issue}
          sx={{ width: "350px" }}
          onChange={(e) => {
            setIssue(e.target.value);
          }}
        ></TextField>
      </Stack>
    </Stack>
  );
};

export default DocInfo;
