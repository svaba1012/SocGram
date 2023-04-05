import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Divider, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ListIcon from "@mui/icons-material/List";
import SendIcon from "@mui/icons-material/Send";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import SideMenuItem from "./SideMenuItem";

const menuItems = [
  {
    text: "Home",
    icon: <HomeOutlinedIcon />,
    to: "/",
    activeIcon: <HomeIcon />,
  },
  {
    text: "Search",
    icon: <SearchOutlinedIcon />,
    to: "/",
    activeIcon: <SearchIcon />,
  },
  {
    text: "Explore",
    icon: <ExploreOutlinedIcon />,
    to: "/explore",
    activeIcon: <ExploreIcon />,
  },
  {
    text: "Chat",
    icon: <SendOutlinedIcon />,
    to: "/chat/inbox",
    activeIcon: <SendIcon />,
  },
  {
    text: "Notification",
    icon: <FavoriteBorderIcon />,
    to: "/",
    activeIcon: <FavoriteOutlinedIcon />,
  },
  { text: "Profile", to: "/profile/123", avatarUrl: "/" },
  {
    text: "More",
    icon: <ListOutlinedIcon />,
    to: "/",
    activeIcon: <ListIcon />,
  },
];

const drawerDesktopWidth = 280;
const drawerMidWidth = 80;

function SideMenu(props) {
  let [drawerActiveItem, setDrawerActiveItem] = useState(0);
  let match = useMediaQuery("(min-width:1250px)");
  let drawerWidth = match ? drawerDesktopWidth : drawerMidWidth;
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: drawerWidth }}>
      <Box role="presentation" sx={{ width: drawerWidth - 10 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            {match ? "SocGram" : <ListIcon />}
          </Typography>
        </Link>

        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <SideMenuItem
              {...item}
              key={index}
              id={index}
              isWideScreen={match}
              isActive={drawerActiveItem === index}
              handleClick={() => setDrawerActiveItem(index)}
            />
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default SideMenu;
