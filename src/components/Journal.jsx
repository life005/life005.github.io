import { headingsPlugin, listsPlugin, markdownShortcutPlugin, MDXEditor, tablePlugin } from '@mdxeditor/editor'
import { format, startOfDay } from 'date-fns'
import { EditIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { pbdb } from '../utils/db'

function Journal() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isItToday, setisItToday] = useState(true)
  const [dailyJournal, setdailyJournal] = useState('loading...')
  const editorRef = useRef()
  useEffect(() => {
    const temp_date = format(new Date(Number(location.pathname.split('/')[1])), 'yyyy:MM:dd')
    const filter = `journal_date="${temp_date.toString()}"&&createdby="${pbdb.authStore.model.id}"`
    setdailyJournal('No entry !')
    const date = new Date()
    const startOfDayDate = startOfDay(date)
    const today = startOfDayDate.getTime()
    setisItToday(Number(location.pathname.split('/')[1]) === today)
    pbdb
      .collection('journals')
      .getFirstListItem(filter)
      .then((record) => {
        if (record) {
          setdailyJournal(record.day_journal)
        }
      })
      .catch((error) => {
        if (error) {
          setdailyJournal('No entry !')
        }
      })
  }, [location.pathname])
  useEffect(() => {
    editorRef.current?.setMarkdown(dailyJournal)
  }, [dailyJournal])

  return (
    <div className='items-center p-2'>
      <span className='flex flex-col border border-midnight-700 mt-5'>
        <span className='flex min-h-80 items-center bg-black'>
          {dailyJournal && (
            <MDXEditor
              ref={editorRef}
              contentEditableClassName='prose'
              className='dark-theme'
              markdown={dailyJournal}
              readOnly={true}
              plugins={[listsPlugin(), headingsPlugin(), tablePlugin(), markdownShortcutPlugin()]}
            />
          )}
        </span>
      </span>
      <span className='flex justify-center'>
        {isItToday && (
          <button
            onClick={() => navigate(`/editor${location.pathname}`)}
            className='flex gap-4 bg-midnight-500 border border-midnight-500 bottom-4 right-4 hover:bg-midnight-700 text-white font-bold p-2 shadow-lg'
          >
            <EditIcon /> Write
          </button>
        )}
      </span>
    </div>
  )
}

export default Journal
