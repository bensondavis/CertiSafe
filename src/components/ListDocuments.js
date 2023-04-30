import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack, Typography, Box, ButtonGroup, Button } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import { ADDRESS } from "../Global";
import ABI from "../contract/ABI.json";
import ImageViewer from "react-simple-image-viewer";

const ListDocuments = ({ id, onAccept, onReject, index}) => {
  const [details, setDetails] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDocumentDetails = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ADDRESS, ABI, provider);
    const signer = provider.getSigner();
    const daiWithSigner = contract.connect(signer);
    daiWithSigner
      .searchById(id)
      .then((res) => {
        setDetails(res);
        console.log({ res });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {id !== 0 ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={getDocumentDetails}
          >
            <Typography>{id}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              sx={{ width: "100%" }}
              direction={{ xs: "column", sm: "column", md: "row" }}
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Box
                component="img"
                src={details[5]}
                sx={{
                  maxWidth: { xs: 350, md: "50%" },
                }}
                alt="document"
                onClick={handleOpen}
              />
              <Stack direction={"column"} alignItems={"flex-start"}>
                <Typography>Id: {id}</Typography>
                <Typography>Name: {details[2]}</Typography>
                <Typography>Details: {details[3]}</Typography>
                <Typography>Issued on: {details[4]}</Typography>
                <Typography>Hash: {details[1]}</Typography>
              </Stack>
            </Stack>
            <ButtonGroup
              disableElevation
              // variant="contained"
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  onAccept(id, index);
                }}
              >
                Accept
              </Button>
              <Button
                onClick={() => {
                  onReject(id, index);
                }}
              >
                Reject
              </Button>
            </ButtonGroup>
          </AccordionDetails>
        </Accordion>
      ) : null}

      {open ? (
        <ImageViewer
          src={[details[5]]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={handleClose}
        />
      ) : null}
    </>
  );
};

export default ListDocuments;
