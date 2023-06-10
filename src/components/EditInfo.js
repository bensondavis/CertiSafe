import { Typography, Box, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleSearch } from "../functions/ContractInteractions";
import CustomInput from "./CustomInput";
import { edit } from "../functions/ContractInteractions";

const EditInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  console.log({id})
  const handleClick = () => {
    edit(id, name, details);
  };
  useEffect(() => {
    if (id) {
      handleSearch(id, setLoading, setError, setData);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setName(data[2]);
      setDetails(data[3]);
    }
  }, [data]);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: { xs: "90%", sm: "80%", md: "70%" },
        maxWidth: "900px",
        mx: "auto",
        p: 2,
        borderRadius: "10px",
        mt: 3,
      }}
    >
      {error || data[2] == "" ? (
        <Typography variant="h3" sx={{ color: "black" }}>
          Document Not Found
        </Typography>
      ) : (
        <>
          <Typography>info {id}</Typography>
          <Stack direction={"column"} spacing={2}>
            <CustomInput
              label={"Name"}
              isText={true}
              value={name}
              onChange={setName}
            />
            <CustomInput
              label={"Details"}
              isMultiLine={true}
              value={details}
              onChange={setDetails}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleClick}
            disabled={name == data[2] && details == data[3]}
          >
            Submit
          </Button>
        </>
      )}
    </Box>
  );
};

export default EditInfo;
