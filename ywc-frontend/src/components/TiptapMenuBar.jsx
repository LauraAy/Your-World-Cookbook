import '../styles.scss'
import React from 'react'
import { FormatBoldOutlined, FormatItalicOutlined, FormatUnderlinedOutlined, StrikethroughSOutlined,
  FormatListBulletedOutlined, FormatListNumberedOutlined, HorizontalRuleOutlined, TitleOutlined,
  UndoOutlined, RedoOutlined, ChecklistOutlined} from '@mui/icons-material'
import { Box} from '@mui/material';


const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  
  return (
    <>
      <Box ml={1} className='menu-bar'>
        <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FormatBoldOutlined />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FormatItalicOutlined />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <FormatUnderlinedOutlined />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <StrikethroughSOutlined />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          <TitleOutlined />
        </button>
      
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <FormatListBulletedOutlined />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <FormatListNumberedOutlined />
        </button>
        <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive('taskList') ? 'is-active' : ''}
        inline
        >
          <ChecklistOutlined />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <HorizontalRuleOutlined />
        </button>
        </div>
        <div>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <UndoOutlined/>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <RedoOutlined />
        </button>
        </div>
      </Box>
    </>
  )
}

export default MenuBar