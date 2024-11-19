import { addWeeks, format, startOfDay } from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWeekDates } from '../utils/date'
function CustomCalender() {
  const date = startOfDay(new Date().getTime())
  const today = date.getTime()
  const [activeWeek, setActiveWeek] = useState(getWeekDates(today))
  const [currentDate, setCurrentDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState(today)
  const navigate = useNavigate()
  const handleNextWeek = () => {
    const newDate = addWeeks(currentDate, 1)
    setCurrentDate(newDate)
    setActiveWeek(getWeekDates(newDate))
  }
  const handlePreviousWeek = () => {
    const newDate = addWeeks(currentDate, -1)
    setCurrentDate(newDate)
    setActiveWeek(getWeekDates(newDate))
  }
  const getActiveMonthYear = () => {
    return format(currentDate, 'MMMM yyyy') // This gives you the active month and year
  }
  const handleDateClick = (date) => {
    setSelectedDate(date)
    navigate(`/${new Date(date).getTime()}`)
  }

  return (
    <div className='flex-col'>
      <div className='flex items-center justify-center border border-midnight-800 mx-24 border-b-0'>
        {getActiveMonthYear()}
      </div>
      <div className='flex justify-between items-center'>
        <span>
          <button onClick={() => handlePreviousWeek()} className='p-2'>
            <ChevronLeftIcon />
          </button>
        </span>
        <span className='border border-midnight-800 p-2'>
          <div className='grid grid-cols-7 gap-4'>
            {activeWeek.map((day) => (
              <span key={day.day} className='col-span-1 text-center'>
                {day.day}
              </span>
            ))}
          </div>
          <div className='grid grid-cols-7 gap-4'>
            {activeWeek.map((day) => (
              <button
                onClick={() => handleDateClick(day.date)}
                key={day.date}
                className={`w-8 h-8 text-center border p-1  hover:bg-midnight-400 ${
                  day.date === format(selectedDate, 'MM-dd-yyyy') ? 'bg-midnight-400 text-white' : 'border-midnight-700'
                }`}
              >
                {day.date.split('-')[1]}
              </button>
            ))}
          </div>
        </span>
        <span>
          <button onClick={() => handleNextWeek()} className='p-2'>
            <ChevronRightIcon />
          </button>
        </span>
      </div>
    </div>
  )
}

export default CustomCalender
