import React from "react";
import { Link } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import GridOnIcon from "@mui/icons-material/GridOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

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
        <LinkTab
          label="Posts"
          to=""
          iconPosition="start"
          icon={<GridOnIcon />}
        />
        <LinkTab
          label="Saved"
          to="saved"
          iconPosition="start"
          icon={<BookmarkBorderRoundedIcon />}
        />
        <LinkTab
          label="Marked"
          to="tagged"
          iconPosition="start"
          icon={<AssignmentIndIcon />}
        />
      </Tabs>
    </Box>
  );
}

export default ProfileNaviagtion;
