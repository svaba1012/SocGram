import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { connect } from "react-redux";
import ProfileHeader from "../profile/ProfileHeader";
import ProfileNaviagtion from "../profile/ProfileNavigation";
import { getUserProfile } from "../../actions";

function UserProfilePage({ getUserProfile, profile }) {
  let { username } = useParams();
  useEffect(() => {
    getUserProfile(username);
  }, []);

  if (!profile.username) {
    return <div></div>;
  }
  return (
    <Container>
      <ProfileHeader></ProfileHeader>
      <ProfileNaviagtion />
      <Outlet />
    </Container>
  );
}

const mapState = (state) => {
  return { profile: state.profile };
};

export default connect(mapState, { getUserProfile })(UserProfilePage);
