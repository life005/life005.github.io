import { useState } from 'react'
import CustomTabs from '../components/CustomTabs'
import Journal from '../components/Journal'

function Home() {
  const [activeTab, setactiveTab] = useState('journal')

  return (
    <div className='flex flex-col justify-between h-[80vh]'>
      <span className='overflow-y-auto scrollbar'>{activeTab === 'journal' && <Journal />}</span>
      <span>
        <CustomTabs activeTab={activeTab} setactiveTab={setactiveTab} />
      </span>
    </div>
  )
}

export default Home
