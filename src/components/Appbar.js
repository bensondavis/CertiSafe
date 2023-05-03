import { Button, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import { useNavigate } from "react-router-dom";

export default function Appbar({ walletAddress, setWalletAddress }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setWalletAddress("");
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSearch = () => {
    navigate("/search");
  }

  return (
    <div className="appbar">
      <Typography variant="h4" sx={{ lineHeight: "66px" }}>
        Certy
      </Typography>

      <Button variant="outlined"
          sx={{ position: "absolute", top: 13, right: 84 }} onClick={handleSearch} >
        Search
      </Button>

      {walletAddress ? (
        <IconButton
          sx={{ position: "absolute", top: 7, right: 7 }}
          onClick={handleClick}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          sx={{ position: "absolute", top: 13, right: 7 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      )}

      <AccountMenu
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        handleLogout={handleLogout}
      />
    </div>
  );
}
