import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addAdmin } from "../functions/ContractInteractions";

const AddAdmins = () => {
  const [adminAddress, setAdminAddress] = useState("");

  const handleClick = () => {
    addAdmin(adminAddress, setAdminAddress);
  };

  return (
    <>
      <Stack
        sx={{ mt: 3 }}
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h4">Add Admins</Typography>
        <TextField
          label={"Admin Address"}
          value={adminAddress}
          onChange={(e) => {
            setAdminAddress(e.target.value);
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

export default AddAdmins;
