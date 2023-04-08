import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

function LinkTab(props) {
  return (
    <Tab
      component={Link}
      // onClick={(event) => {
      //   event.preventDefault();
      // }}
      {...props}
    />
  );
}

function ProfileNaviagtion(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <LinkTab label="Item One" to="" />
        <LinkTab label="Item Two" to="saved" />
        <LinkTab label="Item Three" to="tagged" />
      </Tabs>
    </Box>
  );
}

export default ProfileNaviagtion;
