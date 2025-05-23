import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RecipeDataService from "../services/recipe.service";
import { Box, Button, Divider, Tooltip, Typography, } from '@mui/material';
import parser from "html-react-parser";
import recipe from "../images/recipe2.png";

const RecipeViewComponent = props => {
  let navigate = useNavigate();

  const { id } = useParams();
  const initialRecipeState = {
    id: null,
    title: "",
    description: "",
    recipeType: "",
    servingSize: null,
    ingredients: "",
    directions: "",
    source: "",
    userId: undefined
  };
    
  const [currentRecipe, setCurrentRecipe] = useState ([]);

  //get current recipe
  const getRecipe = id => {
    RecipeDataService.get(id)
    .then(response => {
      setCurrentRecipe(response.data);
      console.log(response.data);
      localStorage.removeItem('ingredients-content')
      localStorage.removeItem('directions-content')
    })
    .catch(e => {
      console.log(e);
    });
  };

console.log(localStorage.getItem('ingredients'))
  
  useEffect(() => {
    if(id)
    getRecipe(id);
  }, [id]);

  //navigate to edit recipe
  const editRecipe = () => {
    navigate("/recipes/edit/" + currentRecipe.id)
  }

  return (
  <>
    <Box mx={4}>
      <Box>
        <Typography variant="h4">{currentRecipe.title}</Typography>
      </Box>
      <Box sx={{ display: {xs: 'none', sm: 'none', md: 'block'}, float: {xs: 'none', sm: 'right'}}}>
        <img 
            src={recipe} 
            alt="recipe card with vegetables"
            style={{maxHeight: '300px'}}
          />
      </Box>
      <Box sx={{ display: {xs: 'none', sm: 'block', md: 'none'}, float: {xs: 'none', sm: 'right'}}}>
        <img 
            src={recipe} 
            alt="recipe card with vegetables"
            style={{maxHeight: '200px'}}
          />
      </Box>
      <Box sx={{ display: {xs: 'block', sm: 'none', md: 'none'}, float: {xs: 'none', sm: 'right'}}}>
        <img 
            src={recipe} 
            alt="recipe card with vegetables"
            style={{maxHeight: '150px'}}
          />
      </Box>

      {currentRecipe.recipeType && (
        <>
          <Typography variant="h5"sx={{ m: 1 }}>
            Recipe Type:
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {currentRecipe.recipeType} 
          </Typography>
        </>
      )}

      {currentRecipe.servingSize && (
        <>
          <Typography variant="h5"sx={{ m: 1 }}>
            Serving Size:
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {currentRecipe.servingSize}
          </Typography>
        </>
      )}

      {currentRecipe.prepTime && (
        <>
          <Typography variant="h5"sx={{ m: 1 }}>
            Prep Time:
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {currentRecipe.prepTime}
          </Typography>
        </>
      )}

      {currentRecipe.cookTime && (
        <>
          <Typography variant="h5"sx={{ m: 1 }}>
            Cook Time:
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {currentRecipe.cookTime}
          </Typography>
        </>
      )}
        
      {currentRecipe.ingredients && (
        <>
          <Typography variant="h5"sx={{ m: 1 }}>
            Ingredients: 
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {parser(currentRecipe.ingredients)}
          </Typography>
        </>
      )}
    
    
      {currentRecipe.directions && (
        <>
          <Typography variant="h5"sx={{ m: 1 }}>
            Directions
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {parser(currentRecipe.directions)}
          </Typography>
        </>
      )}
    
      <Divider></Divider>
    </Box>

    <Tooltip title="Edit this recipe.">
      <Button
        onClick={editRecipe}
        sx={{my: 2, mx: 4}}
        variant="outlined"
      >
        Edit Recipe
      </Button>
    </Tooltip>
  </>
)}

export default RecipeViewComponent