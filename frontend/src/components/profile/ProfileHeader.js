import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import SettingsModal from "../modals/SettingsModal";

function ProfileHeader({ user }) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <div>
      <SettingsModal
        open={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
      />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "30%" }}>
          <Avatar
            alt="Profile pic"
            src="#"
            sx={{ width: "10rem", height: "10rem" }}
          ></Avatar>
        </Box>
        <Box sx={{ marginLeft: "30px" }}>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Typography variant="h5">KIme</Typography>
            <Button variant="contained" color="info">
              Change Profile
            </Button>
            <IconButton onClick={() => setIsSettingsModalOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Typography variant="h6">
              {" "}
              <Typography variant="span" sx={{ fontWeight: "bold" }}>
                13
              </Typography>{" "}
              posts
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="span" sx={{ fontWeight: "bold" }}>
                13
              </Typography>{" "}
              followers
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="span" sx={{ fontWeight: "bold" }}>
                13
              </Typography>{" "}
              following
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6">Prezime i ime</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </div>
  );
}

export default ProfileHeader;
