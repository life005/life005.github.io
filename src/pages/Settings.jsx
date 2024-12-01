import { Outlet } from 'react-router-dom'
import PWABadge from '../PWABadge'
import Navigation from '../components/Navigation'

function Settings() {
  return (
    <div className='flex dark:bg-midnight-950  h-screen w-screen justify-center text-midnight-50'>
      <div className='w-screen sm:w-[500px] sm:h-[700px]'>
        <Navigation title={'Settings'} />
        <Outlet />
        <PWABadge />
      </div>
    </div>
  )
}

export default Settings
