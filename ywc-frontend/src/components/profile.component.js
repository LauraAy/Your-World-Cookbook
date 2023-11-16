import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import {Box, Button, Typography} from '@mui/material';

const ProfileComponent = () => {
  let navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  //navigate to edit recipe
  const editUser = () => {
    navigate("/profile/edit")
  }

  return (
  <>
    <Box p="20px" spacing={2}>
      <Typography variant="h4">
        {currentUser.username}
      </Typography>
      <Typography variant="body1"sx={{ m: 1 }}>
        <strong>Email: </strong>
        {currentUser.email}
      </Typography>
     
      {currentUser.about ? (
      <>
        <Typography variant="body1"sx={{ m: 1 }}>
          <strong>About: </strong>
          {currentUser.about}
        </Typography>
      </>
      ):(
      <>
        <Typography>
        Complete your profile by sharing some more about you.
        </Typography>
      </>
      )}
    </Box>
    <Button
        onClick={editUser}
        sx={{my: 2, mx: 4}}
        variant="contained"
      >
        Edit Profile
      </Button>
  </>
  );
};

export default ProfileComponent;