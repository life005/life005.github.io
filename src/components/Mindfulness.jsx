import SessionList from './AudioPlayer/SessionList'
import TodaySessions from './TodaySessions'

function Mindfulness() {
  return (
    <div className='flex flex-col p-4 gap-2'>
      <TodaySessions />
      <SessionList />
    </div>
  )
}

export default Mindfulness
