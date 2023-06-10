import { Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  return (
    <Box sx={{ color: "white", mx: "auto", width: "max-content", mt: 30}}>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" fontSize={{xs: "15vw", sm: "10vw", md: "8vw"}} fontWeight={600}>
          Welcome
        </Typography>
        <Box sx={{ width: "25px" }}></Box>
        <Typography variant="h1" fontSize={{xs: "15vw", sm: "10vw", md: "8vw"}}>to</Typography>
      </Box>

      <Typography variant="h2" fontSize={{xs: "9vw", sm: "7vw", md: "5vw"}}>
        {location.pathname.split("/")[1].toUpperCase()} Dashboard
      </Typography>
    </Box>
  );
};

export default Welcome;
