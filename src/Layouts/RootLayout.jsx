import { startOfDay } from 'date-fns'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PWABadge from '../PWABadge.jsx'
import { pbdb } from '../utils/db.js'

function RootLayout() {
  const navigate = useNavigate()
  const date = startOfDay(new Date().getTime())
  const today = date.getTime()
  useEffect(() => {
    if (!pbdb.authStore.isValid) {
      navigate('/login')
    } else {
      navigate(`/${today}`)
    }
  }, [])
  return (
    <div>
      <Outlet />
      <PWABadge />
    </div>
  )
}

export default RootLayout
