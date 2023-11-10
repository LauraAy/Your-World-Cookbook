import http from "../http-common";

//Create new pairing recipe association
const create = data => {
    return http.post("/pairingRecipes", data);
  };

//Get all recipes with pairings
const getAllPairingRecipes = () => {
  return http.get("/pairingRecipes");
};

//Get all recipes with pairings
const getAllRecipePairings = () => {
    return http.get("/pairingRecipes/recipes");
  };

//Get one pairing with recipes
const getPairingRecipes = id => {
  return http.get(`/pairingRecipes/${id}`);
};

//Get one recipe with pairings
const getRecipePairings = id => {
    return http.get(`/pairingRecipes/recipes/${id}`);
  };

//Remove pairing from recipe
const removePairing = (recipeId, pairingId) => {
  return http.delete(`/pairingRecipes/${recipeId}/${pairingId}`);
};

const PairingRecipeService = {
  create,
  getAllPairingRecipes,
  getAllRecipePairings,
  getPairingRecipes,
  getRecipePairings,
  removePairing
};

export default PairingRecipeService;