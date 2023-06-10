import { Stack, TextField, Typography, Button, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

const CustomInput = ({
  title,
  label,
  value,
  placeholder,
  onChange,
  isText,
  isDate,
  isMultiLine,
  isFile,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleFiles = (e) => {
    onChange(e.target.files[0]);
  };

  const handleDate = (e) => {
    onChange(dayjs(`${e?.$y}-${e?.$M + 1}-${e?.$D}`));
  };
  return (
    <Stack
      sx={{ width: "100%" }}
      spacing={1}
      direction={"column"}
      alignItems={"center"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "350px",
        }}
      >
        <Typography textAlign={"left"}>{title}</Typography>
        {isText ? (
          <TextField
            label={label}
            value={value}
            placeholder={placeholder}
            sx={{ maxWidth: "350px", width: "100%" }}
            onChange={handleChange}
          ></TextField>
        ) : null}
        {isDate ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              sx={{ maxWidth: "350px", width: "100%" }}
              format="YYYY-MM-DD"
              label={label}
              value={value}
              onChange={handleDate}
            />
          </LocalizationProvider>
        ) : null}
        {isMultiLine ? (
          <TextField
            label={label}
            multiline
            rows={4}
            placeholder={placeholder}
            sx={{ maxWidth: "350px", width: "100%" }}
            value={value}
            onChange={handleChange}
          />
        ) : null}
        {isFile ? (
          <Stack direction={"column"} sx={{ width: "223px", mx: "auto" }}>
            <Button variant="outlined" component="label" sx={{ width: "100%" }}>
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleFiles}
              />
            </Button>
            {value ? <Typography variant="caption">{value}</Typography> : null}
          </Stack>
        ) : null}
      </Box>
    </Stack>
  );
};

export default CustomInput;
