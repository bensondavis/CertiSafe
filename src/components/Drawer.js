import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Divider, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Data from "../Data/DrawerData";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const MuiDrawer = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (value) => {
    setOpen(value);
  };

  const handleClick = (link) => {
    navigate(link);
  };

  const handleLogout = () => {
    setUser(0);
  };

  return (
    <>
      <IconButton
        sx={{ position: "absolute", top: 12, left: 12 }}
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
        >
          <List>
            {Data.map((data, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleClick(data.link)}>
                  <ListItemIcon>{data.icon}</ListItemIcon>
                  <ListItemText primary={data.title} />
                </ListItemButton>
              </ListItem>
            ))}
            {user > 0 ? (
              <>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                </ListItem>
              </>
            ) : null}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MuiDrawer;
