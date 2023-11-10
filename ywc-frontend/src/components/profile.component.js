import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import {Box, Button, Card, CardMedia, Divider, Grid, Typography} from '@mui/material';

const ProfileComponent = () => {
  let navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  // const [currentUser, setCurrentUser] = useState ([]);

  // const getCurrentUser = id => {
  //   AuthService.getOne(id)
  //   .then(response => {
  //     setCurrentUser(response.data)
  //     console.log(response.data)
  //   })
  // } 

  // useEffect(() => {
  //   if(localUser.id)
  //   getCurrentUser(localUser.id);
  // }, [localUser.id]);

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