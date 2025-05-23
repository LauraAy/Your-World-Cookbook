import React, { useState, useEffect } from "react";
import UserRecipeDataService from "../services/userRecipe.service";
import RegionRecipeDataService from "../services/regionRecipe.service";
import { Link } from "react-router-dom";
import { Autocomplete, Box, Button, Divider,  List, ListItem, ListItemButton,  
  ListItemText, Menu, MenuItem, Pagination, TextField, Typography, } from '@mui/material';
import usePagination from "../utils/pagination.util";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";


const UserRegionRecipesAll = ({clickTitle, clickCreator})=> {
  const [userRegionRecipes, setUserRegionRecipes] = useState ([]);
  const [userRecipesCountry, setUserRecipesCountry] = useState([]);
  const [userRecipesRegion, setUserRecipesRegion] = useState([]);
  const [regionRecipes, setRegionRecipes] = useState([])
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedRegion, setSelectedRegion] = useState("")
  const [regionSearch, setRegionSearch] = useState(false);
	const [countrySearch, setCountrySearch] = useState(false)
	const [currentRegionName, setCurrentRegionName] = useState("")
 


  const currentUser = AuthService.getCurrentUser();
  const userId = currentUser.id

  const navigate = useNavigate()

  useEffect(() => {
    retrieveUserRegionRecipes(userId);
    retrieveRegionRecipes()
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

  const retrieveRegionRecipes = () => {
    RegionRecipeDataService.getAllRegionRecipes()
    .then(response => {
      setRegionRecipes(response.data);
      console.log(response.data);
      
    })
    .catch(e => {
      console.log(e);
    });
  };


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
      setRegionSearch(true)
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
      setRegionSearch(true)
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

  //setup for dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  //reset to initial state
  const resetAll = () => {
    retrieveUserRegionRecipes(userId)
    setRegionSearch(false)
    if ( countrySearch === true ) {
      setCountrySearch(false)
    }
  }

  return (
    //country search active
    <>
    {regionSearch ? (
    <>
      {countrySearch ? (
      <>
        <Box p="20px" pt="3" spacing={2}>
          {userRecipesCountry &&
            userRecipesCountry.map(regionRecipe => {
            return (
            <>
              <Typography variant="h4">Recipes from {selectedRegion.country}</Typography>
              {regionRecipe.recipe.length  <= 0 && 
                  <Typography variant="subtitle1">
                    There are no recipes for this country yet.
                  </Typography>
                }
                {regionRecipe.recipe.length > 0 && 
                  <Typography variant="subtitle1">
                    Click on a title to see full recipe.
                  </Typography>
                }
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
      //region search active
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
    //neither search active
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
        <Box ml={4} mb={2} sx={{ display: 'flex' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options = {regionRecipes.map((regionRecipe) => regionRecipe)}
            getOptionLabel={(regionRecipe) => regionRecipe.country }
            onChange={(event, value) => setSelectedRegion(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search By Country" />}
          />
          <Box ml={2} mt={1}>
            <Button variant="contained" onClick={findByCountry}>Search</Button>
          </Box>
        </Box>
        <Box>
          <Box mx={4}  sx={{ display: 'flex' }}>
            <Typography variant="subtitle2" gutterBottom>
              Search Recipes By Region Name
            </Typography>
          </Box>
          <Box ml={4} mb={2} sx={{ display: 'flex' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options = {Array.from(new Set(regionRecipes.map((regionRecipe) => regionRecipe.regionName)))
                .map((regionName) => regionName)}
              getOptionLabel={(regionName) => regionName }
              onChange={(event, value) => setCurrentRegionName(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search By RegionName" />}
            />
            <Box ml={2} mt={1}>
              <Button variant="contained" onClick={findByRegion}>Search</Button>
            </Box>
          </Box>
          <Box>
            <Button
              id="basic-button"
              variant="contained"
              sx={{mt:2, mb:4, ml:4, textTransform: 'none'}}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Typography variant="h5" color="#ffffff" gutterBottom>
                Filter Recipes
              </Typography>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => clickTitle()}>filter by title</MenuItem>
              <MenuItem onClick={() => clickCreator()}>filter by creator</MenuItem>
            </Menu>
              
            <Typography variant="h5" gutterBottom>
              Browse Recipes
            </Typography>
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
                    {regionRecipe.recipe.length  <= 0 && 
                      <Typography variant="subtitle1">
                        There are no recipes for this region yet.
                      </Typography>
                    }
                    {regionRecipe.recipe.length > 0 && 
                      <Typography variant="subtitle1">
                        Click on a title to see full recipe.
                      </Typography>
                    }
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