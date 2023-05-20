import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ConnectWallet from "../functions/ConnectWallet";

export default function LoginPage({ walletAddress, setWalletAddress }) {
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    ConnectWallet(setWalletAddress, setMessage);
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
