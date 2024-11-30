import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import PWABadge from './PWABadge.jsx'
import Header from './components/Header.jsx'
import { pbdb } from './utils/db.js'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!pbdb.authStore.isValid) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='flex flex-col justify-between sm:items-center bg-midnight-950 text-midnight-50 h-screen w-screen'>
      <div className='bg-midnight-950 shadow mb-2'>
        <Header />
      </div>
      <div className='sm:w-[600px]'>
        <Outlet />
      </div>

      <PWABadge />
    </div>
  )
}

export default App
