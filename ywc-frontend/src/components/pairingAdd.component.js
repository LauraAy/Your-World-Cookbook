import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Box, Button, FormControl, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RecipeDataService from "../services/recipe.service";
import PairingDataService from "../services/pairing.service";
import { useParams, useNavigate } from 'react-router-dom';

const styles = {
  borderBox: {
    position: 'relative',
    textAlign: 'left', 
    margin: '10px',
    padding: '20px',
    border: '5px solid #890010',
  }
}

const filter = createFilterOptions();

const PairingAddComponent = () => { 
	const { id } = useParams();
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
		recipeOne:"",
		recipeTwo:"",
		recipeThree:""
  };

  const [pairings, setPairings] = useState ([]);  
  const [pairing, setPairing] = useState(initialPairingState);
  const [currentPairing, setCurrentPairing] = useState(initialPairingState)
  const [currentPairingId, setCurrentPairingId] = useState()
  const [recipes, setRecipes] = useState([])
  const [currentRecipe, setCurrentRecipe] = useState ([]);
	const [selectedRecipeOneId, setSelectedRecipeOneId] = useState ()
	const [selectedRecipeTwoId, setSelectedRecipeTwoId] = useState ()
	const [selectedRecipeThreeId, setSelectedRecipeThreeId] = useState ()
  const [selected, setSelected] = useState (false)
  const [submitted, setSubmitted] = useState(false);
  const [added, setAdded] = useState(false);
  const [createNew, setCreateNew] = useState(false)
  
  //retrieve recipe and pairings
  useEffect(() => {
	retrieveRecipe(id);
	retrievePairings();	
	retrieveRecipes();
  }, []);


  const retrieveRecipe = id => {
		RecipeDataService.get(id)
		.then(response => {
			setCurrentRecipe(response.data);
			console.log(response.data);
		})
		.catch(e => {  
			console.log(e) 
		});
  };

  const retrievePairings = () => {
	PairingDataService.getAll()
	.then(response => {
		setPairings(response.data);
		console.log(response.data);
	})
	.catch(e => {
		console.log(e);
	});
  };

	const retrieveRecipes = () => {
		RecipeDataService.getAll()
		.then(response => {
			setRecipes(response.data);
		})
		.catch(e => {
			console.log(e);
		})
	}

	//filter pairings options by pairingName
	function compare( a, b ) {
    if ( a.pairingName < b.pairingName ){
      return -1;
    }
    if ( a.pairingName > b.pairingName ){
      return 1;
    }
    return 0;
  }
  
  const pairingOptions = pairings.sort( compare );


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
  
  });
  
  const onSubmit = (data) => {
    console.log(data);
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
	

	//create new pairing set to true
	const goCreate = () => {
		setCreateNew(true)
	}

  //save pairing from form
  const savePairing = (formData) => {
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

	PairingDataService.create(data)
	.then(response => {
		setPairing({
			id: response.data.id,
			pairingName: response.data.pairingName,
			description: response.data.description,
			drinks: response.data.drinks,
			shows: response.data.shows,
			games: response.data.games,
			books: response.data.books,
			music: response.data.music,
			decor: response.data.decor,
			more: response.data.more,
			recipeOne: response.data.recipeOne
		});
		setSubmitted(true);
		setPairing(response.data)
		console.log(response.data);
	})
	.catch(e => {
		console.log(e);
	});
  };

  //attach pairing created from form to recipe
  const savePairingRecipe = () => {
	const data = {
		pairingId: pairing.id
	}

  RecipeDataService.update(currentRecipe.id, data)
      .then(response => {
        console.log(response.data);
        navigate("/recipes/" + currentRecipe.id)
      })
      .catch(e => {
        console.log(e);
      });
  }

  //retrieve pairing from id based on dropdown selection
  const retrievePairing = id => {
		PairingDataService.get(id)
		.then(response => {
			setPairing(response.data);
			setSelected(true)
			console.log(response.data);
		})
		.catch(e => {   
			console.log(e)
		});
  };

  //retrieve pairingId from dropdown selection and run retrievePairing function
  const handlePairingChange = async (event, option) => {
		setCurrentPairingId(option.id);
		console.log(option.id)
  }

  useEffect(()=>{
		console.log(currentPairingId)
		retrievePairing(currentPairingId)
  }, [currentPairingId])

  //attach pairing selected from dropdown to recipe
  const savePairingRecipeDropdown = () => {
		var data = {
			pairingId: currentPairingId
		};

		RecipeDataService.update(currentRecipe.id, data)
		.then(response => {
			setAdded(true)
			console.log(response.data);
			// navigate("/recipes/" + currentRecipe.id)
		})
		.catch(e => {
			console.log(e);
		});
  }
  
  //Reset form for new pairing
  const newPairing = () => {
		setPairing(initialPairingState);
		setCurrentPairing(initialPairingState);
		setCreateNew(false);
		setSelected(false);
		setAdded(false);
		setSubmitted(false);
  };

  //navigate to recipe page
  const returnRecipe = () => {
		navigate("/recipes/" + id)
  }

  //navigate to add a new region
  const addRegion = () => {
		navigate("/regions/add/" + id) 
  }

  //navigate to add a new creator
  const addCreator = () => {
		navigate("/creators/add/:id")
  }

	return(
	<>
		{ added ? (
		<>
			<Box m={2}>
				<Typography variant="h4">You've added {pairing.pairingName} to {currentRecipe.title}</Typography>
			</Box>
			<Box m={2}>
				<Button variant="contained" onClick={returnRecipe}>View Recipe Page</Button>
			</Box>
			<Button sx={{my: 2, ml: 2}} variant="outlined" color="secondary"  onClick={addRegion}>Add a Region</Button>
			<Button sx={{my: 2, ml: 2}} variant="outlined" color="creator" onClick={addCreator}>Add a Recipe Creator</Button>
		</>
		):(
		<>
			{ createNew ? (
			<>
				{submitted ? (
				<>
					<Typography variant="h4">You've created {pairing.pairingName}</Typography>
					<Typography variant="h6">Add this pairing to {currentRecipe.title}.</Typography>
					<Button sx={{my: 1, ml: 2}} variant="contained" color="info" onClick={savePairingRecipe}>
						Add
					</Button>
				</>
				):(
				<>
					<Typography 
						variant="h4" 
						align="center" 
						margin="dense"
						sx={{ color: "pairing.main" }}
					>
						Create a New Recipe Pairing
					</Typography>
					<Box style={styles.borderBox}>
						<FormControl fullWidth>
							<TextField
								sx={{ mt: 2, mb: 2 }}
								required
								id="pairingName"
								name="pairingName"
								label="Pairing Name"
								placeholder="Pairing Name"
								defaultValue=""
								fullWidth
								margin="dense"
								{...register('pairingName')}
								error={errors.pairingName ? true : false}
							/>
							<Typography variant="inherit" color="textSecondary">
								{errors.pairingName?.message}
							</Typography>
						</FormControl>
						<TextField
							sx={{ mb: 2 }}
							id="description"
							defaultValue=""
							name="description"
							label="Description"
							placeholder="Description"
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
							placeholder="More"
							fullWidth
							margin="dense"
							multiline
							rows={2}
							{...register('more')}
						/>
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
						<Typography variant= "h6">
							Select a second related recipe from the dropdown.
						</Typography>
						<Autocomplete
							sx={{ mb: 2 }}
							fullWidth
							disablePortal
							disableClearable
							onChange={handleRecipeTwoChange}
							id="recipeTwo"
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
						<Typography variant= "h6">
							Select a third related recipe from the dropdown.
						</Typography>
						<Autocomplete
							sx={{ mb: 2 }}
							fullWidth
							disablePortal
							disableClearable
							onChange={handleRecipeThreeChange}
							id="recipeThree"
							options={recipes.map((option, index) => option)}
							getOptionLabel={(option) => option.title}
							renderInput={(option) => (
								<TextField
									{...option}
									label="Recipe Pairing"
									InputProps={{
										...option.InputProps,
										type: 'search',
									}}
								/>
							)}
						/>
						<Box mt={3}>
							<Button
								variant="contained"
								color="info"
								onClick={handleSubmit(savePairing)}
							>
								Create Recipe Pairing
							</Button>
						</Box>
					</Box>
				</>
				)}
			</>
			):(
			<>
				{ selected ? (
				<>
					<Box style={styles.borderBox}>
						<Typography variant="h5" sx={{color: "pairing.main"}}>
							Selected Pairing:
						</Typography>
						<Box mt={2}>
							<Typography variant="body1"  >
								{pairing.pairingName}
							</Typography>
						</Box>
						<Box mt={1}>
							<Button
								variant="contained"
								color="info"
								onClick={savePairingRecipe}
							>
								Add to {currentRecipe.title}
							</Button>
						</Box>
					</Box>
					<Box style={styles.borderBox}>
						<Typography variant="h6">
							Or select a different pairing from the dropdown.
						</Typography>
						<Autocomplete
							mt={1}
							fullWidth
							disablePortal
							disableClearable
							onChange={handlePairingChange}
							id="pairing"
							options={pairingOptions.map((option) => option)}
							getOptionLabel={(option) => option.pairingName}
							renderInput={(option) => (
								<TextField
									{...option}
									label="Recipe Pairing"
									InputProps={{
										...option.InputProps,
										type: 'search',
									}}
									{...register('pairing')}
								/>
							)}
						/>
					</Box>
				</>
        ):(
				<>
					<Box style={styles.borderBox}>
            <Typography variant="h6">Please select a recipe pairing from the dropdown.</Typography>
            <Box mt={1}>
              <Autocomplete
                fullWidth
                disablePortal
                disableClearable
                onChange={handlePairingChange}
                id="pairing"
                options={pairingOptions.map((option) => option)}
                getOptionLabel={(option) => option.pairingName}
                renderInput={(option) => (
                  <TextField
                    {...option}
                    label="Recipe Pairing"
                    InputProps={{
                      ...option.InputProps,
                      type: 'search',
                    }}
                    {...register('pairing')}
                  />
                )}
              />
            </Box>
					</Box>
					<Box style={styles.borderBox}>
            <Typography variant="h6">Or create a new Pairing.</Typography>
            <Box mt={1}>
              <Button variant="contained" color="info" onClick={goCreate}>New Pairing</Button>
            </Box>
					</Box>
        </>
        )}
      </>
      )}
    </>
    )}
  </>
  )
}

export default PairingAddComponent;