import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BasicSettings() {
  const [dark, setDark] = useState(localStorage.getItem('life-theme') === 'dark')
  const navigate = useNavigate()
  const toggleDarkMode = (mode) => {
    setDark(mode)
    localStorage.setItem('life-theme', mode ? 'dark' : 'light')
  }
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [dark])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div>
      <ul className='p-4 gap-4 divide-y text-black dark:text-white dark:divide-midnight-600'>
        <li className='flex flex-col p-2 gap-2'>
          <span>Theme</span>
          <span className='flex gap-4'>
            <button
              onClick={() => toggleDarkMode(false)}
              aria-label='Switch to light theme'
              className='w-20 h-20 bg-white border hover:border-midnight-500'
            ></button>
            <button
              onClick={() => toggleDarkMode(true)}
              aria-label='Switch to dark theme'
              className='w-20 h-20 bg-midnight-800 border border-midnight-900 hover:border-midnight-500'
            ></button>
          </span>
        </li>
        <li className='flex flex-col p-2 gap-2'>
          <span>Logout</span>
          <span className='flex gap-4'>
            <button
              onClick={() => handleLogout()}
              className='text-white bg-gray-800 dark:bg-midnight-700 p-2 hover:bg-gray-600'
            >
              Signout
            </button>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default BasicSettings
