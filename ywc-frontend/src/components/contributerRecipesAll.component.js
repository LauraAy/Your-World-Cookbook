import React, { useState, useEffect } from "react";
import UsersRecipeDataService from "../services/userRecipe.service";
import { Autocomplete, Box, Button, Divider,  List, ListItem, ListItemButton,  
ListItemText, Menu, MenuItem, Pagination, TextField, Typography, } from '@mui/material';
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

  let sortUsersRecipes = usersRecipesName.map(({ recipes }) => [].concat(recipes)).flat();

  console.log (sortUsersRecipes)

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
    retrieveUsersRecipes()
    setSearchActive(false)
  }

return (
  <>
    {searchActive ? (
    <>
      {usersRecipesName &&
        usersRecipesName.map(usersRecipe => {
          return (
          <>
            <Box p="20px" pt="3" spacing={2}>
              <Typography variant="h4">Recipes from {selectedUser.username}</Typography>
              {usersRecipe.recipes.length  <= 0 && 
                <Typography variant="subtitle1">
                    There are no recipes from this contributor yet.
                </Typography>
              }
              {usersRecipe.recipes.length > 0 &&
                <Typography variant="subtitle1">
                  Click on a title to see full recipe.
                </Typography>
              }  
              {usersRecipe.recipes.length > 6 && 
                <Typography>
                  Scroll to see all recipes added by this contributor. 
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
              </List>
            </Box>
          </>
          );
        })}
      
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
						<Button 
              variant="contained" 
              onClick={findByUsername}
            >  
							Search
						</Button>
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
            <MenuItem onClick={() => clickRegion()}>filter by region</MenuItem>
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
              _DATA.currentData().map(usersRecipe => {
                return (
                <>
                  <Typography variant="h5">{usersRecipe.username}</Typography>
                  {usersRecipe.recipes.length  <= 0 &&
                    <Typography variant="subtitle1">
                      There are no recipes from this contributor yet.
                    </Typography>
                  } 
                  {usersRecipe.recipes.length  > 0 && 
                  <Typography variant="subtitle1"> 
                    Click on a title to see full recipe.
                  </Typography>
                  }
                  {usersRecipe.recipes.length > 4 && 
                    <Typography variant="subtitle1">
                      Scroll to see all recipes for this contributor. 
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

export default ContributorRecipesAll;