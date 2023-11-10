import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

const styles = {
  borderBox: {
    position: 'relative',
    textAlign: 'left', 
    margin: '10px',
    padding: '20px',
    color: green[900],
    border: '5px solid',
  }
}

const ProfileEdit = () => {
	let navigate = useNavigate();
	const localUser = AuthService.getCurrentUser();

  const [currentUser, setCurrentUser] = useState ([]);

  const getCurrentUser = id => {
    AuthService.getOne(id)
    .then(response => {
      setCurrentUser(response.data)
      console.log(response.data)
    })
  } 

  useEffect(() => {
		console.log(localUser)
    if(localUser.id)
    getCurrentUser(localUser.id);
  }, [localUser.id]);

	//react-hook-form and yup functions
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('User name is required.'),
		email: Yup.string()
      .required('Email is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    values: { username: currentUser.username, email: currentUser.email, about: currentUser.about},
  });

  //update user
  const updateUser = (formData) => {
    var data = {
			id: currentUser.id,
      username: formData.username,
      email: formData.email,
      about: formData.about,
    };

    AuthService.update(currentUser.id, data)
      .then(response => {
				localStorage.setItem("user", JSON.stringify(data));
        console.log(data);
        navigate("/profile")
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
	<>
		<Typography variant="h4" align="center" margin="dense">
			Edit Your Profile
    </Typography>
    <Box style={styles.borderBox}>
      <FormControl fullWidth>
        <TextField
          sx={{ mt: 2, mb: 2 }}
          id="username"
          name="username"
          label="User Name"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="dense"
          multiline
          rows={1}
          {...register('username')}
          error={errors.username ? true : false}
        />
				<TextField
          sx={{ mt: 2, mb: 2 }}
          id="email"
          name="email"
          label="Email"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="dense"
          multiline
          rows={1}
          {...register('email')}
          error={errors.email ? true : false}
        />
				<TextField
          sx={{ mt: 2, mb: 2 }}
          id="about"
          name="about"
          label="About"
					multiline
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="dense"
          {...register('about')}
          error={errors.about ? true : false}
        />
			</FormControl>
		</Box>
		<Button
			onClick={handleSubmit(updateUser)}
			sx={{my: 2}}
			variant="contained"
			>
			Update
			</Button>  
	</>
	)
}

export default ProfileEdit;
