import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RegionRecipeDataService from "../services/regionRecipe.service";
import { Box, Button, Divider, Grid, Tooltip, Typography, } from '@mui/material';
 import { Delete } from  '@mui/icons-material';
 import globe from "../images/globe.png";

const RegionViewComponent = params => {
  const { id } = useParams();
  let navigate = useNavigate(); 
  const [currentRecipe, setCurrentRecipe] = useState ([]);
  const [ region, setRegion] = useState ([])

  //get regions for current recipe
  const getRecipeRegions = id => {
    RegionRecipeDataService.getRecipeRegions(id)
    .then(response => {
      setCurrentRecipe(response.data);
      setRegion(response.data.region)
      console.log(response.data);
      console.log(region)
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  useEffect(() => {
    if(id)
    getRecipeRegions(id);
  }, [id]);

  //navigate to add region page
  const goAddRegion = () => {
    navigate("/regions/add/" + id)
  }

  //refresh
  const refreshPage = () => {
    navigate(0);
  }

  //delete region
  const removeRegion = currentRegionId => {
    const recipeId = currentRecipe.id
    const regionId = currentRegionId

    RegionRecipeDataService.removeRegion(recipeId, regionId)
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
    {region.length ? (
    <>
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ display: {xs: 'block', sm: 'none', md: 'none'}}}>
          <img 
            src={globe} 
            alt="globe showing countries of the world"
            style={{maxHeight: '150px'}}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
      {region.map((region) => 
      <Box mt={2}>
        <Typography 
          variant="h4" 
          mx={4} 
          sx={{ color: "secondary.main" }}
        >
          {region.country}
        </Typography>
        <Box mx={4} mb={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1" sx={{ m: 1 }}>
                {region.regionName && (
                <>
                  <strong>Region: </strong>
                  {region.regionName}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {region.subRegion && (
                <>
                  <strong>Sub Region: </strong>
                  {region.subRegion}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {region.intermediateRegion && (
                <>
                  <strong>Intermediate Region: </strong>
                  {region.intermediateRegion}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {region.lat && (
                <>
                  <strong>Latitude: </strong>
                  {region.lat}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {region.lng && (
                <>
                  <strong>Longitude: </strong>
                  {region.lng}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {region.countryCode && (
                <>
                  <strong>Country Code: </strong>
                  {region.countryCode}
                </>
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Tooltip title="Remove this region from recipe.">
                <Button 
                  onClick={() => {removeRegion(region.id)}}
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
            src={globe} 
            alt="globe showing countries of the world"
            style={{maxHeight: '300px'}}
          />
      </Box>
      <Box sx={{ display: {xs: 'none', sm: 'block', md: 'none'}}}>
        <img 
            src={globe} 
            alt="globe showing countries of the world"
            style={{maxHeight: '200px'}}
          />
      </Box>
      </Grid>
      <Tooltip title="Add another region to this recipe.">
        <Button 
          onClick={goAddRegion}
          variant="outlined"
          color="secondary"
          sx={{ m: 2 }}
        >
          Add Another Region
        </Button>
      </Tooltip>
    </Grid>
    </>
    ):(
    <>
      <Typography variant="h4" sx={{ color: "secondary.main"}}>Add a region for this recipe now!</Typography>
      <Tooltip title="Add a region to this recipe.">
        <Typography variant="subtitle1">
          Is this recipe from the place your family comes from? A place you love to visit or dream of traveling too?
          Add the countries and regions your recipe comes from to help track where your favorite foods originate. 
       </Typography>
        <Button 
          onClick={goAddRegion}
          variant="contained"
          color="secondary"
          sx={{ m: 2 }}
        >
          Add Region
        </Button>
      </Tooltip>
    </>
    )}
  </>
  )
}

export default RegionViewComponent