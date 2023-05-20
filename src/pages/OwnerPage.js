import { Typography, Stack } from "@mui/material";

import CenteredTabs from "../components/Tabs";

export default function OwnerPage() {
  return (
    <>
      
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          maxWidth: "80vw",
          mx: "auto",
          mt: "18vh",
          backgroundColor: "#FEFEFE",
          p: "5px",
          maxHeight: "700px",
          borderRadius: "10px",
          position: "relative"
        }}
      >
        <CenteredTabs />
      </Stack>
    </>
  );
}
