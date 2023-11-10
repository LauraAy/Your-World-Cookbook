import React, { useState, useEffect } from "react";
import {Box, Button, Card, CardMedia, Container, Divider, Grid, Typography} from '@mui/material';
import {DoubleArrow} from '@mui/icons-material';
import AuthService from "../services/auth.service";
import cuttingBoard from "../images/cuttingBoard.png";
import japaneseTea from "../images/japaneseTea2.png"
import globe from "../images/globe.png"
import creator from "../images/creator.png"
import pairing from "../images/pairing.png"
import { purple, blue, green } from '@mui/material/colors';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StayPrimaryLandscape } from "@mui/icons-material";


const HomeComponent = () => {
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
		const user = AuthService.getCurrentUser();
		if (user) {
			setCurrentUser(user);
			console.log(user)
			console.log(user.username)
		    // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
		    // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
		}
	}, []);

  const styles = {
  
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    media2: {
      height: 0,
      paddingTop: '80%' // 16:9
    },
    topCard: {
      position: 'relative',
      textAlign: 'center', 
      margin: '10px'

    },
    card: {
      position: 'relative',
      textAlign: 'center', 
      marginTop: '30px',
      marginLeft: '10px',
      marginRight: '10px',
    },
    textCard: {
      position: 'relative',
      textAlign: 'left', 
      padding: '20px',
      fontStyle: 'italic',
      fontWeight: 'bold',
      marginTop: '30px',
      marginLeft: '10px',
      marginRight: '10px',
    },
    regionCard: {
      position: 'relative',
      textAlign: 'left', 
      margin: '10px',
      padding: '20px',
      fontWeight: 'bold',
      color: blue[900],
      border: '5px solid',
      minHeight: '100px',
    },
    creatorCard: {
      position: 'relative',
      textAlign: 'left', 
      margin: '10px',
      padding: '20px',
      fontWeight: 'bold',
      color: purple[900],
      border: '5px solid #4527a0',
      minHeight: '100px',
    },
    pairingCard: {
      position: 'relative',
      textAlign: 'left', 
      margin: '10px',
      padding: '20px',
      fontWeight: 'bold',
      color: 'darkRed',
      border: '5px solid darkRed',
      minHeight: '100px',
    },
    aboutCard: {
      position: 'relative',
      textAlign: 'left', 
      marginTop: '30px',
      marginLeft: '10px',
      marginRight: '10px',
      padding: '20px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: green[900]
    },
    aboutBox: {
      position: 'relative',
      align: 'right',
      marginTop: '20px',
      margin: '10px',
      padding: '20px',
      color: '#ffffff',
      border:  '2px solid #ffffff',
      borderRadius: '5%'
    },
    overlay: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#ffffff',
      textShadow: '2px 2px 3px #1b5e20, -2px -2px 3px #1b5e20',
      borderRadius: '10px',
    }
  }

  //animation functions
  const appearBox = {
    visible: { opacity: 1, scale: 1, transition: { duration: 2 } },
    hidden: { opacity: 0, scale: 0 }
  };

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  

  const register = () => {
    navigate('/register')
  }

  const login = () => {
    navigate('/login')
  }

  const about = () => {
    navigate('/about/')
  }

  const addRecipe = () => {
    navigate('/recipes/add')
  }

  return (
  <>
    { currentUser ? (
    <>
    <Card style={styles.topCard}>
      <CardMedia image={cuttingBoard} alt="A cutting board with veggies and other food prep."style={styles.media}/> 
      <Typography variant='h3' color='primary.main' style={styles.overlay} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }}}>
        Welcome to Your World CookBook {currentUser.username}
      </Typography>
      <Typography variant='h4' color='primary.main' style={styles.overlay} sx={{display: { xs: 'none', sm: 'flex', md: 'none'}}}>
        Welcome to Your World CookBook {currentUser.username}
      </Typography>
      <Typography variant='h5' color='primary.main' style={styles.overlay} sx={{display: { xs: 'flex', sm: 'none' }}}>
        Welcome {currentUser.username}
      </Typography>
    </Card>
    <Box style={styles.card}>
    <Typography variant='h4' sx={{ display: { xs: 'none', sm: 'block'}, textAlign: 'center'}}>
      Add a new recipe now!
    </Typography>
    <Typography  variant='h5' sx={{  display: { xs: 'block', sm: 'none'}, textAlign: 'center'}}>
      Add a new recipe now!
    </Typography>
    <Button variant='contained' onClick={addRecipe} sx={{align: 'center', mt: '5px'}}>
      Add New Recipe
    </Button>
    </Box>
    <Card style={styles.textCard} >
      <Typography variant='h5' sx={{ color: 'greyQuote.main', display: { xs: 'none', sm: 'none', md: 'flex' }}}>
        When you make food you are connecting with the personal world of your home, the local world of the community of
        friends and family who will share your food, and the larger world of recipes invented in kitchens in different 
        countries across the globe. 
      </Typography>
      <Typography variant='h6' sx={{ color: 'greyQuote.main', display: { sm: 'flex', md: 'none' }}}>
        When you make food you are connecting with the personal world of your home, the local world of the community of
        friends and family who will share your food, and the larger world of recipes invented in kitchens in different 
        countries across the globe. 
      </Typography>
    </Card>

    <Box style={styles.card} >
      <Typography variant='h5'> 
        Your World Cookbook allows you to add context to your recipes.
      </Typography>
    </Box>
    <Grid container spacing={1}>
      <Grid item xs={12} >
        <motion.div
          className="box"
          ref={ref}
          // variants={appearBox}
          whileInView= {{opacity: 1, scale: 1, transition: { duration: 2 }}}
          initial={{ opacity: 0, scale: 0 }}
          animate={control}
        >
          <Box style={styles.regionCard} >
            <Box sx={{ float: 'left'}}>
                <img
                  src={globe} 
                  alt="A globe showing the countries of the world."
                  style={{ maxHeight: '100px'}}
                />
              </Box>
                <Typography variant='h6' sx={{color: 'secondary.main', paddingTop: {xs: 'none', sm: '20px', md: '30px'}}}>
                  Where in the world is this recipe from? Add the region or 
                  regions where it originated.
                </Typography>
            
          </Box>
        </motion.div>
      </Grid>
      <Grid item xs={12} >
        <motion.div
          className="box"
          ref={ref}
          // variants={appearBox}
          whileInView= {{opacity: 1, scale: 1, transition: { duration: 2 }}}
          initial={{ opacity: 0, scale: 0 }}
          animate={control}
        >
          <Box style={styles.creatorCard} >
            <Box sx={{ float: 'left', marginRight: "20px"}}>
              <img
                src={creator} 
                alt="A chef's hat and a wooden spoon."
                style={{ maxHeight: '100px'}}
              />
            </Box>
            <Typography variant='h6' sx={{color: 'creator.main', paddingTop: {xs: 'none', sm: '20px', md: '30px'}}}>
              Who is the genius behind this recipe? Add the person who created it.
            </Typography>
          </Box>
        </motion.div>
      </Grid>
      <Grid item xs={12} >
        <motion.div
          className="box"
          ref={ref}
          // variants={appearBox}
          whileInView= {{opacity: 1, scale: 1, transition: { duration: 2 }}}
          initial={{ opacity: 0, scale: 0 }}
          animate={control}
        >
          <Box style={styles.pairingCard}>
            <Box sx={{ float: 'left', marginRight: "20px"}}>
              <img
                src={pairing} 
                alt="Two wine glasses with music notes behind them."
                style={{ maxHeight: '100px'}}
              />
            </Box>
            <Typography variant='h6' sx={{color: 'pairing.main'}}>
              What are the perfect pairings for this recipe? Add music, games, drinks or more to pair with this dish.
            </Typography>
          </Box>
        </motion.div>
      </Grid>
    </Grid>
    <Card style={styles.aboutCard} >
      <Typography variant='h5' sx={{color: 'white', backgroundColor: 'primary.main', fontStyle: 'italic'}}>
        Rooted in Collaboration
      </Typography>
      <Divider color='white'></Divider>
      <Typography variant='h6' sx={{color: 'white', backgroundColor: 'primary.main', marginTop:'5px'}}>
        Your World Cookbook started with a group of friends separated by hundreds of miles during 
        the pandemic who came together for virtual cooking experiences to try recipes from around the world.
      </Typography>
      <motion.div
        className="hoverBox"
        whileHover={{ scale: [null, 1.4, 1.3] }}
        transition={{ duration: 0.3 }}
      >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box 
          style={styles.aboutBox}
          sx={{ display: 'inline-flex' }}
          onClick={about}
        >
          <Typography>
            About
          </Typography>
          <DoubleArrow />
        </Box>
      </Box>
      </motion.div>
    </Card>

    <Card style={styles.textCard} >
      <Typography variant='h5' sx={{ color: 'greyQuote.main', display: { xs: 'none', sm: 'none', md: 'flex' }}}>
        Whether it's a recipe you found on the internet or a treasured family meal passed down through 
        generations, Your World Cookbook is the the place to record the recipes that are a part of your own cooking world
        while also recording the people and places they come from. 
      </Typography>
      <Typography variant='h6' sx={{ color: 'greyQuote.main', display: { sm: 'flex', md: 'none' }}}>
        Whether it's a recipe you found on the internet or a treasured family meal passed down through 
        generations, Your World Cookbook is the the place to record the recipes that are a part of your own cooking world
        while also recording the people and places they come from. 
      </Typography>
    </Card>
    <Box style={styles.card}>
      <Typography variant='h4' sx={{ display: { xs: 'none', sm: 'block'}, textAlign: 'center'}}>
        Get started adding recipes now!
      </Typography>
      <Typography  variant='h5' sx={{  display: { xs: 'block', sm: 'none'}, textAlign: 'center'}}>
        Get started adding recipes now!
      </Typography>
      <Button variant='contained' onClick={addRecipe} sx={{align: 'center', mt: '5px'}}>
        Add New Recipe
      </Button>
    </Box>
    </>
    ):(
    <>
    <Card style={styles.card}>
      <CardMedia image={japaneseTea} alt="A japanese tea set and asian style bowl with vegetables inside."style={styles.media2}/> 
      <Typography variant='h2' color='primary.main' style={styles.overlay} sx={{display: { xs: 'none', sm: 'none', md: 'flex' }}}>
        Welcome to Your World Cookbook
      </Typography>
      <Typography variant='h3' color='primary.main' style={styles.overlay} sx={{display: { xs: 'none', sm: 'flex', md: 'none'}}}>
        Welcome to Your World Cookbook
      </Typography>
      <Typography variant='h4' color='primary.main' style={styles.overlay} sx={{display: { xs: 'flex', sm: 'none' }}}>
        Welcome to Your World Cookbook
      </Typography>
    </Card>
    <Box style={styles.card}>
    <Typography variant='h4' sx={{textAlign: 'center'}}>
      Get Started! Sign up or sign in now. 
    </Typography>
    <Button 
      variant='contained' 
      sx={{align: 'center', m: '10px'}}
      onClick={register}
    >
      Sign Up
    </Button>
    <Button 
      variant='contained' 
      sx={{align: 'center', m: '10px' }}
      onClick={login}
    >
      Sign In
    </Button>
    </Box>
    </>
    
    )}
  </>  
  );
};

export default HomeComponent;