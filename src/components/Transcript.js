import { Button, Stack, Typography, Box } from "@mui/material";
import { useRef } from "react";
import { toJpeg } from "html-to-image";
import dayjs from "dayjs";

const Transcript = ({ file, name, details, hash, issue, id, txnHash }) => {
  const domEl = useRef(null);
  const issuedDate = issue ? String(dayjs(issue).$d).split(" ") : "";


  const handleDownloadImg = async () => {
    const dataUrl = await toJpeg(domEl.current);

    const link = document.createElement("a");
    link.download = "Receipt.jpeg";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div>
      <Box
        id={"transcript"}
        ref={domEl}
        sx={{
          backgroundColor: "#FEFEFE",
          width: "100%",
          height: "100%",
          // p: 1,
        }}
      >
        <Typography variant="h5">Document transcript:</Typography>
        <Stack
          sx={{ mt: 2 }}
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          spacing={1}
        >
          {file ? <img src={URL.createObjectURL(file)} width={550} /> : null}
          <Stack alignItems={"flex-start"} sx={{ mt: 2 }}>
            <Typography fontSize={22}>Name: {name}</Typography>
            <Typography fontSize={22}>Details: {details}</Typography>
            <Typography fontSize={22}>Issued: {`${issuedDate[1]} ${issuedDate[2]} ${issuedDate[3]}`}</Typography>
            <Typography fontSize={22}>Certificate Id: {id}</Typography>
            <Typography fontSize={22} >
              Hash: {hash}
            </Typography>
            <Typography variant="caption" fontSize={18} sx={{whiteSpace: "nowrap"}}>
              Txn hash: {txnHash}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleDownloadImg}>
        Download
      </Button>
    </div>
  );
};

export default Transcript;
