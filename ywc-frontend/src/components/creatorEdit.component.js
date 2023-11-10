import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Button, FormControl,  Paper, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CreatorDataService from "../services/creator.service";
import CreatorRecipeDataService from "../services/creatorRecipe.service";

const styles = {
	borderBox: {
		position: 'relative',
		textAlign: 'left', 
		margin: '10px',
		padding: '20px',
		border: '5px solid #4a148c',
	}
}

const CreatorEdit = props => {
  const filter = createFilterOptions();
  const { recipeId, creatorId }= useParams();
  let navigate = useNavigate();

  const initialCreatorState = {
    id: null,
    creatorName: "",
    about: "",
    link: ""
  };

  const [creator, setCreator] = useState(initialCreatorState);

  //get creator
  const getCreator = creatorId => {
    CreatorDataService.get(creatorId)
      .then(response => {
        setCreator(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if(creatorId)
    getCreator(creatorId);
  }, [creatorId]);

  //react-hook-form and yup functions
  const validationSchema = Yup.object().shape({
    creatorName: Yup.string()
      .required('Creator name is required.'),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    values: { creatorName: creator.creatorName, about: creator.about, link: creator.link},
  });

  const onSubmit = (data) => {
    register("creatorName", "about", "link");
    console.log(data);
  };

  //update Creator
  const updateCreator = (formData) => {
    var data = {
      creatorName: formData.creatorName,
      about: formData.about,
      link: formData.link
    };

    CreatorDataService.update(creator.id, data)
      .then(response => {
        console.log(response.data);
        navigate("/recipes/" + recipeId)
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
  <>
    <Typography variant="h4" color="region.main" align="center" margin="dense">
      Edit {creator.creatorName}
    </Typography>
    <Box style={styles.borderBox}>
      <FormControl fullWidth>
        <TextField
          sx={{ mt: 2, mb: 2 }}
          id="creatorName"
          name="creatorName"
          label="Creator Name"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="dense"
          multiline
          rows={1}
          {...register('creatorName')}
          error={errors.title ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.creatorName?.message}
        </Typography>
        <TextField
          sx={{ mt: 2, mb: 2 }}
          id="about"
          name="about"
          label="About"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="dense"
          multiline
          rows={2}
          {...register('about')}
        />
        <TextField
          sx={{ mb: 2 }}
          defaultValue=""
          name="link"
          label="Link"
          placeholder="Link"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="dense"
          rows={2}
          {...register('link')}
        />
      </FormControl>
      <Box>
        <Button
          onClick={handleSubmit(updateCreator)}
          variant="contained"
          sx={{ backgroundColor: 'creator.main', borderColor: 'creator.main', ":hover": { backgroundColor: 'creator.light'} }}
        >
          Update
        </Button> 
      </Box>
    </Box>
  
  </>
  );
};

export default CreatorEdit;