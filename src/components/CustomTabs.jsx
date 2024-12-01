import PropTypes from 'prop-types'

function CustomTabs({ activeTab, setactiveTab }) {
  return (
    <div className='grid grid-cols-3 border-b dark:border-blue-500'>
      <button
        className={`py-2 col-span-1  dark:border-blue-900 text-center ${activeTab === 'journal' ? 'border-t-4' : ''}`}
        onClick={() => setactiveTab('journal')}
      >
        Journal
      </button>
      <button
        className={`py-2 col-span-1  dark:border-blue-900 text-center ${activeTab === 'mindfulness' ? 'border-t-4' : ''}`}
        onClick={() => setactiveTab('mindfulness')}
      >
        Mindfulness
      </button>
      <button
        className={`py-2 col-span-1  dark:border-blue-900 text-center ${activeTab === 'calorie-tracker' ? 'border-t-4' : ''}`}
        onClick={() => setactiveTab('calorie-tracker')}
      >
        Calorie Tracker
      </button>
    </div>
  )
}

CustomTabs.propTypes = {
  activeTab: PropTypes.string,
  setactiveTab: PropTypes.func,
}

export default CustomTabs
