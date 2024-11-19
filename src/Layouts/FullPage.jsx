import { startOfDay } from 'date-fns'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { pbdb } from '../utils/db'

function FullPage() {
  const navigate = useNavigate()
  const date = startOfDay(new Date().getTime())
  const today = date.getTime()
  useEffect(() => {
    if (!pbdb.authStore.isValid) {
      navigate('/login')
    } else {
      navigate(`/${today}`)
    }
  }, [])
  return (
    <div className='flex flex-col justify-between sm:items-center bg-midnight-950 text-midnight-50 h-screen w-screen'>
      <div className='sm:w-[600px]'>
        <Outlet />
      </div>
    </div>
  )
}

export default FullPage
