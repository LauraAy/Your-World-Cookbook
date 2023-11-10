import '../styles.scss'

import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import CreatorRecipeDataService from "../services/creatorRecipe.service";
import { Box, Button, Divider, Grid, Tooltip, Typography, } from '@mui/material';
import { Delete, WidthWideTwoTone } from  '@mui/icons-material';
import creatorImg from "../images/creator.png"

const CreatorViewComponent = params => {
  const { id } = useParams();
  let navigate = useNavigate(); 

  const [currentRecipe, setCurrentRecipe] = useState ([]);
  const [ creator, setCreator] = useState ([])

  //get creator for current recipe
  const getRecipeCreators = id => {
    CreatorRecipeDataService.getRecipeCreators(id)
    .then(response => {
      setCurrentRecipe(response.data);
      setCreator(response.data.creator)
      console.log(response.data);
      console.log(creator)
    })
    .catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    if(id)
    getRecipeCreators(id);
  }, [id]);

  //navigation functions
  const goAddCreator = () => {
    navigate("/creators/add/" + id)
  }

  const editCreator = currentCreatorId => {
    const recipeId = currentRecipe.id
    const creatorId = currentCreatorId

    navigate("/creators/edit/" + recipeId + "/" + creatorId)
  }

  const refreshPage = () => {
    navigate(0);
  }

  //Remove creator from this recipe
  const removeCreator = currentCreatorId => {
    const recipeId = currentRecipe.id
    const creatorId = currentCreatorId

    CreatorRecipeDataService.removeCreator(recipeId, creatorId)
    .then(response => {
      console.log(response.data)
      refreshPage()
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
  <>
    {creator.length ? (
    <>
    <Grid container>
      <Grid item xs={12}>
        <Box  mx={4} sx={{ display: {xs: 'block', sm: 'none', md: 'none'}}}>
        <img
          src={creatorImg} 
          alt="A chef's hat and a wooden spoon."
          style={{ maxHeight: '150px'}}
        />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
      {creator.map((creator) => 
        <Box mt={2}>
          <Typography 
            variant="h4" 
            mx={4}
            sx={{ color: "creator.main"}}
          >
            {creator.creatorName}
          </Typography>
          <Box mx={4} mb={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1"sx={{ m: 1 }}>
                  {creator.about && (
                  <>
                    <strong>About: </strong>
                    {creator.about}
                  </>
                  )}
                </Typography>
                <Typography variant="body1"sx={{ m: 1 }}>
                  {creator.link && (
                  <>
                    <strong>Webpage: </strong>
                    <a href={creator.link}>
                      {creator.link}
                    </a>
                  </>
                  )}
                </Typography>
              <Tooltip title="Edit this creator.">
                <Button
                  onClick={() => {editCreator(creator.id)}}
                  variant="outlined"
                  color="creator"
                  sx={{ my: 2 }}
                >
                  Edit Creator
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Tooltip title="Remove this creator from recipe.">
                <Button 
                  onClick={() => {removeCreator(creator.id)}}
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                >
                  Remove
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Divider></Divider>
      </Box> 
    )}
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Box sx={{ display: {xs: 'none', sm: 'none', md: 'block'}}}>
          <img 
            src={creatorImg} 
            alt="chef's hat with wooden spoon"
            style={{maxHeight: '300px'}}
          />
        </Box>
        <Box sx={{ display: {xs: 'none', sm: 'block', md: 'none'}}}>
          <img 
            src={creatorImg} 
            alt="chef's hat with wooden spoon"
            style={{maxHeight: '200px'}}
          />
        </Box>
      </Grid>
      <Tooltip title="Add another region to this recipe.">
        <Button 
          onClick={goAddCreator}
          variant="outlined"
          color="creator"
          sx={{ m: 2 }}
        >
          Add Another Creator
        </Button>
      </Tooltip>
    </Grid>
    </>
    ):(
    <>
      <Typography variant="h4" sx={{ color: "creator.main"}}>Add a creator for this recipe now!</Typography>
      <Typography variant="subtitle1">   Was this recipe passed down from a beloved family member or invented by a famous chef you admire?
        Add the names of the person or people who created your recipe, and record some information about them.</Typography>
      <Tooltip title="Add a creator to this recipe.">
        <Button 
          onClick={goAddCreator}
          variant="contained"
          sx={{ m: 2, backgroundColor: 'creator.main', borderColor: 'creator.main', ":hover": { backgroundColor: 'creator.light'} }}
        >
          Add Creator
        </Button>
      </Tooltip>
    </>
    )}
  </>
  )
}           


export default CreatorViewComponent