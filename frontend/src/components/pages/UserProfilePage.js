import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ProfileHeader from "../profile/ProfileHeader";
import ProfileNaviagtion from "../profile/ProfileNavigation";

function UserProfilePage(props) {
  return (
    <Container>
      <ProfileHeader></ProfileHeader>
      <ProfileNaviagtion />
      <Outlet />
    </Container>
  );
}

export default UserProfilePage;
