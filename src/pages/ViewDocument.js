import { Box, Stack, Chip, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { handleSearch } from "../functions/ContractInteractions";
import { useEffect, useState } from "react";
import "@fontsource/bebas-neue";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CustomInfo from "../components/CustomInfo";
import dayjs from "dayjs";
import AcceptRejectBtn from "../components/AcceptRejectBtn";
import ImageViewer from "react-simple-image-viewer";

function createData(name, value) {
  return { name, value };
}

const ViewDocument = ({ validate }) => {
  const [data, setData] = useState("");
  const [rows, setRows] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (id) {
      handleSearch(id, setLoading, setError, setData);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setRows([
        createData("Id", data[0]),
        createData("Hash", data[1]),
        createData("Name", data[2]),
        createData("Details", data[3]),
        createData("Issued On", String(dayjs.unix(parseInt(data[4])))),
      ]);
    }
  }, [data]);

  return (
    <Box>
      {error || data[2] === "" ? (
        <Typography variant="h2" sx={{ mt: 50, color: "white" }}>
          Document Not Found
        </Typography>
      ) : (
        <Stack
          sx={{
            mt: "60px",
            maxWidth: { xs: "93%", sm: "80%", md: "80%" },
            height: "calc(100vh - 60px)",
            mx: "auto",
          }}
          direction={{ xs: "column", sm: "column", md: "row" }}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          <Box
            component={"img"}
            src={data[5]}
            width={{ xs: "100%", sm: "90%", md: "50%" }}
            alt="document"
            onClick={() => setOpen(true)}
          />
          <Box
            sx={{
              width: { md: "450px", sm: "90%", xs: "100%" },
              position: "relative",
            }}
          >
            {parseInt(data[6]) === 2 ? (
              <Chip
                sx={{ mb: 2, position: "absolute", top: 0, right: 0 }}
                color="error"
                label="Rejected"
                icon={<CancelIcon />}
              />
            ) : parseInt(data[6]) === 1 ? (
              <Chip
                sx={{ mb: 2, position: "absolute", top: 0, right: 0 }}
                color="success"
                label="Verified"
                icon={<VerifiedIcon />}
              />
            ) : parseInt(data[6]) === 3 ? (
              <Chip
                sx={{ mb: 2, position: "absolute", top: 0, right: 0 }}
                color="info"
                label="Under verification"
                icon={<PublishedWithChangesIcon />}
              />
            ) : null}

            <Box
              sx={{
                mt: "40px",
                width: "100%",
                backgroundColor: "white",
                borderRadius: "20px",
                py: 2,
              }}
            >
              {rows
                ? rows.map((data, index) => (
                    <CustomInfo
                      title={data.name}
                      body={data.value}
                      key={index}
                    />
                  ))
                : null}
            </Box>
            {validate ? <AcceptRejectBtn id={id} /> : null}
          </Box>
        </Stack>
      )}
      {open && (
        <ImageViewer
          src={[data[5]]}
          currentIndex={0}
          closeOnClickOutside={true}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

export default ViewDocument;
