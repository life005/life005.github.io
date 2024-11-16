import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  InsertTable,
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
import { useLocation } from 'react-router-dom'
import { pbdb } from '../../utils/db'
import Navigation from '../Navigation'
import './styles.css'
function EditorPage() {
  const location = useLocation()
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
          pbdb.collection('journals').update(record.id, data)
        }
      })
      .catch((err) => {
        if (err) {
          pbdb.collection('journals').create(data)
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
    <div className='bg-midnight-950 '>
      <span className='z-10 fixed w-full'>
        <Navigation title={'Editor'} />
      </span>
      <span className=''>
        <MDXEditor
          ref={editorRef}
          contentEditableClassName='prose text-white'
          className='dark-theme h-[90vh] overflow-y-scroll scrollbar text-black pt-14'
          markdown={'# Hi , Write something magical !'}
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
                  <InsertTable />
                </div>
              ),
            }),
          ]}
        />
      </span>
      <span className='flex justify-center'>
        <button
          className='w-20 text-white h-10 border border-midnight-700 hover:border-white'
          onClick={() => handleSave(editorRef.current?.getMarkdown())}
        >
          Save
        </button>
      </span>
    </div>
  )
}

export default EditorPage
