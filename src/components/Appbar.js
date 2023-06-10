import { IconButton, Paper, Stack, Typography } from "@mui/material";
import "@fontsource/montserrat/700.css";
import MuiDrawer from "./Drawer";

export default function Appbar({ user, setUser }) {
  return (
    <Stack
      sx={{
        height: "65px",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      alignItems={"center"}
      justifyContent={"center"}
      component={Paper}
      elevation={4}
    >
      <MuiDrawer
        user={user}
        setUser={setUser}
      />
      <Typography
        fontFamily={"Montserrat"}
        sx={{ fontSize: 25, borderColor: "black", borderWidth: 8 }}
        letterSpacing={4}
      >
        CertiSafe
      </Typography>
    </Stack>
  );
}
