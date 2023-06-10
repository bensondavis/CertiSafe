import { Button, Stack } from "@mui/material";
import { acceptDoc, rejectDoc } from "../functions/ContractInteractions";

const AcceptRejectBtn = ({ id }) => {
  const handleAccept = () => {
    acceptDoc(id);
  };

  const handleReject = () => {
    rejectDoc(id);
  };

  return (
    <Stack direction={"row"} justifyContent={"space-evenly"} sx={{ mt: 2 }}>
      <Button
        variant="contained"
        sx={{ borderRadius: "25px", width: "95px", p: 1 }}
        onClick={handleAccept}
      >
        Accept
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ borderRadius: "25px", width: "95px" }}
        onClick={handleReject}
      >
        Reject
      </Button>
    </Stack>
  );
};

export default AcceptRejectBtn;
