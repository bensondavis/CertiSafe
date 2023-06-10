import { Stack, Typography, Box, Paper, IconButton } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import "@fontsource-variable/rubik";
import { useNavigate } from "react-router-dom";

const Document = ({ id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin-dashboard/validate/${id}`);
  };

  return (
    <>
      {id !== "" ? (
        <Box
          component={Paper}
          elevation={3}
          sx={{
            maxWidth: "300px",
            position: "relative",
            height: "80px",
            mt: 2,
          }}
        >
          <Stack
            sx={{ width: "100%", height: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography fontFamily={"Rubik Variable"}>ID: {id}</Typography>
          </Stack>

          <IconButton
            sx={{ position: "absolute", top: 20, right: 5, color: "#7A63FF" }}
            onClick={handleClick}
          >
            <ExpandCircleDownIcon fontSize="medium" sx={{ rotate: "-90deg" }} />
          </IconButton>
        </Box>
      ) : null}
    </>
  );
};

export default Document;
