import { useState } from 'react'
import CustomTabs from '../components/CustomTabs'
import Journal from '../components/Journal'
import Mindfulness from '../components/Mindfulness'

function Home() {
  const [activeTab, setactiveTab] = useState('journal')

  return (
    <div className='flex flex-col h-[84vh]'>
      <span>
        <CustomTabs activeTab={activeTab} setactiveTab={setactiveTab} />
      </span>
      <span className='flex-1 overflow-y-auto scrollbar'>
        {activeTab === 'journal' && <Journal />}
        {activeTab === 'mindfulness' && <Mindfulness />}
      </span>
    </div>
  )
}

export default Home
