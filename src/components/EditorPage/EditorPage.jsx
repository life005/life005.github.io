import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import Navigation from '../Navigation'
import './styles.css'
function EditorPage() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'paragraph',
        content: 'Welcome to this demo!',
      },
      {
        type: 'paragraph',
        content: 'Open up a menu or toolbar to see more of the red theme',
      },
      {
        type: 'paragraph',
        content: 'Toggle light/dark mode in the page footer and see the theme change too',
      },
      {
        type: 'paragraph',
      },
    ],
  })

  // Renders the editor instance using a React component.
  return (
    <div className='h-screen min-h-[500px]'>
      <Navigation title={'Editor'} />
      <BlockNoteView editor={editor} theme={'dark'} className='dark-theme' />
    </div>
  )
}

export default EditorPage
