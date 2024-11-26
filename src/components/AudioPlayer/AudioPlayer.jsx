import { PauseIcon, PlayIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const AudioPlayer = ({ audioSrc, thumbnailSrc, title }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (audio) {
      setCurrentTime(audio.currentTime)
      setRemainingTime(duration - audio.currentTime) // Update remaining time
    }
  }

  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (audio) {
      setDuration(audio.duration)
      setRemainingTime(audio.duration)
    }
  }

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  useEffect(() => {
    if (!isPlaying) {
      setRemainingTime(duration) // Reset remaining time when paused
    }
  }, [isPlaying, duration])

  return (
    <div className='flex w-full p-2 flex-col items-center justify-center h-full bg-midnight-950 border border-midnight-700 gap-8'>
      {/* Thumbnail Image with Play/Pause Button */}
      <div className='text-center text-2xl text-wrap font-bold'>{title}</div>
      <div
        className='relative h-[300px] w-[300px] cursor-pointer rounded-0 overflow-hidden shadow-2xl transition-all transform hover:scale-105'
        onClick={togglePlayPause}
      >
        <img src={thumbnailSrc} alt='Audio Thumbnail' className='w-full h-full object-cover' />
        <div className='absolute inset-0 flex items-center justify-center'>
          {isPlaying ? (
            <PauseIcon className='h-16 w-16 text-white bg-black bg-opacity-50 rounded-full p-4' />
          ) : (
            <PlayIcon className='h-16 w-16 text-white bg-black bg-opacity-50 rounded-full p-4' />
          )}
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={audioSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} />

      {/* Remaining Session Time */}
      <div className='text-center'>
        <p className='text-lg text-gray-300 flex gap-2 flex-col'>
          <span className='font-semibold'>~Remaining~</span>
          <span className='text-4xl font-thin'>{formatTime(remainingTime)}</span>
        </p>
      </div>
    </div>
  )
}

export default AudioPlayer
