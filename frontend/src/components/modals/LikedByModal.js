import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { ListItem, ListItemText, Typography } from "@mui/material";

import ListOfUsersModal from "./ListOfUsersModal";
import { getUsersWhoLiked } from "../../actions/user-actions";

function LikedByModal({ users, getUserProfilesByIds, getUsersWhoLiked }) {
  let { open, handleClose, userIds } = useOutletContext();
  console.log(useOutletContext());
  useEffect(() => {
    getUsersWhoLiked(userIds);
  }, []);

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
                Liked by
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
  return { users: state.post.likedBy };
};

export default connect(mapState, { getUsersWhoLiked })(LikedByModal);
