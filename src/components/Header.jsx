import { EllipsisVerticalIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CustomCalender from './CustomCalender'
function Header() {
  const navigate = useNavigate()

  return (
    <div className='flex-col gap-2'>
      <span className='h-10 flex justify-between items-center p-2'>
        <span className='text-lg'>Welcome message !</span>
        <span>
          <button onClick={() => navigate('settings')}>
            <EllipsisVerticalIcon size={24} className='text-gray-400' />
          </button>
        </span>
      </span>
      <span>
        <CustomCalender />
      </span>
    </div>
  )
}

export default Header
