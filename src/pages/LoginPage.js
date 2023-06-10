import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../functions/ContractInteractions";

export default function LoginPage({ setUser }) {
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    login(setUser);
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
      <Typography variant="h4" sx={{ fontSize: 50, fontWeight: 500 }}>
        Login
      </Typography>

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
