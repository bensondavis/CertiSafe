import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import Logo from "../assets/logo.svg";
import "@fontsource/open-sans";

const Home = () => {
  return (
    <Stack direction={{ xs: "column", sm: "column", md: "row" }}>
      <Stack
        sx={{
          width: { xs: "100%", sm: "100%", md: "50vw" },
          height: "100vh",
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Card sx={{ backgroundColor: "transparent" }} elevation={0}>
          <CardMedia
            component={"img"}
            width={{ xs: "90%", sm: "400rem", md: "400rem" }}
            image={Logo}
            alt="logo"
          />
        </Card>
      </Stack>

      <Stack
        sx={{
          width: { xs: "100%", sm: "100%", md: "50vw" },
          height: "100vh",
          backgroundColor: "#7A63FF",
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box sx={{ width: "90%" }}>
          <Typography sx={{ fontSize: 50, color: "white", textAlign: "left" }}>
            Welcome
          </Typography>
          <br />
          <Typography
            variant="body1"
            sx={{ color: "white", textAlign: "left", fontFamily: "Open Sans" }}
          >
            Certify your documents with confidence using CertiSafe, the
            innovative blockchain-based framework that ensures the integrity and
            authenticity of your important documents. Our platform leverages the
            power of smart contracts and the security of the blockchain to
            provide a tamper-proof certification process that eliminates the
            risk of document forgery and manipulation.
          </Typography>
          <br />
          <br />
          <Typography
            variant="h6"
            sx={{ color: "white", textAlign: "left", fontFamily: "Open Sans" }}
          >
            Experience the Future of Document Certification!
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Home;
