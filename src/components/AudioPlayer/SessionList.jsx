import { XSquare } from 'lucide-react' // Close icon
import { useEffect, useState } from 'react'
import { pbdb } from '../../utils/db'
import AudioPlayer from './AudioPlayer' // Audio player component

const SessionList = () => {
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)

  const handleSessionClick = (session) => {
    setSelectedSession(session)
  }

  const handleClosePlayer = () => {
    setSelectedSession(null) // Close the audio player
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
    <div className='flex flex-col items-center bg-midnight-950 p-8 '>
      <span className='flex gap-2 w-full'>
        <h2 className='text-2xl text-gray-300 mb-6'>Mindfulness Sessions</h2>
      </span>

      {/* List of Sessions */}
      <div className='w-full max-w-xl h-screen'>
        <ul className='space-y-4'>
          {sessions.map((session, index) => (
            <li
              key={index}
              className='flex gap-4 h-30 cursor-pointer p-2 border border-midnight-700 shadow-md hover:border-midnight-100 transition'
              onClick={() => handleSessionClick(session)}
            >
              <div className='h-24 w-24 overflow-hidden'>
                <img src={getFullImageUrl(session)} alt='Session Thumbnail' className='w-full h-full object-cover' />
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
            <button onClick={handleClosePlayer} className='absolute top-4 right-4 text-white bg-red-600 p-2'>
              <XSquare />
            </button>
            <AudioPlayer
              audioSrc={getFullAudioUrl(selectedSession)}
              thumbnailSrc={getFullImageUrl(selectedSession)}
              title={selectedSession.title}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SessionList
