import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import { ADDRESS } from "../Global";
import ABI from "../contract/ABI.json";

const ListDocuments = ({ id }) => {
  const [details, setDetails] = useState("");

  const getDocumentDetails = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ADDRESS, ABI, provider);
    const signer = provider.getSigner();
    const daiWithSigner = contract.connect(signer);
    daiWithSigner
      .searchById(id)
      .then((res) => {
        setDetails(res);
        console.log({res})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ListDocuments;
