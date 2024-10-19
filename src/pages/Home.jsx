import { useState } from 'react'
import CustomTabs from '../components/CustomTabs'
import Journal from '../components/Journal'

function Home() {
  const [activeTab, setactiveTab] = useState('journal')
  return (
    <div>
      <CustomTabs activeTab={activeTab} setactiveTab={setactiveTab} />
      {activeTab === 'journal' && <Journal />}
    </div>
  )
}

export default Home
