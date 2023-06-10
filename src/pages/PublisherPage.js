import { Box, Button, ButtonGroup } from "@mui/material";
import "@fontsource/open-sans";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PublisherPage() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleEdit = () => {
    setActive(2);
    navigate(`/publisher/edit`);
  };

  const handlePublish = () => {
    setActive(1);
    navigate("/publisher/publish");
  };

  return (
    <Box sx={{ mt: "65px" }}>
      <ButtonGroup sx={{mt:5}}>
        <Button
          variant={active === 1 ? "contained" : "outlined"}
          onClick={handlePublish}
        >
          publish
        </Button>
        <Button
          variant={active === 2 ? "contained" : "outlined"}
          onClick={handleEdit}
        >
          edit
        </Button>
      </ButtonGroup>

      <Outlet />
    </Box>
  );
}
