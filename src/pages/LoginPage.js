import { Button, Stack, Typography } from "@mui/material";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState } from "react";

export default function LoginPage({ walletAddress, setWalletAddress }) {
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error(error);
        setMessage(error);
      }
    } else {
      console.log("Please install MetaMask!");
      setMessage("Please install MetaMask!");
    }
  };

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
      <Typography variant="h4">Login</Typography>

      <Button
        sx={{ minWidth: "200px", mt: 8 }}
        variant="contained"
        onClick={handleLogin}
      >
        connect metamask wallet
      </Button>
      <Typography variant="caption">{message}</Typography>
    </Stack>
  );
}
