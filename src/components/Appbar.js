import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import AccountMenu from "./AccountMenu";

export default function Appbar({setWalletAddress}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setWalletAddress("");
    setAnchorEl(null);
  }

  return (
    <div className="appbar">
      <Typography variant="h4">Certy</Typography>
      <IconButton sx={{ position: "absolute", top: 7, right: 7 }} onClick={handleClick}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <AccountMenu 
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        handleLogout={handleLogout}
      />
    </div>
  );
}
