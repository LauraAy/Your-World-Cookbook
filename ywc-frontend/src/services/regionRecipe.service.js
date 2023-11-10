import http from "../http-common";

//Create new region recipe association
const create = data => {
    return http.post("/regionRecipes", data);
  };

//Get all regions with recipes
const getAllRegionRecipes = () => {
  return http.get("/regionRecipes");
};

//Get all regions with recipes by country  
const findByCountry = country => {
  return http.get(`/regionRecipes/search?country=${country}`);
};

//Get all regions with recipes by regionName
const findByRegionName = regionName => {
  return http.get(`/regionRecipes/search?regionName=${regionName}`);
}

//Get all recipes with regions
const getAllRecipeRegions = () => {
    return http.get("/regionRecipes/recipes");
  };

//Get one region with recipes
const getRegionRecipes = id => {
  return http.get(`/regionRecipes/${id}`);
};

//Get one recipe with regions
const getRecipeRegions = id => {
    return http.get(`/regionRecipes/recipes/${id}`);
  };

//Remove region from recipe
const removeRegion = (recipeId, regionId) => {
  return http.delete(`/regionRecipes/${recipeId}/${regionId}`);
};

const RegionRecipeService = {
  create,
  getAllRegionRecipes,
  getAllRecipeRegions,
  getRegionRecipes,
  getRecipeRegions,
  findByCountry,
  findByRegionName,
  removeRegion
};

export default RegionRecipeService;