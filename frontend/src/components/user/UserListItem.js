import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import server from "../../config/server";
import StopFollowingModal from "../modals/StopFollowingModal";
import CustomUserListItem from "./CustomUserListItem";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#CCCCCC",
      light: "#EEEEEE",
      dark: "#999999",
      contrastText: "#000",
    },
  },
});

function UserListItem({ user }) {
  let [isStopFollowingModalOpen, setIsStopFollowingModalOpen] = useState(false);
  
  const isFollowedByMe = true;
  const renderButtons =  () => {

    if(!isFollowedByMe){
    
      return <Button
      variant="contained"
      sx={{
        marginLeft: "auto",
      }}
      onClick={() => {}}
      >
        Follow
      </Button>
      }else{
    
        
        return <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          sx={{
            marginLeft: "auto",
          }}
          color="neutral"
          onClick={(e) => {
            e.preventDefault();
            setIsStopFollowingModalOpen(true);
          }}
          >
          Already following
        </Button>
      </ThemeProvider>
        }
    }

  return (
    <>
      <StopFollowingModal
        user={user}
        open={isStopFollowingModalOpen}
        handleClose={() => setIsStopFollowingModalOpen(false)}
      />

      <CustomUserListItem user={user} isLink renderButtons={renderButtons}/>
    </>
  );
}

export default UserListItem;
