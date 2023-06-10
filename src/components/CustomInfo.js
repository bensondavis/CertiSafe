import { Stack, Typography } from "@mui/material";

const CustomInfo = ({ title, body }) => {
  return (
    <Stack
      sx={{ mt: 1, width: "90%", mx: "auto" }}
      direction={body?.length > 30 ? "column" : "row"}
      justifyContent={"space-between"}
      // spacing={1}
    >
      <Typography sx={{ fontFamily: "Rubik Variable", textAlign: "left"}}>
        {title}
      </Typography>
      <Typography sx={{ fontFamily: "Rubik Variable", textAlign: "right"}}>
        {body}
      </Typography>
    </Stack>
  );
};

export default CustomInfo;
