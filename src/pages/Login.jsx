import { startOfDay } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import LoginWithGoogle from '../components/LoginWithGoogle/LoginWithGoogle'
import { pbdb } from '../utils/db'

function Login() {
  // const [username, setusername] = useState('')
  // const [passowrd, setpassowrd] = useState('')
  const navigate = useNavigate()
  const date = new Date()
  const startOfDayDate = startOfDay(date)
  const today = startOfDayDate.getTime()
  const handleLogin = async () => {
    // await pbdb
    //   .collection('users')
    //   .authWithPassword(username, passowrd)
    //   .then((authData) => {
    //     if (authData.code !== 400) {
    //       navigate(`/${today}`)
    //     }
    //   })
    await pbdb
      .collection('users')
      .authWithOAuth2({ provider: 'google' })
      .then((authData) => {
        if (authData.code !== 400) {
          navigate(`/${today}`)
        }
      })
  }
  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <span className='text-xl'>life os</span>
      {/* <input className='h-10 w-80 px-2 text-xl' placeholder='username' onChange={(e) => setusername(e.target.value)} />
      <input
        className='h-10 w-80 px-2 text-xl'
        placeholder='password'
        onChange={(e) => setpassowrd(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleLogin()
          }
        }}
      /> */}
      <LoginWithGoogle handleLogin={handleLogin} />
    </div>
  )
}

export default Login
