import { EllipsisVerticalIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { pbdb } from '../utils/db'
import CustomCalender from './CustomCalender'
function Header() {
  const navigate = useNavigate()
  const { name, username } = pbdb.authStore.model || { name: '', username: '' }
  return (
    <div className='flex-col'>
      <span>
        <CustomCalender />
      </span>
      <span className='h-10 flex justify-between items-center p-2'>
        <span className='text-lg'>Hey {name || username} ! </span>
        <span>
          <button onClick={() => navigate('/settings')}>
            <EllipsisVerticalIcon size={24} className='text-black dark:text-midnight-700' />
          </button>
        </span>
      </span>
    </div>
  )
}

export default Header
