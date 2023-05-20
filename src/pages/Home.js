import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/logo.svg";
import "@fontsource/open-sans"

const Home = () => {
  return (
    <Stack direction={{ xs: "column", sm: "column", md: "row" }}>
      <Stack
        sx={{
          width: { xs: "100%", sm: "100%", md: "50vw" },
          height: "100vh",
          // backgroundColor: "#1E1E1E",
          // backgroundImage: "radial-gradient(gray 1px, transparent 0)",
          // backgroundSize: "30px 30px",
          // backgroundPosition: "-10px 0px",
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <img src={Logo} width={"400rem"} />
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
          <Typography variant="body1" sx={{ color: "white", textAlign: "left", fontFamily: "Open Sans" }}>
            Certify your documents with confidence using CertiSafe, the
            innovative blockchain-based framework that ensures the integrity and
            authenticity of your important documents. Our platform leverages the
            power of smart contracts and the security of the blockchain to
            provide a tamper-proof certification process that eliminates the
            risk of document forgery and manipulation.
          </Typography>
          <br />
          <br />
          <Typography variant="h6" sx={{ color: "white", textAlign: "left", fontFamily: "Open Sans" }}>
            Experience the Future of Document Certification!
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Home;
