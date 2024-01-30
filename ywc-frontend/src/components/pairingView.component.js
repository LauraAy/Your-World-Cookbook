import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PairingRecipeDataService from "../services/pairingRecipe.service";
import RecipeDataService from "../services/recipe.service";
import { Box, Button, Divider, Grid, Tooltip, Typography, } from '@mui/material';
import { Delete } from  '@mui/icons-material';
import pairingImg from '../images/pairing.png'

const PairingViewComponent = params => {
  const { id } = useParams();
  let navigate = useNavigate(); 

  const [currentRecipe, setCurrentRecipe] = useState ([]);
  const [ pairing, setPairing] = useState ([])
  const [recipeOne, setRecipeOne] = useState ([])
  const [recipeOneId, setRecipeOneId] = useState ("")
  const [recipeTwo, setRecipeTwo] = useState ([])
  const [recipeTwoId, setRecipeTwoId] = useState ("")
  const [recipeThree, setRecipeThree] = useState ([])
  const [recipeThreeId, setRecipeThreeId] = useState ("")
  const [recipes, setRecipes] = useState ([])

  //get up to three related recipes
  const getRecipeOne = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeOne(response.data)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  const getRecipeTwo = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeTwo(response.data)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  const getRecipeThree = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeThree(response.data)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  //get recipe pairing
  const getRecipePairings = id => {
    PairingRecipeDataService.getRecipePairings(id)
    .then(response => {
      setCurrentRecipe(response.data);
      setPairing(response.data.pairings)
      if(response.data.pairings.recipeOne !== null) {
        setRecipeOneId(response.data.pairings.recipeOne)
      }
      if(response.data.pairings.recipeTwo !== null) {
        setRecipeTwoId(response.data.pairings.recipeTwo)
      }
      if(response.data.pairings.recipeThree !== null) {
        setRecipeThreeId(response.data.pairings.recipeThree)
      }
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    if(id)
    getRecipePairings(id);
  }, [id]);


  useEffect(() => {
    if (recipeOneId) {
      getRecipeOne(recipeOneId)
    } else {
      console.log("not there")
    }

    if (recipeTwoId) {
      getRecipeTwo(recipeTwoId)
    } else {
      console.log("not there")
    }

    if (recipeThreeId) {
      getRecipeThree(recipeThreeId)
    } else {
      console.log("not there")
    }

  }, [recipeOneId, recipeTwoId, recipeThreeId]);

  //navigation functions
  const goAddPairing = () => {
    navigate("/pairings/add/" + id)
  }

  const editPairing = () => {
    navigate("/pairings/edit/" + currentRecipe.id + "/" + pairing.id)
  }

  // const recipeOneNav = () => {
  //   console.log(recipeOne.id)
  // };
  const recipeOneNav = () => {

    const recipeId = recipeOne.id
    
    navigate("/recipes/" + recipeId)
  };

  const recipeTwoNav = () => {

    const recipeId = recipeTwo.id
    
    navigate("/recipes/" + recipeId)
  };
  const recipeThreeNav = () => {

    const recipeId = recipeThree.id
    
    navigate("/recipes/" + recipeId)
  };

  const refreshPage = () => {
    navigate(0);
  }

  //Remove pairing from this recipe
  const removePairing = currentPairingId => {
    const recipeId = currentRecipe.id
    const pairingId = currentPairingId

    PairingRecipeDataService.removePairing(recipeId, pairingId)
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
    {pairing ? (
    <>
    <Grid container>
      <Grid item xs={12}>
        <Box  mx={4} sx={{ display: {xs: 'block', sm: 'none', md: 'none'}}}>
          <img
            src={pairingImg} 
            alt="A chef's hat and a wooden spoon."
            style={{ maxHeight: '150px', align: 'center'}}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        <Box mt={2}>
          <Typography 
            variant="h4" 
            mx={4}
            sx={{color: "pairing.main"}}
          >
            {pairing.pairingName}
          </Typography>
          <Box mx={4} mb={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                {pairing.description && (
                  <>
                    <Typography variant="h5"sx={{ m: 1, color: "pairing.main"}}>
                      Description
                    </Typography>
                    <Typography variant="body1"sx={{ m: 1 }}>
                      {pairing.description}
                    </Typography>
                  </>
                )}
                {pairing.drinks && (
                  <>
                    <Typography variant="h5"sx={{ m: 1, color: "pairing.main"}}>
                      Drinks:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {pairing.drinks}
                    </Typography>
                  </>
                )}
                {pairing.shows && (
                  <>
                    <Typography variant="h5"sx={{ m: 1, color: "pairing.main"}}>
                      Shows:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {pairing.shows}
                    </Typography>
                  </>
                )}
                {pairing.books && (
                  <>
                    <Typography variant="h5"sx={{ m: 1, color: "pairing.main"}}>
                      Books:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {pairing.books}
                    </Typography>
                  </>
                )}
                {pairing.games && (
                  <>
                    <Typography variant="h5"sx={{ m: 1, color: "pairing.main"}}>
                      Games:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {pairing.games}
                    </Typography>
                  </>
                )}
               
                {pairing.music && (
                  <>
                    <Typography variant="h5"sx={{ m: 1, color: "pairing.main"}}>
                      Music:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {pairing.music}
                    </Typography>
                  </>
                )}
                {pairing.decor && (
                  <>
                    <Typography variant="h5"sx={{ m: 1, color: "pairing.main"}}>
                      Crafts and decor:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {pairing.decor}
                    </Typography>
                  </>
                )}
                {pairing.more && (
                  <>
                    <Typography variant="h5"sx={{ m: 1, color: "pairing.main"}}>
                      More:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {pairing.more}
                    </Typography>
                  </>
                )}
                {pairing.recipeOne && (
                  <>
                    <Typography variant="h5" sx={{ m: 1, color: "pairing.main"}}>
                      Related Recipe 1:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {recipeOne.title}
                    </Typography>
                    <Button
                      onClick={recipeOneNav}
                    >
                      View Recipe
                    </Button>
                  </>
                )}
                {pairing.recipeTwo && (
                  <>
                    <Typography variant="h5" sx={{ m: 1, color: "pairing.main"}}>
                      Related Recipe 2:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {recipeTwo.title}
                    </Typography>
                    <Button
                      onClick={recipeTwoNav}
                    >
                      View Recipe
                    </Button>
                  </>
                )}
                {pairing.recipeThree && (
                  <>
                    <Typography variant="h5" sx={{ m: 1, color: "pairing.main"}}>
                      Related Recipe 3:
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {recipeThree.title}
                    </Typography>
                    <Button
                      onClick={recipeThreeNav}
                    >
                      View Recipe
                    </Button>
                  </>
                  )}
                <Tooltip title="Edit this pairing.">
                  <Button
                    onClick={editPairing}
                    variant="outlined"
                    color="info"
                    sx={{ my: 2 }}
                  >
                    Edit Pairing
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Tooltip title="Remove this pairing from recipe.">
                  <Button 
                    onClick={() => {removePairing(pairing.id)}}
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
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Box sx={{ display: {xs: 'none', sm: 'none', md: 'block'}}}>
          <img 
            src={pairingImg} 
            alt="chef's hat with wooden spoon"
            style={{maxHeight: '300px'}}
          />
        </Box>
        <Box sx={{ display: {xs: 'none', sm: 'block', md: 'none'}}}>
          <img 
            src={pairingImg} 
            alt="chef's hat with wooden spoon"
            style={{maxHeight: '200px'}}
          />
        </Box>
      </Grid>
    </Grid>
    </>
    ):(
    <>
      <Typography variant="h4" sx={{color: "pairing.main"}}>Add a pairing for this recipe now!</Typography>
      <Typography variant="subtitle1"> Drinks? Music? Decor? Related recipes? Add ideas for all the things that will make your recipe the centerpiece 
        of the perfect meal experience. </Typography>
      <Tooltip title="Add a pairing to this recipe.">
      <Box sx={{}}>
        <Button 
          onClick={goAddPairing}
          variant="contained"
          color="info"
          sx={{ m: 2 }}
        >
          Add Pairing
        </Button>
        </Box>
      </Tooltip>
    </>
    )}
  </>
  )
}

export default PairingViewComponent