import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Edit = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/publisher/edit/${id}`);
  };

  return (
    <>
      <Box sx={{ mt: "65px" }}>
        <Stack
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%" },
            maxWidth: "900px",
            mx: "auto",
            backgroundColor: "white",
            p: 2,
            mt: "150px",
            borderRadius: "10px",
          }}
          direction={{ xs: "column", sm: "column", md: "row" }}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          <TextField
            label={"Enter Id"}
            value={id}
            onChange={(e) => setId(e.target.value)}
            sx={{ width: "100%" }}
          ></TextField>
          <Button
            variant="contained"
            sx={{ width: "150px" }}
            onClick={handleClick}
          >
            Search
          </Button>
        </Stack>
        <Outlet />
      </Box>
    </>
  );
};

export default Edit;
