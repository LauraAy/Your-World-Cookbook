import '../styles.scss'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Box} from '@mui/material';
import MenuBar from './TiptapMenuBar'

import RecipeDataService from "../services/recipe.service";

// define your extension array
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    }
  }),
  Placeholder.configure({
    placeholder: 'Directions',
  }),
  Underline, 
  TextAlign.configure({
    types: ['heading', 'paragraph'], 
    alignments: ['left', 'right'],
    defaultAlignment: 'left',
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'taskStyle',
    }
  }),

  TaskItem.configure({
    nested: true,
  })
]

const TiptapDirectionsEdit = ({setDirections}) => {
	const { id }= useParams();

	const initialRecipeState = {
    id: null,
    title: "",
    description: "",
    recipeType: "",
    servingSize: null,
    ingredients: "",
    directions: "",
    source: "",
    userId: undefined
  };

  const [recipe, setRecipe] = useState(initialRecipeState);

	 //get recipe
	 const getRecipe = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipe(response.data);
			setDirections(response.data.directions)
			window.localStorage.setItem('directions-content', response.data.directions)
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  useEffect(() => {
    if(id)
    getRecipe(id);
  }, [id])

	const editor = useEditor({
	
    extensions,
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDirections(html);
      console.log(html);
    },
    contentEditable: "true"
  })

  useEffect(() => {
    if (editor && !editor.isDestroyed) editor.commands.setContent(recipe.directions);
  }, [recipe.directions]);

  return (
  <>
    <Box sx={{ mb: "4px", border: 1, borderColor: 'rgb(196, 196, 196)', borderRadius: '5px'}}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} /> 
    </Box>
  </>
  )
}

export default TiptapDirectionsEdit