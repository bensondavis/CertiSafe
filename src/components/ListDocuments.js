import { useEffect, useState } from "react";
import { getNonValidatedIds } from "../functions/ContractInteractions";
import { Box, Typography, Grid } from "@mui/material";
import Document from "./Document";

const ListDocuments = () => {
  const [ids, setIds] = useState(null);

  useEffect(() => {
    if (!ids) {
      getNonValidatedIds(setIds);
    }
  }, []);

  return (
    <Box
      sx={{
        width: "90vw",
        mx: "auto",
        mt: "8vh",
        p: "50px 0",
      }}
    >
      <Typography
        fontFamily={"montserrat"}
        fontSize={40}
        sx={{ color: "white" }}
      >
        Non validated certificates
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
        // alignItems={"center"}
        justifyContent={"center"}
      >
        {ids
          ? ids.map((data, key) => (
              <Grid item width={"300px"} key={key}>
                <Document id={data} index={key} />
              </Grid>
            ))
          : null}
      </Grid>
    </Box>
  );
};

export default ListDocuments;
