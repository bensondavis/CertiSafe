import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ImageViewer from "react-simple-image-viewer";
import VerifiedIcon from "@mui/icons-material/Verified";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CancelIcon from "@mui/icons-material/Cancel";

const ViewDocument = ({
  id,
  hash,
  name,
  details,
  url,
  issued,
  accepted,
  rejected,
  adminCount,
}) => {
  const [open, setOpen] = useState(false);
  console.log(accepted, rejected, adminCount);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          minWidth: "400px",
          maxWidth: "80vw",
          mx: "auto",
          mt: 2,
          mb: 7,
          backgroundColor: "#FEFEFE",
          p: "5px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4">Result</Typography>
        {hash != "" ? (
          <>
            <Stack
              sx={{ width: "100%" }}
              direction={{ xs: "column", sm: "column", md: "row" }}
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Box
                component="img"
                src={url}
                sx={{
                  maxWidth: { xs: 350, md: "50%" },
                }}
                alt="document"
                onClick={handleOpen}
              />
              <Stack direction={"column"} alignItems={"flex-start"}>
                <Typography>Id: {id}</Typography>
                <Typography>Name: {name}</Typography>
                <Typography>Details: {details}</Typography>
                <Typography>Issued on: {issued}</Typography>
                <Typography>Hash: {hash}</Typography>
              </Stack>
            </Stack>
            {rejected > 0 ? (
              <Stack
                direction={"row"}
                sx={{ width: "100%", mt: 2, mb: 2 }}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
              >
                <CancelIcon fontSize="large" />
                <Typography>Rejected!</Typography>
              </Stack>
            ) : (
              <>
                {accepted === adminCount ? (
                  <Stack
                    direction={"row"}
                    sx={{ width: "100%", mt: 2, mb: 2 }}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <VerifiedIcon fontSize="large" />
                    <Typography>Verified!</Typography>
                  </Stack>
                ) : (
                  <Stack
                    direction={"row"}
                    sx={{ width: "100%", mt: 2, mb: 2 }}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <PublishedWithChangesIcon fontSize="large" />
                    <Typography>Verification under procecss</Typography>
                  </Stack>
                )}
              </>
            )}
          </>
        ) : (
          <Typography>Document not found!</Typography>
        )}
      </Box>

      {open ? (
        <ImageViewer
          src={[url]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={handleClose}
        />
      ) : null}
    </>
  );
};

export default ViewDocument;
