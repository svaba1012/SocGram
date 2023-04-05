import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function SideMenuItem({
  to,
  text,
  icon,
  avatarUrl,
  isWideScreen,
  handleClick,
  activeIcon,
  isActive,
}) {
  icon = isActive ? activeIcon : icon;
  return (
    <Link
      to={to}
      style={{ textDecoration: "none", color: "inherit" }}
      onClick={handleClick}
    >
      <ListItem key={text} disablePadding>
        <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
          {isWideScreen && icon ? <ListItemIcon>{icon}</ListItemIcon> : ""}
          {isWideScreen && avatarUrl ? (
            <ListItemAvatar>
              <Avatar alt="Profile Image" src={avatarUrl} />
            </ListItemAvatar>
          ) : (
            ""
          )}

          {isWideScreen ? (
            <ListItemText
              disableTypography
              primary={
                <Typography style={isActive ? { fontWeight: "bolder" } : {}}>
                  {text}
                </Typography>
              }
            />
          ) : (
            icon || <Avatar alt="Profile Image" src={avatarUrl} />
          )}
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default SideMenuItem;
