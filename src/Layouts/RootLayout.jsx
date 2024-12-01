import { startOfDay } from 'date-fns'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PWABadge from '../PWABadge.jsx'
import { pbdb } from '../utils/db.js'

function RootLayout() {
  const navigate = useNavigate()

  const date = new Date()
  const startOfDayDate = startOfDay(date)
  const today = startOfDayDate.getTime()
  useEffect(() => {
    if (localStorage.getItem('life-theme') === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [])

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
