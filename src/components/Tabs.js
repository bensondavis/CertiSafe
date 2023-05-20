import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";

import AddAdmins from "./AddAdmins";
import AddPublisher from "./AddPublisher";
import RemoveAdmins from "./RemoveAdmins";

function TabPanel({ children, value, index, ...others }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...others}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "absolute",
        top: 0,
        left: 0,
        
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Add Admins" />
        <Tab label="Add Publisher" />
        <Tab label="Remove Admins" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {<AddAdmins />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {<AddPublisher />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {<RemoveAdmins />}
      </TabPanel>
    </Box>
  );
}
