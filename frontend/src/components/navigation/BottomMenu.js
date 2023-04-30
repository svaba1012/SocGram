import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import TelegramIcon from "@mui/icons-material/Telegram";

function BottomMenu(props) {
  const [value, setValue] = React.useState(0);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        // showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          component={Link}
          to="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Search"
          component={Link}
          to="/explore"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Chat"
          component={Link}
          to="/chat/inbox"
          icon={<TelegramIcon />}
        />

        <BottomNavigationAction
          label="Profile"
          component={Link}
          to="/profile/123"
          icon={<Avatar alt="Profile Image" src="/" />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomMenu;
