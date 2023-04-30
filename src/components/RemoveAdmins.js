import { Button, Stack, TextField, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import { ADDRESS } from "../Global";
import ABI from "../contract/ABI.json";

const RemoveAdmins = () => {
  const [adminAddress, setAdminAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ADDRESS, ABI, provider);
    const signer = provider.getSigner();
    const daiWithSigner = contract.connect(signer);
    daiWithSigner.removeAdmin(adminAddress).then((res) => {
      setMessage(res.hash);
      setAdminAddress("");
    }).catch((err) => {
      setMessage(err.reason);
    })
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

        {message ? (
          <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
            Txn hash: {message}
          </Typography>
        ) : null}
      </Stack>

      <Button variant="contained" sx={{ mt: 4 }} onClick={handleClick}>
        Submit
      </Button>
    </>
  );
};

export default RemoveAdmins;
