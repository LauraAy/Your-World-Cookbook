import React, { useState, useEffect } from "react";
import recipeDataService from "../services/recipe.service";
import { Autocomplete, Button, TextField, Pagination, Box, List, ListItem, ListItemButton,
  ListItemText, Typography, Divider } from '@mui/material';
import usePagination from "../utils/pagination.util";
import { useNavigate } from 'react-router-dom';

const RecipesAll = ({clickRegion, clickCreator})=> {

  //setup for data and search status
  const [recipes, setRecipes] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const navigate = useNavigate()

  //retrieve recipe function and useEffect to run retrieve recipes on load
    useEffect(() => {
    retrieveRecipes();
  }, []);

  const retrieveRecipes = () => {
    recipeDataService.getAll()
    .then(response => {
      const sortRecipe = response.data
      
      sortRecipe.sort((a, b) => {
        if (a.title.toLowerCase ()< b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });

      setRecipes(sortRecipe);
    })
    .catch(e => {
      console.log(e);
    });
  };

  //functions for pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(recipes.length / PER_PAGE);
  const _DATA = usePagination(recipes, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  //title search
  const findByTitle = () => {
    const searchTitle = selectedRecipe.title
    console.log(selectedRecipe.title)
    recipeDataService.findByTitle(searchTitle)
    .then (response => {
      setRecipes(response.data);
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
    retrieveRecipes()
    setSearchActive(false)
  }

  return (
  <>
    {searchActive ? (
    <>
      <Box p="20px" pt="3" spacing={2}>
        <Typography variant="h4">{selectedRecipe.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Click to view full recipe.
        </Typography>
        <List p="10" pt="3" spacing={2}>
          {_DATA &&
            _DATA.currentData().map(recipe => {
            return (
            <>
              <ListItemButton 
                onClick={() => handleListItemClick(recipe)}
              >
                <ListItem key={recipe.id} listStyleType="disc">
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
              </ListItemButton>
              <Divider />
            </>
            );
          })}
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
          All Recipes
        </Typography>
        <Box mx={4}  sx={{ display: 'flex' }}>
          <Typography variant="subtitle2" gutterBottom>
            Search Recipes By Title
          </Typography>
        </Box>
        <Box mx={4}  mb={2} sx={{ display: 'flex' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options = {recipes.map((recipe) => recipe)}
            getOptionLabel={(recipe) => recipe.title }
            onChange={(event, value) => setSelectedRecipe(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search Recipe Titles" />}
          />
          <Box mx={2} mt={1}>
            <Button variant="contained" onClick={findByTitle}>Search</Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Browse Recipes
          </Typography>
          <Box m={2}>
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
          <List p="10" pt="3" spacing={2}>
            {_DATA &&
              _DATA.currentData().map(recipe => {
                return (
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
                  </ListItemButton>
                  <Divider />
                </>
              );
            })}
          </List>
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
          <Box m={2}>
            <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickRegion()}>filter by region</Button>
            <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickCreator()}>filter by creator</Button>
          </Box>
        </Box>
      </Box>
    </>
    )}
  </>
  )
}

export default RecipesAll;