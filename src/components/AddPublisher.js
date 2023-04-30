import { Button, Stack, TextField, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import { ADDRESS } from "../Global";
import ABI from "../contract/ABI.json";

const AddPublisher = () => {
  const [publisherAddress, setPublisherAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ADDRESS, ABI, provider);
    const signer = provider.getSigner();
    const daiWithSigner = contract.connect(signer);
    daiWithSigner.addPublisher(publisherAddress).then((res) => {
      setMessage(res.hash);
      setPublisherAddress("");
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
        <Typography variant="h4">Add or change publisher</Typography>
        <TextField
          label={"Publisher Address"}
          value={publisherAddress}
          onChange={(e) => {
            setPublisherAddress(e.target.value);
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

export default AddPublisher;
