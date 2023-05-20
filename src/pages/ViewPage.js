import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ViewPage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Outlet />
    </Box>
  );
};

export default ViewPage;
