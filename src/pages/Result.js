import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { handleSearch } from "../functions/ContractInteractions";
import { useEffect, useState } from "react";
import "@fontsource/bebas-neue";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import Skeleton from "@mui/material/Skeleton";

function createData(name, value) {
  return { name, value };
}

const Result = () => {
  const [data, setData] = useState("");
  const [rows, setRows] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      handleSearch(id, setLoading, setError, setData);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setRows([
        createData("Id", parseInt(data[0])),
        createData("Hash", data[1]),
        createData("Name", data[2]),
        createData("Details", data[3]),
        createData("Issued On", data[4]),
      ]);
    }
  }, [data]);

  return (
    <>
      {error || data[2] == "" ? (
        <Typography variant="h2" sx={{ mt: 50, color: "white" }}>
          Document Not Found
        </Typography>
      ) : (
        <Stack
          sx={{
            backgroundColor: "white",
            mt: { xs: 15, sm: 17, md: 30 },
            maxWidth: { xs: "90%", sm: "80%", md: "1100px" },
            mx: "auto",
          }}
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={2}
        >
          <Box sx={{ width: { md: "550px" } }}>
            {loading ? (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={"388px"}
              />
            ) : (
              <img
                src={data[5]}
                style={{
                  width: "100%",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              />
            )}
          </Box>
          <Stack
            sx={{ width: { md: "550px" }, alignItems: "center", mb: 3 }}
            spacing={3}
          >
            <TableContainer>
              <Table>
                <TableBody>
                  {rows
                    ? rows.map((data, index) => (
                        <TableRow key={index}>
                          {data == "" ? (
                            <Skeleton
                              sx={{ my: 2, width: "90%", mx: "auto" }}
                              animation="wave"
                            />
                          ) : (
                            <>
                              <TableCell>{data?.name}</TableCell>
                              <TableCell>{data?.value}</TableCell>
                            </>
                          )}
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
            {!data ? (
              <Skeleton
                animation="wave"
                sx={{ my: 2, width: "70%", mx: "auto" }}
              />
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {parseInt(data[7]) >= Math.round(parseInt(data[8]) / 2) ? (
                  <>
                    <CancelIcon fontSize="large" color="error" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Rejected
                    </Typography>
                  </>
                ) : parseInt(data[6]) == parseInt(data[8]) ? (
                  <>
                    <VerifiedIcon fontSize="large" color="primary" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Verified
                    </Typography>
                  </>
                ) : (
                  <>
                    <PublishedWithChangesIcon fontSize="large" color="info" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Verification in progress
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Result;
