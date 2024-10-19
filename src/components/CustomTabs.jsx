import PropTypes from 'prop-types'

function CustomTabs({ activeTab, setactiveTab }) {
  return (
    <div className='grid grid-cols-3 border-t border-blue-500 mt-4'>
      <button
        className={`py-2 col-span-1  border-blue-900 text-center ${activeTab === 'journal' ? 'border-b-4' : ''}`}
        onClick={() => setactiveTab('journal')}
      >
        Journal
      </button>
      <button
        className={`py-2 col-span-1 border-blue-900 text-center ${activeTab === 'calorie-tracker' ? 'border-b-4' : ''}`}
        onClick={() => setactiveTab('calorie-tracker')}
      >
        Calorie Tracker
      </button>
      <button
        className={`py-2 col-span-1 border-blue-900 text-center ${activeTab === 'mindfulness' ? 'border-b-4' : ''}`}
        onClick={() => setactiveTab('mindfulness')}
      >
        Mindfulness
      </button>
    </div>
  )
}

CustomTabs.propTypes = {
  activeTab: PropTypes.string,
  setactiveTab: PropTypes.func,
}

export default CustomTabs
