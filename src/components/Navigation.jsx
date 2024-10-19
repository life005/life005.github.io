import { FlagIcon, MoveLeftIcon } from 'lucide-react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function Navigation({ title }) {
  const navigate = useNavigate()
  return (
    <div className='flex justify-between p-2'>
      <span>
        <button onClick={() => navigate(-1)} className='px-2 '>
          <MoveLeftIcon />
        </button>
      </span>
      <span>{title}</span>
      <span>
        <FlagIcon />
      </span>
    </div>
  )
}

Navigation.propTypes = {
  title: PropTypes.string,
}

export default Navigation
