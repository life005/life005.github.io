import { Outlet } from 'react-router-dom'
import './App.css'
import PWABadge from './PWABadge.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <div className='bg-midnight-950 text-midnight-50 flex h-screen w-screen justify-center font-noto'>
      <div className='w-screen sm:w-[500px] sm:h-[700px]'>
        <Header />
        <Outlet />
        <PWABadge />
      </div>
    </div>
  )
}

export default App
