import { startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SessionList from './SessionList'
import TodaySessions from './TodaySessions'

function Mindfulness() {
  const location = useLocation()
  const [isItToday, setisItToday] = useState(true)
  useEffect(() => {
    const date = new Date()
    const startOfDayDate = startOfDay(date)
    const today = startOfDayDate.getTime()
    setisItToday(Number(location.pathname.split('/')[1]) === today)
  }, [isItToday, location.pathname])

  return (
    <div className='flex flex-col p-4 gap-2'>
      <TodaySessions />
      {isItToday && <SessionList />}
    </div>
  )
}

export default Mindfulness
