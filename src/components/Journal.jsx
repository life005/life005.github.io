import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Journal() {
  const navigate = useNavigate()
  return (
    <div className='relative sm:w-[500px] items-center'>
      <button
        onClick={() => navigate('editor')}
        className='fixed bg-midnight-500 border border-midnight-500 bottom-4 right-4 hover:bg-midnight-700 text-white font-bold p-2 shadow-lg'
      >
        <PlusIcon />
      </button>
    </div>
  )
}

export default Journal
