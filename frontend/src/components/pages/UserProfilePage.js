import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import ProfileHeader from "../profile/ProfileHeader";
import ProfileNaviagtion from "../profile/ProfileNavigation";
import { getUserProfile } from "../../actions/user-actions";
import ProfilePosts from "../profile/ProfilePosts";
import ProfileSavedPosts from "../profile/ProfileSavedPosts";
import ProfilePostModal from "../modals/ProfilePostModal";

const PAGE_TABS = [
  <ProfilePosts />,
  <ProfileSavedPosts />,
  <ProfilePosts isTagged />,
];

function UserProfilePage({ getUserProfile, profile }) {
  let { username } = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  let isPostUrl = location.pathname.startsWith("/posts", 0);
  useEffect(() => {
    if (!isPostUrl) {
      getUserProfile(username);
    }
  }, [username, getUserProfile, isPostUrl]);

  if (!profile.username) {
    return <div></div>;
  }
  return (
    <Container>
      {isPostUrl ? (
        <ProfilePostModal
          open={isPostUrl}
          handleClose={() => {
            navigate(-1);
          }}
        />
      ) : (
        ""
      )}
      <ProfileHeader></ProfileHeader>
      <ProfileNaviagtion />
      {!isPostUrl ? <Outlet /> : PAGE_TABS[0]}
    </Container>
  );
}

const mapState = (state) => {
  return { profile: state.profile };
};

export default connect(mapState, { getUserProfile })(UserProfilePage);
