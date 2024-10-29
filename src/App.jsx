import { Outlet } from 'react-router-dom'
import './App.css'
import PWABadge from './PWABadge.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <div className='flex flex-col justify-between bg-midnight-950 text-midnight-50 h-screen w-screen font-noto'>
      <div>
        <Outlet />
      </div>
      <div className='w-screen'>
        <Header />
      </div>
      <PWABadge />
    </div>
  )
}

export default App
