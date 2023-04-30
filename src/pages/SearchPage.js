import {
  Stack,
  TextField,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ADDRESS } from "../Global";
import ABI from "../contract/ABI.json";
import BMF from "browser-md5-file";
import CircularProgressWithLabel from "../components/Progress";
import ViewDocument from "../components/ViewDocument";

export default function SearchPage() {
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");
  const [progress, setProgess] = useState(hash ? 100 : 0);
  const [document, setDocument] = useState(null);
  console.log({ document });
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ADDRESS, ABI, provider);
    const signer = provider.getSigner();
    const daiWithSigner = contract.connect(signer);

    if (id !== "") {
      daiWithSigner
        .searchById(parseInt(id))
        .then((res) => {
          setDocument(res);
        })
        .catch((err) => {
          console.log({ err });
        });
    } else if (file !== null) {
      daiWithSigner
        .searchByHash(hash)
        .then((res) => {
          setDocument(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    handleCalculateHash();
  }, [file]);

  return (
    <>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          maxWidth: "400px",
          mx: "auto",
          mt: "10vh",
          backgroundColor: "#FEFEFE",
          p: "5px",
          // minHeight: "400px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
          Search
        </Typography>
        <Box sx={{ mt: 2, width: "245px" }}>
          <TextField
            sx={{ width: "100%" }}
            variant="outlined"
            label="Id of the document"
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></TextField>

          <Divider sx={{ mt: 2 }}>or</Divider>

          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2, width: "100%" }}
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
          <Typography variant="caption">{file?.name}</Typography>
          {file ? <img src={URL.createObjectURL(file)} width={150} /> : null}
          <br />
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
          {progress === 100 && (
            <Typography variant="caption">hash: {hash}</Typography>
          )}
        </Box>
        <Button
          sx={{ minWidth: "200px", mt: 3, mb: 3 }}
          variant="contained"
          onClick={handleSearch}
        >
          Submit
        </Button>
      </Stack>

      {document ? (
        <ViewDocument
        id={parseInt(document[0])}
          hash={document[1]}
          issued={document[4]}
          details={document[3]}
          name={document[2]}
          url={document[5]}
          accepted={parseInt(document[6])}
          rejected={parseInt(document[7])}
          adminCount={parseInt(document[8])}
        />
      ) : null}
    </>
  );
}
