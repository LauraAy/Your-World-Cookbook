import http from "../http-common";

//Get all recipes with userId
const findUserRecipes = id => {
  return http.get(`/userRecipes/${id}`)
};

//Get all recipes with userId by title
const findByTitle = (id, title) => {
    return http.get(`/userRecipes/titleSearch/${id}?title=${title}`);
  };

//Get all creators with recipes by userId 
const findUserRecipeCreators = id => {
  return http.get(`userRecipes/creators/${id}`)
}

//Find all recipes by creatorName and user id
const findByCreatorName = (id, creatorName) => {
    return http.get(`/userRecipes/creatorSearch/${id}?creatorName=${creatorName}`);
  };

//Get all regions with recipes by userId 
const findUserRecipeRegions = id => {
  return http.get(`userRecipes/regions/${id}`)
}

//Get all regions with recipes by country and user id 
const findByCountry = (id, country) => {
  return http.get(`/userRecipes/regionSearch/${id}?country=${country}`);
};

//Get all regions with recipes by regionName and user id
const findByRegionName = (id, regionName) => {
    return http.get(`/userRecipes/regionSearch/${id}?regionName=${regionName}`);
  };
  

const RegionRecipeService = {
  findUserRecipes,
	findByTitle,
  findUserRecipeCreators,
	findByCreatorName,
  findUserRecipeRegions,
  findByCountry,
  findByRegionName,
};

export default RegionRecipeService;