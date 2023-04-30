import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { connect } from "react-redux";
import { ListItem, ListItemText, Typography } from "@mui/material";

import ListOfUsersModal from "./ListOfUsersModal";
import { getUserProfilesByIds } from "../../actions/user-actions";

function FollowsModal({ users, getUserProfilesByIds }) {
  let { open, handleClose, userIds } = useOutletContext();
  useEffect(() => {
    getUserProfilesByIds(userIds, "follows");
  }, []);

  if (!users) {
    return;
  }

  return (
    <ListOfUsersModal
      open={open}
      handleClose={handleClose}
      header={
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 900,
                  fontSize: "1.2rem",
                }}
              >
                Following
              </Typography>
            }
          />
        </ListItem>
      }
      users={users}
    />
  );
}

const mapState = (state) => {
  return { users: state.profile.followsUsers };
};

export default connect(mapState, { getUserProfilesByIds })(FollowsModal);
