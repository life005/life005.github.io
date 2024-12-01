import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  tablePlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { pbdb } from '../../utils/db'
import Navigation from '../Navigation'
import './styles.css'
function EditorPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const editorRef = useRef(null)
  const [dailyJournal, setdailyJournal] = useState('loading...')
  const handleSave = async (document) => {
    const temp_date = format(new Date(Number(location.pathname.split('/')[2])), 'yyyy:MM:dd')
    const filter = `journal_date="${temp_date.toString()}"&&createdby="${pbdb.authStore.model.id}"`
    const data = {
      day_journal: document,
      createdby: pbdb.authStore.model.id,
      journal_date: temp_date,
    }
    pbdb
      .collection('journals')
      .getFirstListItem(filter)
      .then((record) => {
        if (record) {
          pbdb
            .collection('journals')
            .update(record.id, data)
            .then(() => {
              toast.success('Saved !', {
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
              navigate(-1)
            })
        }
      })
      .catch((err) => {
        if (err) {
          pbdb
            .collection('journals')
            .create(data)
            .then(() => {
              toast.success('Saved !', {
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
              navigate(-1)
            })
        }
      })
  }

  useEffect(() => {
    const temp_date = format(new Date(Number(location.pathname.split('/')[2])), 'yyyy:MM:dd')
    const filter = `journal_date="${temp_date.toString()}"&&createdby="${pbdb.authStore.model.id}"`
    setdailyJournal('No entry !')
    pbdb
      .collection('journals')
      .getFirstListItem(filter)
      .then((record) => {
        if (record) {
          setdailyJournal(record.day_journal)
          editorRef.current?.setMarkdown(record.day_journal)
        }
      })
      .catch((error) => {
        if (error) {
          setdailyJournal('No entry !')
        }
      })
  }, [location.pathname])

  // Renders the editor instance using a React component.
  return (
    <div className='dark:bg-midnight-950 bg-white dark:text-white'>
      <span className='z-10 fixed w-full'>
        <Navigation title={'Editor'} />
      </span>
      <span className='border'>
        <MDXEditor
          ref={editorRef}
          contentEditableClassName='prose'
          className='dark:dark-theme h-[84vh] overflow-y-scroll scrollbar text-black mt-8'
          placeholder={'Hi , Write something magical !'}
          markdown=''
          plugins={[
            listsPlugin(),
            headingsPlugin(),
            tablePlugin(),
            markdownShortcutPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <div className='flex'>
                  <UndoRedo />
                  <BlockTypeSelect />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                </div>
              ),
            }),
          ]}
        />
      </span>
      <span className='flex justify-center'>
        <button
          className='w-20 h-10 border dark:border-midnight-700 hover:dark:border-white'
          onClick={() => handleSave(editorRef.current?.getMarkdown())}
        >
          Save
        </button>
      </span>
    </div>
  )
}

export default EditorPage
