import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { removeAdmin } from "../functions/ContractInteractions";

const RemoveAdmins = () => {
  const [adminAddress, setAdminAddress] = useState("");

  const handleClick = async () => {
    removeAdmin(adminAddress, setAdminAddress);
  };

  return (
    <>
      <Stack
        sx={{ mt: 3 }}
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h4">Remove Admins</Typography>
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

export default RemoveAdmins;
