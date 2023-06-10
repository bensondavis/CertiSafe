import { useState, useEffect } from "react";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  StepContent,
} from "@mui/material";
import BMF from "browser-md5-file";
import uniqid from "uniqid";
import "@fontsource/open-sans";
import DocInfo from "./DocInfo";
import UploadDoc from "./UploadDoc";
import Transcript from "./Transcript";

const PublishDoc = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [issue, setIssue] = useState(null);
  const [id, setId] = useState(0);
  const [progress, setProgess] = useState(hash ? 100 : 0);
  const [txnHash, setTxnHash] = useState("");
  const [disabled, setDisabled] = useState(true);

  const steps = [
    {
      title: "Enter the information in the document",
      component: (
        <DocInfo
          name={name}
          details={details}
          issue={issue}
          setName={setName}
          setDetails={setDetails}
          setIssue={setIssue}
          setDisabled={setDisabled}
        />
      ),
    },
    {
      title: "Upload the document",
      component: (
        <UploadDoc
          id={id}
          name={name}
          details={details}
          issuedOn={issue}
          file={file}
          hash={hash}
          setFile={setFile}
          progress={progress}
          txnHash={txnHash}
          setTxnHash={setTxnHash}
          setDisabled={setDisabled}
        />
      ),
    },
    {
      title: "Download the transcript",
      component: (
        <Transcript
          id={id}
          file={file}
          name={name}
          details={details}
          issue={issue}
          hash={hash}
          txnHash={txnHash}
        />
      ),
    },
  ];

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
    setIssue(null);
    handleId();
  };

  const handleId = () => {
    const id = uniqid.time();
    setId(id);
  };

  useEffect(() => {
    handleCalculateHash();
  }, [file]);

  useEffect(() => {
    handleId();
  }, []);
  return (
    <Box sx={{ mt: "60px" }}>
      <Typography fontFamily={"Open Sans"} color={"white"} fontSize={50}>
        Publish Document
      </Typography>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          backgroundColor: "white",
          width: { xs: "90%", sm: "80%", md: "800px" },
          p: 2,
          borderRadius: "20px",
          mx: "auto",
        }}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.title}</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: true }}>
              {step.component}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={disabled}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
        {activeStep === steps.length ? (
          <Button
            variant="contained"
            onClick={handleReset}
            sx={{ width: 200, mx: "auto" }}
          >
            New document
          </Button>
        ) : null}
      </Stepper>
    </Box>
  );
};

export default PublishDoc;
