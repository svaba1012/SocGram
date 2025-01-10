import React, { useState } from "react";
import { searchUsers } from "../../actions/user-actions";
import SearchBar from "../reusables/SearchBar";
import {
  Box,
  CircularProgress,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import UserSuggestionListItem from "./UserSuggestionListItem";
import { Link } from "react-router-dom";
import UserSuggestionListItemSkeleton from "./UserSuggestionListItemSkeleton";

let searchTimeout = null;

const renderUserList = (searchText, users, onItemClicked) => {
  return searchText === "" ? null : !users.isLoading ? (
    users.users.length > 0 ? (
      <List>
        {users.users.map((suggestion, id) => (
          <Link
            to={`/profile/${suggestion.username}`}
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <UserSuggestionListItem
              suggestion={suggestion}
              key={id}
              withFullname
              onClick={() => {
                onItemClicked();
              }}
            />
          </Link>
        ))}
      </List>
    ) : (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "400px",
          alignItems: "center",
        }}
      >
        <Typography>No results found</Typography>
      </Box>
    )
  ) : (
    <List>
      {new Array(5).fill(0).map((_, idx) => (
        <UserSuggestionListItemSkeleton key={idx} />
      ))}
    </List>
  );
};

function SearchUserList({ users, searchUsers, user, onItemClicked }) {
  const [searchText, setSearchText] = useState("");
  return (
    <Box>
      <SearchBar
        value={searchText}
        setValue={(value) => {
          setSearchText(value);
          if (searchTimeout) {
            clearTimeout(searchTimeout);
            searchTimeout = null;
          }
          searchTimeout = setTimeout(() => {
            searchTimeout = null;
            console.log(value);
            console.log(user);
            if (value === "") return;
            searchUsers(user.userId, value);
            console.log(users);
          }, 500);
        }}
      />
      {renderUserList(searchText, users, onItemClicked)}
    </Box>
  );
}

const mapState = (state) => {
  return { users: state.searchedUsers, user: state.user };
};

export default connect(mapState, { searchUsers })(SearchUserList);
