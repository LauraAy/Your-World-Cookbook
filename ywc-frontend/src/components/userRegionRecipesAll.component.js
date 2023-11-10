import React, { useState, useEffect } from "react";
import UserRecipeDataService from "../services/userRecipe.service";
import { Link } from "react-router-dom";
import { Autocomplete, Box, Button, Divider,  List, ListItem, ListItemButton,  
  ListItemText, Pagination, TextField, Typography, } from '@mui/material';
import usePagination from "../utils/pagination.util";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";


const UserRegionRecipesAll = ({clickTitle, clickCreator})=> {
  const [userRegionRecipes, setUserRegionRecipes] = useState ([]);
  const [userRecipesCountry, setUserRecipesCountry] = useState([]);
  const [userRecipesRegion, setUserRecipesRegion] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedRegion, setSelectedRegion] = useState("")
  const [searchActive, setSearchActive] = useState(false);
	const [countrySearch, setCountrySearch] = useState(false)
	const [currentRegionName, setCurrentRegionName] = useState("")

  const currentUser = AuthService.getCurrentUser();
  const userId = currentUser.id

  const navigate = useNavigate()

  useEffect(() => {
    retrieveUserRegionRecipes(userId);
  }, []);

  const retrieveUserRegionRecipes = (id) => {
    UserRecipeDataService.findUserRecipeRegions(id)
    .then(response => {
      setUserRegionRecipes(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  // const setActiveRecipe = (recipe, index) => {
  //   setCurrentRecipe(recipe);
  //   setCurrentIndex(index);
  // };

  //pagination functions for regionRecipes
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(userRegionRecipes.length / PER_PAGE);
  const _DATA = usePagination(userRegionRecipes, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };


  const findByCountry = () => {
    const searchCountry = selectedRegion.country
    console.log(selectedRegion.country)
    UserRecipeDataService.findByCountry(userId, searchCountry)
    .then (response => {
      setUserRecipesCountry(response.data);
      setSearchActive(true)
      setCountrySearch(true)
      setCurrentRecipe(null)
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByRegion = () => {
    const searchRegionName = currentRegionName
    console.log(currentRegionName)
    UserRecipeDataService.findByRegionName(userId, searchRegionName)
    .then (response => {
      setUserRecipesRegion(response.data);
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
    retrieveUserRegionRecipes(userId)
    setSearchActive(false)
    if ( countrySearch === true ) {
      setCountrySearch(false)
    }
  }

  return (
    <>
    {searchActive ? (
    <>
      {countrySearch ? (
      <>
        <Box p="20px" pt="3" spacing={2}>
          {userRecipesCountry &&
            userRecipesCountry.map(regionRecipe => {
            return (
            <>
              <Typography variant="h4">Recipes from {selectedRegion.country}</Typography>
              <Typography variant="subtitle1">
                Click on a title to see full recipe.
              </Typography>
              {regionRecipe.recipe.length > 6 && 
                <Typography>
                  Scroll to see all recipes for this country. 
                </Typography>
              }
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
                {regionRecipe.recipe &&
                  regionRecipe.recipe.map((recipe, index) => (
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
                  )
                )}
              </List>
            </>
            );
          })}
        </Box>
        <Box m={4}>
          <Button variant="outlined" onClick={resetAll}>Return to your recipes</Button>
        </Box>
      </>
      ):(
      <>
        <Box p="20px" pt="3" spacing={2}>
          <Typography variant="h4">Recipes from {currentRegionName}</Typography>
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
            {userRecipesRegion &&
              userRecipesRegion.map(regionRecipe => {
              return (
              <>
                {regionRecipe.recipe.length > 6 && 
                  <Typography>
                    Scroll to see all recipes for this country. 
                  </Typography>
                }
                {regionRecipe.recipe &&
                  regionRecipe.recipe.map((recipe, index) => (
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
                  )
                )} 
              </>
              );
            })}
          </List>
        </Box>
        <Box m={4}>
          <Button variant="outlined" onClick={resetAll}>Return to your recipes</Button>
        </Box>
      </>
      )}
    </>
    ):(
    <>
      <Box p="20px" pt="3" spacing={2}>
        <Typography variant="h4" gutterBottom>
          {currentUser.username}'s Recipes by Country 
        </Typography>
        <Box mx={4}  sx={{ display: 'flex' }}>
          <Typography variant="subtitle2" gutterBottom>
            Search Recipes By Country Name
          </Typography>
        </Box>
        <Box mx={4} mb={2} sx={{ display: 'flex' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options = {userRegionRecipes.map((regionRecipe) => regionRecipe)}
            getOptionLabel={(regionRecipe) => regionRecipe.country }
            onChange={(event, value) => setSelectedRegion(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search By Country" />}
          />
          <Box mx={2} mt={1}>
            <Button variant="contained" onClick={findByCountry}>Search</Button>
          </Box>
        </Box>
        <Box>
          <Box mx={4}  sx={{ display: 'flex' }}>
            <Typography variant="subtitle2" gutterBottom>
              Search Recipes By Region Name
            </Typography>
          </Box>
          <Box mx={4} mb={2} sx={{ display: 'flex' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options = {Array.from(new Set(userRegionRecipes.map((regionRecipe) => regionRecipe.regionName)))
                .map((regionName) => regionName)}
              getOptionLabel={(regionName) => regionName }
              onChange={(event, value) => setCurrentRegionName(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search By RegionName" />}
            />
            <Box mx={2} mt={1}>
              <Button variant="contained" onClick={findByRegion}>Search</Button>
            </Box>
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>
              Browse Recipes
            </Typography>
            <Box m={2}>
              <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickTitle()}>filter by title</Button>
              <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickCreator()}>filter by creator</Button>
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
                _DATA.currentData().map(regionRecipe => {
                  return (
                  <>
                    <Typography variant="h5">{regionRecipe.country}</Typography>
                    <Typography variant="subtitle1">
                      Click on a title to see full recipe.
                    </Typography>
                    {regionRecipe.recipe.length > 4 && 
                      <Typography>
                        Scroll to see all recipes for this country. 
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
                      {regionRecipe.recipe &&
                        regionRecipe.recipe.map((recipe, index) => (    
                          <ListItemButton onClick={() => handleListItemClick(regionRecipe)}>
                            <ListItem key={regionRecipe.id} >
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
                        )
                      )}
                    </List>
                  </>
                  );
                })}
              </Box>
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
                <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickCreator()}>filter by creator</Button>
              </Box>
            </Box>
          </Box>
      </Box>
    </>  
    )}
  </>
  
  );
}

  export default UserRegionRecipesAll;