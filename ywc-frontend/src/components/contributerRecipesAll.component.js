import React, { useState, useEffect } from "react";
import UsersRecipeDataService from "../services/userRecipe.service";
import { Autocomplete, Box, Button, Divider,  List, ListItem, ListItemButton,  
ListItemText, Pagination, TextField, Typography, } from '@mui/material';
import usePagination from "../utils/pagination.util";
import { useNavigate } from 'react-router-dom';


const ContributorRecipesAll = ({clickTitle, clickRegion, clickCreator})=> {
	const [usersRecipes, setUsersRecipes] = useState ([]);
  const [usersRecipesName, setUsersRecipesName] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedUser, setSelectedUser] = useState("")
  const [searchActive, setSearchActive] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    retrieveUsersRecipes();
  }, []);

  const retrieveUsersRecipes = () => {
	  UsersRecipeDataService.getAllUsersRecipes()
    .then(response => {
      setUsersRecipes(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  //pagination functions for creatorRecipes
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(usersRecipes.length / PER_PAGE);
  const _DATA = usePagination(usersRecipes, PER_PAGE);
  
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  
  //search function for username
  const findByUsername = () => {
    const searchUsername = selectedUser.username
    console.log(selectedUser.username)
    
    UsersRecipeDataService.findByUsername(searchUsername)
    .then (response => {
      setUsersRecipesName(response.data);
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
    retrieveUsersRecipes()
    setSearchActive(false)
  }

return (
  <>
    {searchActive ? (
    <>
      <Box p="20px" pt="3" spacing={2}>
        <Typography variant="h4">Recipes from {selectedUser.username}</Typography>
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
          {usersRecipesName &&
            usersRecipesName.map(usersRecipe => {
            return (
            <>
              {usersRecipe.recipe.length > 6 && 
                <Typography>
                  Scroll to see all recipes added by this contributor. 
                </Typography>
              }
              {usersRecipe.recipe &&
                Array.from(
                  usersRecipe.recipe.sort((a, b) => {
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
          Recipes by Contributor
        </Typography>
        <Box mx={4}  sx={{ display: 'flex' }}>
          <Typography variant="subtitle2" gutterBottom>
            Search Recipes By Contributor Name
          </Typography>
        </Box>
        <Box ml={4} mb={2} sx={{ display: 'flex' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options = {usersRecipes.map((usersRecipe) => usersRecipe)}
            getOptionLabel={(usersRecipe) => usersRecipe.username }
            onChange={(event, value) => setSelectedUser(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search By Contributor Name" />}
          />
          <Box ml={2} mt={1}>
            <Button variant="contained" onClick={findByUsername}>Search</Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Browse Recipes
          </Typography>
          <Box m={2}>
            <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickTitle()}>filter by title</Button>
            <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickRegion()}>filter by region</Button>
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
              _DATA.currentData().map(usersRecipe => {
                return (
                <>
                  <Typography variant="h5">{usersRecipe.username}</Typography>
                  <Typography variant="subtitle1"> 
                    Click on a title to see full recipe.
                  </Typography>
                  {/* {usersRecipe.recipe.length > 4 && 
                    <Typography>
                      Scroll to see all recipes for this contributor. 
                    </Typography>
                  } */}
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
                    {usersRecipe.recipes &&
                      Array.from(
                        usersRecipe.recipes.sort((a, b) => {
                          if (a.title.toLowerCase ()< b.title.toLowerCase()) {
                            return -1;
                          }
                          if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1;
                          }
                          return 0; 
                        })
                      ).map((recipe, index) => (
                        <ListItemButton onClick={() => handleListItemClick(usersRecipe)}>
                        <ListItem key={usersRecipe.id} >
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

export default ContributorRecipesAll;