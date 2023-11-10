import '../styles.scss'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import React from 'react'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Box} from '@mui/material';
import MenuBar from './TiptapMenuBar'
// import extensions from './TiptapExtensions'

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
    placeholder: 'Ingredients',
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

const content = ''

const TiptapIngredientsAdd = ({setIngredients}) => {


  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setIngredients(html);
      console.log(html);
    }
  })

  return (
  <>
    <Box sx={{ mb: "4px", border: 1, borderColor: 'rgb(196, 196, 196)', borderRadius: '5px'}}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} /> 
    </Box>
  </>
  )
}


export default TiptapIngredientsAdd