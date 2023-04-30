import { Box, Stack, Typography } from "@mui/material";
import { ADDRESS } from "../Global";
import ABI from "../contract/ABI.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import ListDocuments from "../components/ListDocuments";

export default function AdminsPage() {
  const [ids, setIds] = useState(null);

  const getNonValidatedIds = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ADDRESS, ABI, provider);
    const signer = provider.getSigner();
    const daiWithSigner = contract.connect(signer);
    daiWithSigner
      .getNonValidatedCertificates()
      .then((res) => {
        setIds(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNonValidatedIds();
  }, []);

  return (
    <>
      <Box sx={{ width: "70vw", mx: "auto", mt: "8vh", p: "50px 0" }}>
        <Stack
          sx={{
            width: "100%",
            height: "48px",
            backgroundColor: "#FEFEFE",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          }}
          justifyContent={"center"}
        >
          <Typography sx={{ color: "rgba(0, 0, 0, 0.87)" }}>
            Non validated certificates
          </Typography>
        </Stack>
        {ids
          ? ids.map((data, key) => (
              // <Typography key={key}>{parseInt(data._hex)}</Typography>
              <ListDocuments id={parseInt(data._hex)} />
            ))
          : null}
      </Box>
    </>
  );
}
