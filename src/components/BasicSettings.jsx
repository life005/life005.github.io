import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BasicSettings() {
  const [dark, setDark] = useState(false)
  const naviage = useNavigate()
  const toggleDarkMode = (mode) => {
    setDark(mode)
    if (mode) {
      // document.body.classList.add('dark')
    } else {
      // document.body.classList.remove('dark')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    naviage('/login')
  }

  return (
    <div>
      <ul className='p-4 gap-4 divide-y divide-midnight-600'>
        <li className='flex flex-col p-2 gap-2'>
          <span>Theme</span>
          <span className='flex gap-4'>
            <button
              onClick={() => toggleDarkMode(false)}
              className='w-20 h-20  bg-white border hover:border-midnight-500'
            ></button>
            <button
              onClick={() => toggleDarkMode(true)}
              className='w-20 h-20  bg-midnight-800 border border-midnight-900 hover:border-midnight-500'
            ></button>
          </span>
        </li>
        <li className='flex flex-col p-2 gap-2'>
          <span>Louout</span>
          <span className='flex gap-4'>
            <button onClick={() => handleLogout()} className='bg-midnight-700 p-2 hover:bg-red-600'>
              Signout
            </button>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default BasicSettings
