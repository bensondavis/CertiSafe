import { Button, Stack, Typography } from "@mui/material";
import CircularProgressWithLabel from "./Progress";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../config/Firebase.config";
import CustomInput from "./CustomInput";
import { uploadDocument } from "../functions/ContractInteractions";
import dayjs from "dayjs";
import { useEffect } from "react";

const UploadDoc = ({
  id,
  name,
  details,
  issuedOn,
  file,
  setFile,
  hash,
  progress,
  txnHash,
  setTxnHash,
  setDisabled,
}) => {
  const handleUpload = () => {
    const imageRef = ref(storage, `uploads/${hash}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          const unixTime = dayjs(issuedOn).unix();
          uploadDocument(id, hash, name, details, unixTime, url, setTxnHash);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    if (txnHash) {
      setDisabled(false);
    }

    if (!txnHash) {
      setDisabled(true);
    }
  }, [txnHash]);
  return (
    <div style={{ marginTop: 30 }}>
      <Typography fontSize={"large"}>Upload the document:</Typography>
      <Stack spacing={2} sx={{ width: "100%", mt: 2 }} alignItems={"center"}>
        <CustomInput isFile={true} onChange={setFile} value={file?.name} />
        {file ? <img src={URL.createObjectURL(file)} width={150} /> : null}
      </Stack>

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

      {hash && !txnHash ? (
        <>
          <br />
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default UploadDoc;
