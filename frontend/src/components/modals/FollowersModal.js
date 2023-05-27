import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { ListItem, ListItemText, Typography } from "@mui/material";

import ListOfUsersModal from "./ListOfUsersModal";
import { getUserProfilesByIds } from "../../actions/user-actions";

function FollowersModal({ users, getUserProfilesByIds, userIds }) {
  let { open, handleClose } = useOutletContext();
  useEffect(() => {
    getUserProfilesByIds(userIds, "followers");
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
                Followers
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
  return { users: state.profile.followersUsers, userIds: state.profile.followers };
};

export default connect(mapState, { getUserProfilesByIds })(FollowersModal);
