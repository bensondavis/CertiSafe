import { Stack } from "@mui/material";
import CustomInput from "./CustomInput";
import { useEffect } from "react";

const DocInfo = ({
  name,
  details,
  issue,
  setName,
  setDetails,
  setIssue,
  setDisabled,
}) => {
  useEffect(() => {
    if (name && details && issue) {
      setDisabled(false);
    }
    if (!name || !details || !issue) {
      setDisabled(true);
    }
  }, [name, details, issue]);
  return (
    <Stack
      spacing={3}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      sx={{ mb: 2 }}
    >
      <CustomInput
        isText={true}
        title={"Enter Name in the document"}
        label={"Name"}
        value={name}
        onChange={setName}
      />
      <CustomInput
        isMultiLine={true}
        title={"Enter details in the document"}
        label={"Details"}
        value={details}
        onChange={setDetails}
      />
      <CustomInput
        isDate={true}
        title={"Enter Issued date of the document"}
        label={"Date"}
        value={issue}
        onChange={setIssue}
      />
    </Stack>
  );
};

export default DocInfo;
