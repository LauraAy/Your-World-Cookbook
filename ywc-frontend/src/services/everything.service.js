import http from "../http-common";

//Retrieve all recipes with regions, creators, and pairings
const getRecipesEverything = () => {
    return http.get("/everything");
}

//Retrieve one recipe with regions, creators, and pairing
const getRecipeEverything = id => {
    return http.get(`/everything/${id}`);
}

const EverythingService = {
    getRecipesEverything,
    getRecipeEverything
  };
  
  export default EverythingService;