import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { pbdb } from '../utils/db'

function TodaySessions() {
  const [sessions, setSessions] = useState([])
  const location = useLocation()
  const temp_date = format(new Date(Number(location.pathname.split('/')[1])), 'yyyy:MM:dd')

  const getFullImageUrl = (session) => {
    return `${import.meta.env.VITE_POCKET_BASE_URL}/api/files/${session.session_collection_id}/${session.session}/${session.session_thumbnail}` // Append the base URL of your PocketBase instance
  }
  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60)
    const seconds = Math.floor(durationInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  useEffect(() => {
    const filter = `session_date="${temp_date.toString()}"`
    pbdb
      .collection('mindfulness')
      .getList(1, 50, { filter: filter })
      .then((records) => {
        setSessions(records.items)
      })
  }, [temp_date])
  return (
    <div className='flex flex-col items-center bg-midnight-950'>
      <span className='flex gap-2 w-full'>
        <h2 className='text-xl text-gray-300 mb-2'>Played Sessions</h2>
      </span>

      {/* List of Sessions */}
      <div className='w-full max-w-xl'>
        <ul className='space-y-4'>
          {sessions &&
            sessions.map((session, index) => (
              <li key={index} className='flex gap-4 h-30 p-2 border border-midnight-500'>
                <div className='h-14 w-14 overflow-hidden'>
                  <img src={getFullImageUrl(session)} alt='Session Thumbnail' className='w-full h-full object-cover' />
                </div>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-md text-white'>{session.session_title}</h3>
                  <p className='text-gray-400'>{`In session for ${formatDuration(parseInt(session.duration))}`}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default TodaySessions
