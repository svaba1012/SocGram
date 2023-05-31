import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress, List, Box, Typography } from "@mui/material";

import { getSuggestionsForUser } from "../../actions/user-actions";
import UserSuggestionListItem from "./UserSuggestionListItem";
import CurrentUserListItem from "./CurrentUserListItem";

function UserSuggestions({ userId, getSuggestionsForUser, suggestions }) {
  useEffect(() => {
    getSuggestionsForUser(userId);
  }, []);

  if (suggestions.isLoading) {
    return (
      <Box
        sx={{
          width: "200px",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!suggestions.suggestions) {
    return;
  }

  return (
    <>
      <CurrentUserListItem />
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ color: "grey" }}>Suggestions</Typography>
        <Typography
          sx={{
            cursor: "pointer",
            marginLeft: "auto",
            fontWeight: 600,
            color: "inherit",
            textDecoration: "none",
          }}
          component={Link}
          to="explore/users"
        >
          Show more
        </Typography>
      </Box>
      <List>
        {suggestions.suggestions.map((suggestion, id) => (
          <UserSuggestionListItem suggestion={suggestion} key={id} />
        ))}
      </List>
    </>
  );
}

const mapState = (state) => {
  return { suggestions: state.userSuggestions };
};

export default connect(mapState, { getSuggestionsForUser })(UserSuggestions);
