import React, { useState } from "react";
import { connect } from "react-redux";
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
import ClearIcon from "@mui/icons-material/Clear";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";

import SideMenuItem from "./SideMenuItem";
import NewPostModal from "../modals/NewPostModal";
import server from "../../config/server";
import zIndex from "@mui/material/styles/zIndex";
import SideDrawerContent from "../reusables/SideDrawerContent";
import SearchBar from "../reusables/SearchBar";
import SearchUsersDrawer from "../user/SearchUsersDrawer";

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
    to: "/posts",
    activeIcon: <FavoriteOutlinedIcon />,
  },
  {
    text: "Make a post",
    icon: <AddBoxOutlinedIcon />,

    activeIcon: <AddBoxIcon />,
  },
  { text: "Profile", to: "/profile/", avatarUrl: "/" },
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
  let [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  let [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");
  let searchId = menuItems.findIndex((el) => el.text === "Search");
  let newPostId = menuItems.findIndex((el) => el.text === "Make a post");
  let profileId = menuItems.findIndex((el) => el.text === "Profile");
  menuItems[newPostId].onClick = () => setIsNewPostModalOpen(true);
  menuItems[searchId].onClick = () =>
    setIsSearchDrawerOpen(!isSearchDrawerOpen);
  menuItems[profileId].to = `/profile/${props.user.username}`;
  menuItems[profileId].avatarUrl = `${server.getUri()}/${
    props.user.profileImage
  }`;

  let match = useMediaQuery("(min-width:1250px)") && !isSearchDrawerOpen;
  let drawerWidth = match ? drawerDesktopWidth : drawerMidWidth;
  return (
    <>
      <Drawer variant="permanent" anchor="left" sx={{ width: drawerWidth }}>
        <NewPostModal
          open={isNewPostModalOpen}
          handleClose={() => setIsNewPostModalOpen(false)}
        />

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
                handleClick={() => {
                  item.onClick ? item.onClick() : setDrawerActiveItem(index);
                }}
              />
            ))}
          </List>
        </Box>
      </Drawer>
      <Drawer
        // variant="permanent"
        open={isSearchDrawerOpen}
        onClose={() => setIsSearchDrawerOpen(!isSearchDrawerOpen)}
        sx={{ zIndex: "1000" }}
        PaperProps={{ style: { borderRadius: "15px" } }}
      >
        <SideDrawerContent title={"Search"} width={drawerDesktopWidth * 1.5}>
          <SearchUsersDrawer
            onItemClicked={() => setIsSearchDrawerOpen(false)}
          />
          {/* <SearchBar value={searchQuery} setValue={setSearchQuery} /> */}
        </SideDrawerContent>
      </Drawer>
    </>
  );
}

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState, {})(SideMenu);
