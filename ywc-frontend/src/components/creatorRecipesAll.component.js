import React, { useState, useEffect } from "react";
import CreatorRecipeDataService from "../services/creatorRecipe.service";
import { Autocomplete, Box, Button, Divider,  List, ListItem, ListItemButton,  
  ListItemText, Pagination, TextField, Typography, } from '@mui/material';
import usePagination from "../utils/pagination.util";
import { useNavigate } from 'react-router-dom';


const CreatorRecipesAll = ({clickTitle, clickRegion})=> {
  const [creatorRecipes, setCreatorRecipes] = useState ([]);
  const [creatorRecipesName, setCreatorRecipesName] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedCreator, setSelectedCreator] = useState("")
  const [searchActive, setSearchActive] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    retrieveCreatorRecipes();
  }, []);

  const retrieveCreatorRecipes = () => {
	  CreatorRecipeDataService.getAllCreatorRecipes()
    .then(response => {
      setCreatorRecipes(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  //pagination functions for creatorRecipes
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(creatorRecipes.length / PER_PAGE);
  const _DATA = usePagination(creatorRecipes, PER_PAGE);
  
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  
  //search function for creatorName
  const findByCreatorName = () => {
    const searchCreatorName = selectedCreator.creatorName
    console.log(selectedCreator.creatorName)
    
    CreatorRecipeDataService.findByCreatorName(searchCreatorName)
    .then (response => {
      setCreatorRecipesName(response.data);
      setSearchActive(true)
      setCurrentRecipe(null)
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  //List select function
  const handleListItemClick = (recipe) => {
    const recipeId = recipe.id
    
    navigate("/recipes/" + recipeId)
  };

  //reset to initial state
  const resetAll = () => {
    retrieveCreatorRecipes()
    setSearchActive(false)
  }

return (
  <>
    {searchActive ? (
    <>
      <Box p="20px" pt="3" spacing={2}>
        <Typography variant="h4">Recipes from {selectedCreator.creatorName}</Typography>
        <Typography variant="subtitle1">
          Click on a title to see full recipe.
        </Typography>
        <List
          sx={{
            width: '100%',
            maxWidth: 480,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 500, 
            '& ul': { padding: 0 }
          }}
        >
          {creatorRecipesName &&
            creatorRecipesName.map(creatorRecipe => {
            return (
            <>
              {creatorRecipe.recipe.length > 6 && 
                <Typography>
                  Scroll to see all recipes for this creator. 
                </Typography>
              }
              {creatorRecipe.recipe &&
                Array.from(
                  creatorRecipe.recipe.sort((a, b) => {
                    if (a.title.toLowerCase ()< b.title.toLowerCase()) {
                      return -1;
                    }
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                      return 1;
                    }
                    return 0; 
                  })
                ).map((recipe, index) => (
                <>
                  <ListItemButton onClick={() => handleListItemClick(recipe)}>
                    <ListItem key={recipe.id} >
                      <ListItemText
                        primary={recipe.title}
                        secondary={recipe.description}
                        secondaryTypographyProps={{ 
                          style: {
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                          }
                        }}
                      />
                    </ListItem>
                    <Divider />
                  </ListItemButton>
                </>
                ))
              } 
            </>
            )}
          )}
        </List>
      </Box>
      <Box m={4}>
        <Button variant="outlined" onClick={resetAll}>Return to all recipes</Button>
      </Box>
    </>
    ):(
    <>
      <Box p="20px" pt="3" spacing={2}>
        <Typography variant="h4" gutterBottom>
          Recipes by Recipe Creator
        </Typography>
        <Box mx={4}  sx={{ display: 'flex' }}>
          <Typography variant="subtitle2" gutterBottom>
            Search Recipes By Creator Name
          </Typography>
        </Box>
        <Box mx={4} mb={2} sx={{ display: 'flex' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options = {creatorRecipes.map((creatorRecipe) => creatorRecipe)}
            getOptionLabel={(creatorRecipe) => creatorRecipe.creatorName }
            onChange={(event, value) => setSelectedCreator(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search By Creator Name" />}
          />
          <Box mx={2} mt={1}>
            <Button variant="contained" onClick={findByCreatorName}>Search</Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Browse Recipes
          </Typography>
          <Box m={2}>
            <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickTitle()}>filter by title</Button>
            <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickRegion()}>filter by region</Button>
          </Box>
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
          <Box p="10" pt="3" spacing={2}>
            {_DATA &&
              _DATA.currentData().map(creatorRecipe => {
                return (
                <>
                  <Typography variant="h5">{creatorRecipe.creatorName}</Typography>
                  <Typography variant="subtitle1"> 
                    Click on a title to see full recipe.
                  </Typography>
                  {creatorRecipe.recipe.length > 4 && 
                    <Typography>
                      Scroll to see all recipes for this creator. 
                    </Typography>
                  }
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 480,
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 300, 
                      '& ul': { padding: 0 }
                    }}
                  >
                    {creatorRecipe.recipe &&
                      Array.from(
                        creatorRecipe.recipe.sort((a, b) => {
                          if (a.title.toLowerCase ()< b.title.toLowerCase()) {
                            return -1;
                          }
                          if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1;
                          }
                          return 0; 
                        })
                      ).map((recipe, index) => (
                        <ListItemButton onClick={() => handleListItemClick(creatorRecipe)}>
                        <ListItem key={creatorRecipe.id} >
                          <ListItemText
                            primary={recipe.title}
                            secondary={recipe.description}
                            secondaryTypographyProps={{ 
                              style: {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }
                            }}
                          />
                        </ListItem>
                        <Divider />
                      </ListItemButton>
                      ))
                    }
                  </List>
                </>
                );
            
              })}
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
            <Box m={2}>
              <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickTitle()}>filter by title</Button>
              <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickRegion()}>filter by region</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
    )} 
  </>
  );
}

export default CreatorRecipesAll;