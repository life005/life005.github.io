import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { pbdb } from '../../utils/db'
import AudioPlayer from './AudioPlayer' // Audio player component

const SessionList = () => {
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const temp_date = format(new Date(Number(location.pathname.split('/')[1])), 'yyyy:MM:dd')

  const handleSessionClick = (session) => {
    setSelectedSession(session)
  }

  const handleClosePlayer = (session) => {
    const data = {
      session: session.id,
      session_collection_id: session.collectionId,
      session_title: session.title,
      session_thumbnail: session.thumbnail,
      user: pbdb.authStore.model.id,
      duration: session.duration,
      session_date: temp_date,
    }
    pbdb
      .collection('mindfulness')
      .create(data)
      .then(() => {
        toast.success('Session done !', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      })
    setSelectedSession(null) // Close the audio player
    navigate()
  }

  useEffect(() => {
    pbdb
      .collection('sessions_data')
      .getFullList({
        sort: '-created',
      })
      .then((records) => {
        setSessions(records)
      })
  }, [])

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60)
    const seconds = Math.floor(durationInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const getFullImageUrl = (session) => {
    return `${import.meta.env.VITE_POCKET_BASE_URL}/api/files/${session.collectionId}/${session.id}/${session.thumbnail}` // Append the base URL of your PocketBase instance
  }
  const getFullAudioUrl = (session) => {
    return `${import.meta.env.VITE_POCKET_BASE_URL}/api/files/${session.collectionId}/${session.id}/${session.audio}` // Append the base URL of your PocketBase instance
  }

  return (
    <div className='flex flex-col items-center bg-midnight-950'>
      <span className='flex gap-2 w-full'>
        <h2 className='text-xl text-gray-300 mb-2'>Available Sessions</h2>
      </span>

      {/* List of Sessions */}
      <div className='w-full max-w-xl'>
        <ul className='space-y-4'>
          {sessions.map((session, index) => (
            <li
              key={index}
              className='flex gap-4 h-30 cursor-pointer p-2 border border-midnight-700 shadow-md hover:border-midnight-100 transition'
              onClick={() => handleSessionClick(session)}
            >
              <div className='h-24 w-24 overflow-hidden'>
                <img
                  src={getFullImageUrl(session)}
                  alt='Session Thumbnail'
                  className='w-full h-full object-scale-down'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-xl text-white'>{session.title}</h3>
                <p className='text-gray-400'>{`Duration: ${formatDuration(session.duration)}`}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Show AudioPlayer in Fullscreen if session is selected */}
      {selectedSession && (
        <div className='fixed inset-0 bg-midnight-900 bg-opacity-80 z-50 flex items-center justify-center'>
          <div className='relative w-full h-full p-4 flex flex-col items-center justify-center bg-midnight-900  rounded-lg'>
            <AudioPlayer
              handleClosePlayer={handleClosePlayer}
              session={selectedSession}
              audioSrc={getFullAudioUrl(selectedSession)}
              thumbnailSrc={getFullImageUrl(selectedSession)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SessionList
