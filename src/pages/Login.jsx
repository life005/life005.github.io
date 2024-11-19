import { startOfDay } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pbdb } from '../utils/db'

function Login() {
  const [username, setusername] = useState('')
  const [passowrd, setpassowrd] = useState('')
  const navigate = useNavigate()
  const date = startOfDay(new Date().getTime())
  const today = date.getTime()
  const handleLogin = async () => {
    await pbdb
      .collection('users')
      .authWithPassword(username, passowrd)
      .then((authData) => {
        if (authData.code !== 400) {
          navigate(`/${today}`)
        }
      })
  }
  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <span className='text-xl'>life os</span>
      <input className='h-10 w-80 px-2 text-xl' placeholder='username' onChange={(e) => setusername(e.target.value)} />
      <input
        className='h-10 w-80 px-2 text-xl'
        placeholder='password'
        onChange={(e) => setpassowrd(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleLogin()
          }
        }}
      />
      <button className='w-40 border border-midnight-600 h-10 hover:border-white' onClick={() => handleLogin()}>
        Login
      </button>
    </div>
  )
}

export default Login
