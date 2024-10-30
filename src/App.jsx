import { Outlet } from 'react-router-dom'
import './App.css'
import PWABadge from './PWABadge.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <div className='flex flex-col justify-between sm:items-center bg-midnight-950 text-midnight-50 h-screen w-screen'>
      <div className='sm:w-[600px]'>
        <Outlet />
      </div>
      <div>
        <Header />
      </div>
      <PWABadge />
    </div>
  )
}

export default App
