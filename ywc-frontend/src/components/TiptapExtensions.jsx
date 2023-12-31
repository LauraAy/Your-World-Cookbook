import '../styles.scss'
import StarterKit from '@tiptap/starter-kit'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'


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

  export default extensions