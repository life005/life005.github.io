import { startOfDay } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginWithGoogle from '../components/LoginWithGoogle/LoginWithGoogle'
import { pbdb } from '../utils/db'

function Login() {
  const [username, setusername] = useState('')
  const [passowrd, setpassowrd] = useState('')
  const navigate = useNavigate()
  const date = new Date()
  const startOfDayDate = startOfDay(date)
  const today = startOfDayDate.getTime()
  const handleLogin = async () => {
    await pbdb
      .collection('users')
      .authWithOAuth2({ provider: 'google' })
      .then((authData) => {
        if (authData.code !== 400) {
          navigate(`/${today}`)
        }
      })
  }
  const handlePwdLogin = async () => {
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
    <div className='flex w-full flex-col items-center gap-8 p-4'>
      <span className='text-xl'>life os</span>
      <span className='flex flex-col items-center gap-2'>
        <span>Login with password </span>
        <input
          className='h-10 w-80 px-2 text-xl'
          type='text'
          placeholder='username'
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          className='h-10 w-80 px-2 text-xl'
          placeholder='password'
          type='password'
          onChange={(e) => setpassowrd(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin()
            }
          }}
        />
        <button className='flex p-2 bg-midnight-500' onClick={() => handlePwdLogin()}>
          Login
        </button>
      </span>
      <span className='w-full border border-midnight-600' />
      <span className='flex flex-col gap-2 items-center'>
        <span>Login using Others</span>
        <LoginWithGoogle handleLogin={handleLogin} />
      </span>
    </div>
  )
}

export default Login
