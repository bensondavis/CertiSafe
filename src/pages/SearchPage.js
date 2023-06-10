import {
  Stack,
  TextField,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ADDRESS } from "../Global";
import ABI from "../contract/ABI.json";
import BMF from "browser-md5-file";
import CircularProgressWithLabel from "../components/Progress";
import ViewDocument from "./ViewDocument";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");
  const [progress, setProgess] = useState(hash ? 100 : 0);
  const navigate = useNavigate();

  const handleCalculateHash = () => {
    if (file === null) return;

    const bmf = new BMF();
    bmf.md5(
      file,
      (err, md5) => {
        setHash(md5);
      },
      (progress) => {
        setProgess(progress * 100);
      }
    );
  };

  const handleSearch = () => {
    navigate(`/view/${id ? id : hash}`);
  };

  useEffect(() => {
    handleCalculateHash();
  }, [file]);

  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          mt: 10
        }}
      >
        <Box
          sx={{
            backgroundColor: "#7A63FF",
            width: { xs: "80vw", sm: "70vw", md: "300px" },
            p: 3,
          }}
        >
          <Typography sx={{ color: "white", fontSize: 50, textAlign: "left" }}>
            Search
          </Typography>
          <br />
          <br />
          <Typography
            textAlign={"left"}
            sx={{ color: "white" }}
            variant="body1"
          >
            Discover the power of CertiBlock, the blockchain-based framework
            that ensures the integrity and authenticity of your documents.
            Easily verify certified documents, eliminate fraud, and gain trust
            in an instant. Experience secure document certification like never
            before.
          </Typography>
        </Box>
        <Stack
          sx={{
            width: { xs: "80vw", sm: "70vw", md: "400px" },
            minHeight: { xs: "300px", sm: "300px", md: "350px" },
            p: 3,
            backgroundColor: "white",
          }}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          <Box sx={{ width: "90%" }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Enter Id of the document:
            </Typography>
            <TextField
              label="Document Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              sx={{ width: "100%", mt: 1 }}
            ></TextField>
          </Box>

          <Box sx={{ width: "90%" }}>
            <Divider sx={{ mt: 2 }}>or</Divider>
          </Box>

          <Box sx={{ width: "90%" }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Upload your document:
            </Typography>
            <Stack justifyContent={"center"} direction={"row"} sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                component="label"
                sx={{ width: "100%" }}
              >
                Choose a file
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </Button>
              {file ? (
                <IconButton
                  onClick={() => {
                    setFile(null);
                    setProgess(0);
                    setId("");
                    setHash("");
                  }}
                >
                  <RemoveCircleIcon />
                </IconButton>
              ) : null}
            </Stack>

            <Typography variant="caption">{file?.name}</Typography>
            {progress > 0 ? (
              <Stack
                spacing={1}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ mt: 2, mb: 1 }}
              >
                <Typography variant="caption">Calculating hash: </Typography>
                <CircularProgressWithLabel value={progress} />
              </Stack>
            ) : null}
          </Box>
          {id || hash ? <Button variant="contained" onClick={handleSearch} sx={{width: "100px"}}>Submit</Button> : null}
        </Stack>
      </Box>
    </Stack>
  );
}
