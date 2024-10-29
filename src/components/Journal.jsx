import { EditIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Journal() {
  const navigate = useNavigate()
  return (
    <div className='sm:w-[500px] items-center p-2'>
      <span className='flex flex-col border border-midnight-700 mt-5'>
        <span className='flex h-40 items-center justify-center text-2xl opacity-30'> placeholder </span>
        <span className='flex justify-center'>
          <button
            onClick={() => navigate('editor')}
            className='flex  gap-4 bg-midnight-500 border border-midnight-500 bottom-4 right-4 hover:bg-midnight-700 text-white font-bold p-2 shadow-lg'
          >
            <EditIcon /> Edit
          </button>
        </span>
      </span>
    </div>
  )
}

export default Journal
