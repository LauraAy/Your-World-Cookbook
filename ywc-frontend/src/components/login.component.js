import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Button, OutlinedInput, InputLabel, InputAdornment, 
IconButton, FormControl, TextField, Typography} from '@mui/material';
import { Visibility, VisibilityOff,} from '@mui/icons-material';
import AuthService from "../services/auth.service";


const LoginComponent = () => {

  let navigate = useNavigate();

  //validation functions
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('User name is required'),
    password: Yup.string()
      .required('Password is required')
    });
  
    const {
      register,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });

    //password field show/hide functions
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (data) => {
    const username=data.username
    const password = data.password
   
    AuthService.login(username, password).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
          console.log(message)
        }
      );
  };

  return (
    <>
        <Typography variant="h4" align="center" margin="dense">
          Sign In to Start Cooking!
        </Typography>
          <Box sx={{ ml: "10%", mr: "10%" }}>
            <FormControl fullWidth>
              <TextField
                required
                id="username"
                name="username"
                label="User name"
                placeholder="User name"
                fullWidth
                margin="dense"
                {...register('username')}
                  error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
              </Typography>
            </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register('password')}
                error={errors.password ? true : false}
            />
            {/* <Typography variant="inherit" color="textSecondary">
              {errors.password?.message}
            </Typography> */}
          </FormControl>
          <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleLogin)}
          >
            Sign In
          </Button>
          {message && 
          <Box mt={2} sx={{ border: 2, borderColor: 'red'}}>
            <Typography>
              Error! {message} 
              <br></br>
              Please try again or  <a href="/register">create a new account.</a>
            </Typography>
          </Box>
          }
        </Box>
        </Box>
    </>
  )
};

export default LoginComponent;