import {
  Typography,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import DocInfo from "../components/DocInfo";
import UploadDoc from "../components/UploadDoc";
import Transcript from "../components/Transcript";
import generateUniqueId from "generate-unique-id";
import BMF from "browser-md5-file";

const steps = [
  "Enter the information in the document",
  "Upload the document",
  "Download the transcript",
];

export default function PublisherPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [issue, setIssue] = useState("");
  const [id, setId] = useState(0);
  const [progress, setProgess] = useState(hash ? 100 : 0);
  const [txnHash, setTxnHash] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const handleReset = () => {
    setActiveStep(0);
    setFile(null);
    setHash("");
    setProgess(0);
    setName("");
    setDetails("");
    setIssue("");
    handleId();
  };

  const handleId = () => {
    const id = generateUniqueId({
      length: 10,
      useLetters: false,
    });
    setId(id);
  };

  useEffect(() => {
    handleCalculateHash();
  }, [file]);

  useEffect(() => {
    handleId();
  }, []);

  return (
    <>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          // maxWidth: "80vw",
          // width: "612px",
          width: "max-content",
          mx: "auto",
          mt: "18vh",
          mb: "8vh",
          backgroundColor: "#FEFEFE",
          p: "5px",
          // maxHeight: "90vh",
          // borderRadius: "10px",
        }}
      >
        <Typography variant="h4">Upload Document</Typography>

        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={handleReset}>
              Add new document
            </Button>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </>
        ) : (
          <>
            {activeStep === 0 ? (
              <DocInfo
                name={name}
                details={details}
                issue={issue}
                setName={setName}
                setDetails={setDetails}
                setIssue={setIssue}
              />
            ) : null}
            {activeStep === 1 ? (
              <UploadDoc
                id={id}
                name={name}
                details={details}
                issuedOn={issue}
                file={file}
                hash={hash}
                setFile={setFile}
                progress={progress}
                setTxnHash={setTxnHash}
              />
            ) : null}
            {activeStep === 2 ? (
              <Transcript
                id={id}
                file={file}
                name={name}
                details={details}
                issue={issue}
                hash={hash}
                txnHash={txnHash}
              />
            ) : null}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </>
  );
}
