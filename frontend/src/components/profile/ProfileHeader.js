import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import SettingsModal from "../modals/SettingsModal";
import ChangeProfileImageModal from "../modals/ChangeProfileImageModal";
import OtherUserSettingsModal from "../modals/OtherUserSettingsModal";
import server from "../../config/server";
import { followUser } from "../../actions/user-actions";

function ProfileHeader({ profile, user, followUser }) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isChangeProfileImageOpen, setIsChangeProfileImageOpen] =
    useState(false);

  const isMyProfile = profile._id === user.userId;
  const isFollowedByMe = profile.followers.includes(user.userId);
  return (
    <div>
      {isMyProfile ? (
        <>
          <SettingsModal
            open={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
          />
          <ChangeProfileImageModal
            open={isChangeProfileImageOpen}
            handleClose={() => setIsChangeProfileImageOpen(false)}
          />
        </>
      ) : (
        <OtherUserSettingsModal
          open={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
        />
      )}
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "30%" }}>
          <Avatar
            alt={profile.username}
            src={
              profile.profileImage
                ? `${server.getUri()}/${profile.profileImage}`
                : ""
            }
            sx={{ width: "10rem", height: "10rem", cursor: "pointer" }}
            onClick={() => {
              if (isMyProfile) {
                setIsChangeProfileImageOpen(true);
              }
            }}
          ></Avatar>
        </Box>
        <Box sx={{ marginLeft: "30px" }}>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Typography variant="h5">{profile.username}</Typography>
            {isMyProfile ? (
              <>
                <Button variant="contained" color="info">
                  Change Profile
                </Button>
                <IconButton onClick={() => setIsSettingsModalOpen(true)}>
                  <SettingsIcon />
                </IconButton>
              </>
            ) : (
              <>
                {isFollowedByMe ? (
                  <>
                    <Button variant="contained" color="info">
                      Following
                    </Button>
                    <Button variant="contained" color="info">
                      Send Message
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => followUser(user.userId, profile._id)}
                  >
                    Follow
                  </Button>
                )}

                <IconButton onClick={() => setIsSettingsModalOpen(true)}>
                  <MoreHorizIcon />
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Typography variant="h6">
              {" "}
              <Typography variant="span" sx={{ fontWeight: "bold" }}>
                {profile.postCount}
              </Typography>{" "}
              posts
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to="./followers"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="span" sx={{ fontWeight: "bold" }}>
                {profile.followers.length}
              </Typography>{" "}
              followers
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to="./following"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="span" sx={{ fontWeight: "bold" }}>
                {profile.follows.length}
              </Typography>{" "}
              following
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6">
              {profile.firstName ? profile.firstName : ""}{" "}
              {profile.lastName ? profile.lastName : ""}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </div>
  );
}

const mapState = (state) => {
  return { profile: state.profile, user: state.user };
};

export default connect(mapState, { followUser })(ProfileHeader);
