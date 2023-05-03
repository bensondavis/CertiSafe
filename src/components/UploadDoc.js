import { Button, Stack, Typography } from "@mui/material";
import CircularProgressWithLabel from "./Progress";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../config/Firebase.config";
import { ethers } from "ethers";
import { ADDRESS } from "../Global";
import ABI from "../contract/ABI.json";
import { useState } from "react";

const UploadDoc = ({
  id,
  name,
  details,
  issuedOn,
  file,
  setFile,
  hash,
  progress,
  setTxnHash,
}) => {
  const [message, setMessage] = useState("");

  const handleUploadDocument = (url) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ADDRESS, ABI, provider);
    const signer = provider.getSigner();
    const daiWithSigner = contract.connect(signer);
    daiWithSigner
      .addCertificate(id, hash, name, details, issuedOn, url)
      .then((res) => {
        setMessage(res.hash);
        setTxnHash(res.hash);
      })
      .catch((err) => {
        setMessage(err.reason);
      });
  };

  const handleUpload = () => {
    const imageRef = ref(storage, `uploads/${hash}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          handleUploadDocument(url);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Typography fontSize={"large"}>Upload the document:</Typography>
      <Stack spacing={2} alignItems={"center"}>
        <Stack direction={"column"} spacing={1} alignItems={"center"}>
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2, width: "200px" }}
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
        </Stack>
      </Stack>

      {/* <Button
        variant="contained"
        sx={{ width: "200px", mt: 2 }}
        onClick={handleCalculateHash}
      >
        Calculate hash
      </Button> */}

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

      {hash ? (
        <>
          <br />
          <Button variant="contained" sx={{ mt: 2, mb:1 }} onClick={handleUpload}>
            Upload
          </Button>
          <br/>
          {message ? <Typography variant="caption">Txn hash: {message}</Typography> : null}
        </>
      ) : null}
    </div>
  );
};

export default UploadDoc;
