import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addPublisher } from "../functions/ContractInteractions";

const AddPublisher = () => {
  const [publisherAddress, setPublisherAddress] = useState("");

  const handleClick = () => {
    addPublisher(publisherAddress, setPublisherAddress);
  };

  return (
    <>
      <Stack
        sx={{ mt: 3 }}
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h4">Add or change publisher</Typography>
        <TextField
          label={"Publisher Address"}
          value={publisherAddress}
          onChange={(e) => {
            setPublisherAddress(e.target.value);
          }}
          sx={{ width: { xs: "90%", md: "80%" } }}
        ></TextField>
      </Stack>

      <Button variant="contained" sx={{ mt: 4 }} onClick={handleClick}>
        Submit
      </Button>
    </>
  );
};

export default AddPublisher;
