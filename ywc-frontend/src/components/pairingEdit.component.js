import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Button, Divider, FormControl,  Paper, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import PairingDataService from "../services/pairing.service";
import PairingRecipeDataService from "../services/pairingRecipe.service";
import RecipeDataService from "../services/recipe.service";
import DeleteConfirmation from "../components/deleteConfirmation.component.js";

const styles = {
  borderBox: {
    position: 'relative',
    textAlign: 'left', 
    margin: '10px',
    padding: '20px',
    border: '5px solid #890010',
  }
}

const PairingEdit = props => {
  const filter = createFilterOptions();
  const { recipeId, pairingId }= useParams();
  let navigate = useNavigate();

  const initialPairingState = {
    id: null,
    pairingName: "",
    description: "",
    drinks: "",
    shows: "",
    games: "",
    books: "",
    music: "",
    decor: "",
    more: "",
    recipeOne: "",
    recipeTwo: "",
    recipeThree: ""
  };

  const [pairing, setPairing] = useState(initialPairingState);
  const [recipes, setRecipes] = useState([])
  const [recipeOne, setRecipeOne] = useState([])
  const [recipeOneId, setRecipeOneId] = useState([])
  const [selectedRecipeOneId, setSelectedRecipeOneId] = useState ("")
  const [recipeTwo, setRecipeTwo] = useState([])
  const [recipeTwoId, setRecipeTwoId] = useState([])
  const [selectedRecipeTwoId, setSelectedRecipeTwoId] = useState ("")
  const [recipeThree, setRecipeThree] = useState([])
  const [recipeThreeId, setRecipeThreeId] = useState([])
  const [selectedRecipeThreeId, setSelectedRecipeThreeId] = useState ("")
  const [type, setType] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [changeRecipeOne, setChangeRecipeOne] = useState(false)
  const [changeRecipeTwo, setChangeRecipeTwo] = useState(false)
  const [changeRecipeThree, setChangeRecipeThree] = useState(false)
  
  
  //get pairing
  const getPairing = id => {
    PairingDataService.get(id)
      .then(response => {
        setPairing(response.data);
        console.log(response.data);
        if(response.data.recipeOne !== null) {
          setRecipeOneId(response.data.recipeOne)
        }
        if(response.data.recipeTwo !== null) {
          setRecipeTwoId(response.data.recipeTwo)
        }
        if(response.data.recipeThree !== null) {
          setRecipeThreeId(response.data.recipeThree)
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveRecipes = () => {
    RecipeDataService.getAll()
    .then(response => {
      setRecipes(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    if(pairingId)
    getPairing(pairingId);
    retrieveRecipes()
  }, [pairingId]);



  const getRecipeOne = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeOne(response.data)
      setSelectedRecipeOneId(response.data.id)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  const getRecipeTwo = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeTwo(response.data)
      setSelectedRecipeTwoId(response.data.id)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  const getRecipeThree = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeThree(response.data)
      setSelectedRecipeThreeId(response.data.id)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    if (recipeOneId) {
      getRecipeOne(recipeOneId)
    } else {
      console.log("not there")
    }

    if (recipeTwoId) {
      getRecipeTwo(recipeTwoId)
    } else {
      console.log("not there")
    }

    if (recipeThreeId) {
      getRecipeThree(recipeThreeId)
    } else {
      console.log("not there")
    }

  }, [recipeOneId, recipeTwoId, recipeThreeId]);

  //react-hook-form and yup functions
  const validationSchema = Yup.object().shape({
    pairingName: Yup.string()
      .required('Pairing name is required.'),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    values: { 
      pairingName: pairing.pairingName, 
      description: pairing.description,
      drinks: pairing.drinks,
      shows: pairing.shows,
      games: pairing.games,
      books: pairing.books,
      music: pairing.music,
      decor: pairing.decor,
      more: pairing.more,
      recipeOne: recipeOne.title,
      recipeTwo: recipeTwo.title,
      recipeThree: recipeThree.title
    }
  });

  const onSubmit = (data) => {
    // register("creatorName", "about", "link");
    console.log(data);
    console.log(recipeOneId)
  };
  // //set form input to currentPairing
  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setPairing({ ...pairing, [name]: value });
  // };

  //update Pairing
  const updatePairing = (formData) => {
    var data = {
      pairingName: formData.pairingName,
      description: formData.description,
      drinks: formData.drinks,
      shows: formData.shows,
      games: formData.games,
      books: formData.books,
      music: formData.music,
      decor: formData.decor,
      more: formData.more,
      recipeOne: selectedRecipeOneId,
      recipeTwo: selectedRecipeTwoId,
      recipeThree: selectedRecipeThreeId
    };
    PairingDataService.update(pairing.id, data)
      .then(response => {
        console.log(response.data);
        navigate("/recipes/" + recipeId)
      })
      .catch(e => {
        console.log(e);
      });
  };


	//retrieve selected recipe from form and save id
	const handleRecipeOneChange = async (event, option) => {
		setSelectedRecipeOneId(option.id);
		console.log(option.id)
	}
	const handleRecipeTwoChange = async (event, option) => {
		setSelectedRecipeTwoId(option.id);
		console.log(option.id)
	}
	const handleRecipeThreeChange = async (event, option) => {
		setSelectedRecipeThreeId(option.id);
		console.log(option.id)
	}

  //set changeRecipeOne to true
  const editRecipeOne = () => {
    setChangeRecipeOne(true)
  }

   //set changeRecipeTwo to true
   const editRecipeTwo = () => {
    setChangeRecipeTwo(true)
  }

   //set changeRecipeThree to true
   const editRecipeThree = () => {
    setChangeRecipeThree(true)
  }

  return (
  <>
    <Typography variant="h4" color="pairing.main" align="center" margin="dense">
      Edit {pairing.pairingName}
    </Typography>
    <Box style={styles.borderBox}>
      <FormControl fullWidth>
        <TextField
          sx={{ mt: 2, mb: 2 }}
          id="pairingName"
          name="pairingName"
          label="Pairing Name"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="dense"
          multiline
          rows={1}
          {...register('pairingName')}
          error={errors.title ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.pairingName?.message}
        </Typography>
        <TextField
          sx={{ mt: 2, mb: 2 }}
          id="description"
          name="description"
          label="Description"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="dense"
          multiline
          rows={2}
          {...register('description')}
        />
        <TextField
					sx={{ mb: 2 }}
					id="drinks"
					defaultValue=""
					name="drinks"
					label="Drinks"
          InputLabelProps={{
            shrink: true,
          }}
					placeholder="Drinks"
					fullWidth
					margin="dense"
					multiline
					rows={2}
					{...register('drinks')}
				/>
        <TextField
					sx={{ mb: 2 }}
					id="shows"
					defaultValue=""
					name="shows"
					label="Shows"
          InputLabelProps={{
            shrink: true,
          }}
					placeholder="Shows"
					fullWidth
					margin="dense"
					multiline
					rows={2}
					{...register('shows')}
				/>
				<TextField
					sx={{ mb: 2 }}
					id="books"
					defaultValue=""
					name="books"
					label="Books"
          InputLabelProps={{
            shrink: true,
          }}
					placeholder="Books"
					fullWidth
					margin="dense"
					multiline
					rows={2}
					{...register('books')}
				/>
				<TextField
					sx={{ mb: 2 }}
					id="games"
					defaultValue=""
					name="games"
					label="Games"
          InputLabelProps={{
            shrink: true,
          }}
					placeholder="Games"
					fullWidth
					margin="dense"
					multiline
					rows={2}
					{...register('games')}
				/>
				<TextField
					sx={{ mb: 2 }}
					id="music"
					defaultValue=""
					name="music"
					label="Music"
          InputLabelProps={{
            shrink: true,
          }}
					placeholder="Music"
					fullWidth
					margin="dense"
					multiline
					rows={2}
					{...register('music')}
				/>
				<TextField
					sx={{ mb: 2 }}
					id="decor"
					defaultValue=""
					name="decor"
					label="Decor"
          InputLabelProps={{
            shrink: true,
          }}
					placeholder="Decor"
					fullWidth
					margin="dense"
					multiline
					rows={2}
					{...register('decor')}
				/>
				<TextField
					sx={{ mb: 2 }}
					id="more"
					defaultValue=""
					name="more"
					label="More"
          InputLabelProps={{
            shrink: true,
          }}
					placeholder="More"
					fullWidth
					margin="dense"
					multiline
					rows={2}
					{...register('more')}
				/>
      </FormControl>						
      { changeRecipeOne ? (
        <>
          <Typography variant= "h6">
						Select a related recipe from the dropdown.
					</Typography>
          <Autocomplete
						sx={{ mb: 2 }}
						fullWidth
						disablePortal
						disableClearable
						onChange={handleRecipeOneChange}
						id="recipeOne"
						options={recipes.map((option, index) => option)}
						getOptionLabel={(option) => option.title}
						renderInput={(option) => (
							<TextField
								{...option}
								label="Related Recipe 1"
								InputProps={{
									...option.InputProps,
									type: 'search',
								}}
							/>
						)}
					/>
        </>
        ):(
        <>
          <Box mb={2}>
            <Typography variant='h6'>
              Related Recipes
            </Typography>
          </Box>
          { pairing.recipeOne ? (
          <>
            <Divider></Divider>
            <Box mb={2}>
              <Typography variant='h6'>
                {recipeOne.title}
              </Typography>
            </Box>
            <Box mb={2}>
              <Button 
                onClick={editRecipeOne}
                variant="outlined"
              >
                Change this recipe
              </Button>
            </Box>
          </>
          ):(
          <>
            <Box mb={2}>
              <Button 
                m={2}
                onClick={editRecipeOne}
                variant="outlined"
              >
                Add a related recipe.
              </Button>
            </Box>
          </>
          )}
        </>
        )}
        { changeRecipeTwo ? (
        <>
          <Typography variant= "h6">
						Select a second related recipe from the dropdown.
					</Typography>
          <Autocomplete
						sx={{ mb: 2 }}
						fullWidth
						disablePortal
						disableClearable
						onChange={handleRecipeTwoChange}
						id="recipeOne"
						options={recipes.map((option, index) => option)}
						getOptionLabel={(option) => option.title}
						renderInput={(option) => (
							<TextField
								{...option}
								label="Related Recipe 2"
								InputProps={{
									...option.InputProps,
									type: 'search',
								}}
							/>
						)}
					/>

        </>
        ):(
        <>
          { pairing.recipeTwo ? (
          <>
            <Divider></Divider>
            <Box mb={2}>
              <Typography variant='h6'>
                {recipeTwo.title}
              </Typography>
            </Box>
            <Box mb={2}>
              <Button 
                onClick={editRecipeTwo}
                variant="outlined"
              >
                Change this recipe
              </Button>
            </Box>
          </>
          ):(
          <>
            <Box mb={2}>
              <Button 
                onClick={editRecipeTwo}
                variant="outlined"
              >
                Add a second related recipe.
              </Button>
            </Box>
          </>
          )}
        </>
        )}
        {changeRecipeThree ? (
        <>
          <Typography variant= "h6">
						Select a second related recipe from the dropdown.
					</Typography>
          <Autocomplete
						sx={{ mb: 2 }}
						fullWidth
						disablePortal
						disableClearable
						onChange={handleRecipeThreeChange}
						id="recipeOne"
						options={recipes.map((option, index) => option)}
						getOptionLabel={(option) => option.title}
						renderInput={(option) => (
							<TextField
								{...option}
								label="Related Recipe 3"
								InputProps={{
									...option.InputProps,
									type: 'search',
								}}
							/>
						)}
					/>

        </>
        ):(
        <>
          { pairing.recipeThree ? (
          <>
            <Box mb={2}>
              <Typography variant='h6'>
                {recipeThree.title}
              </Typography>
            </Box>
            <Button 
              onClick={editRecipeThree}
              variant="outlined"
            >
              Change this recipe
            </Button>
          </>
          ):(
          <>
            <Box mb={2}>
              <Button 
                onClick={editRecipeThree}
                variant="outlined"
              >
                Add a third related recipe.
              </Button>
            </Box>
          </>
          )}
        </>
        )}
        <Box>
          <Button
            onClick={handleSubmit(updatePairing)}
            variant="contained"
            color="info"
          >
            Update
          </Button> 
        </Box>
      </Box>
    </>
  );
};

            {/* <Form>
              <select className="form-control"  name="recipeOne"
              value={pairing.recipeOne}
              onChange={handleRecipeOneChange} >
                <option>Select a Recipe</option>
                {recipes.map((recipes, index) => 
                  <option
                    value= {recipes.id}
                    key={index}
                  >
                    {recipes.title} 
                  </option>
                )}
              </select>
            </Form>
          </div>
        ):(
          <div>
          { pairing.recipeOne ? (
            <div>
              {recipeOne.title}
              <br></br>
              <button onClick={handleChangeRecipeOne}>Change this recipe</button>
            </div>
          ):(
            <div>
              <button onClick={handleChangeRecipeOne}>Add Recipe One</button>
            </div>
          )}
         </div>
        )}
        <br></br>
        <br></br>
        { changeRecipeTwo ? (
          <div>
            <p>Please select a Recipe from the dropdown.</p> 
            <Form>
            <select class="form-control"  name="recipeTwo"
              value={pairing.recipeTwo}
              onChange={handleInputChange} >
                <option>Select a Recipe</option>
                {recipes.map((recipes, index) => 
                  <option
                    value= {recipes.id}
                    key={index}
                  >
                    {recipes.title} 
                  </option>
                )}
              </select>
            </Form>
          </div>
        ):(
          <div>
          { pairing.recipeTwo ? (
            <div>
              {recipeTwo.title}
              <br></br>
              <button onClick={handleChangeRecipeTwo}>Change this recipe</button>
            </div>
          ):(
            <div>
              <button onClick={handleChangeRecipeTwo}>Add Recipe Two</button>
            </div>
          )}
         </div>
        )}
        <br></br>
        <br></br>
        { changeRecipeThree ? (
          <div>
            <p>Please select a Recipe from the dropdown.</p> 
            <Form>
            <select class="form-control"  name="recipeThree"
              value={pairing.recipeThree}
              onChange={handleInputChange} >
                <option>Select a Recipe</option>
                {recipes.map((recipes, index) => 
                  <option
                    value= {recipes.id}
                    key={index}
                  >
                    {recipes.title} 
                  </option>
                )}
              </select>
            </Form>
          </div>
        ):(
          <div>
          { pairing.recipeThree ? (
            <div>
              {recipeThree.title}
              <br></br>
              <button onClick={handleChangeRecipeThree}>Change this recipe</button>
            </div>
          ):(
            <div>
              <button onClick={handleChangeRecipeThree}>Add Recipe Three</button>
            </div>
          )}
         </div>
        )}
        <br></br>
        <br></br>
        <button
          type="submit"
          onClick={updatePairing}
        >
          Update
        </button>
        <button onClick={() => {removePairing(pairing.id)}}>
          Remove Pairing from This Recipe 
        </button>
        <button onClick={() => showDeleteModal("pairing")} >
          Delete
        </button>
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} message={deleteMessage}  />
      </div>
  </div> */}

export default PairingEdit;