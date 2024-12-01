import { debounce } from 'lodash'
import { MinusSquare, PlusIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import indb from '../utils/indb'

function CalorieTracker() {
  const [showAddPopup, setshowAddPopup] = useState(false)
  const indb_data = indb
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchDebounced = debounce((value) => {
    handleSearch(value)
  }, 300)
  const onChangeSearch = (value) => {
    setSearchTerm(value)
    handleSearchDebounced(value)
  }
  const [searchResults, setSearchResults] = useState([])
  const [tempTable, setTempTable] = useState([])

  const handleSearch = (searchkey) => {
    if (searchkey === '' || searchkey === null) {
      setSearchResults([])
    }
    setSearchResults(indb_data.map((item) => (item.food_name.includes(searchkey) ? { ...item, match: true } : item)))
  }

  const addToTempTable = (item) => {
    setTempTable((prevTable) => {
      if (prevTable.some((tableItem) => tableItem.food_code === item.food_code)) {
        showToast('Already added!')
        return prevTable
      } // No update if item exists
      return [...prevTable, { ...item }]
    })
    setSearchTerm('')
    setSearchResults([])
  }
  const removeFromTempTable = (item) => {
    setTempTable((prevTable) => prevTable.filter((tableItem) => tableItem !== item))
  }

  const showToast = debounce((message) => {
    toast(message)
  }, 300)

  return (
    <div className='w-full'>
      <span className='flex h-[70vh]'>
        <span></span>
      </span>
      <span className='justify-center flex'>
        {!showAddPopup && (
          <button onClick={() => setshowAddPopup(true)} className='flex p-2 border dark:bg-midnight-700'>
            <PlusIcon /> <span className='mx-2'>Add</span>
          </button>
        )}
      </span>
      {showAddPopup && (
        <span className='absolute top-0  w-full left-0 bg-white dark:bg-black flex h-[78vh]  p-2'>
          <span className='p-2 flex flex-col border dark:border-midnight-500 w-full gap-2'>
            <span className='flex justify-between'>
              <span className='gap-2 flex'>
                <span className='text-green-500'>
                  {parseFloat(tempTable.reduce((total, item) => total + (item.energy_kcal || 0), 0)).toFixed(2)} kcal
                </span>
                /<span className=''>1000 kcal</span>
              </span>
              <span>
                <button className='text-red-500' onClick={() => setshowAddPopup(false)}>
                  <XIcon />
                </button>
              </span>
            </span>
            <span>
              <div className='flex items-center dark:bg-gray-800  p-2'>
                <label htmlFor='searchbox' className='sr-only'>
                  Search Food
                </label>
                <input
                  value={searchTerm}
                  onChange={(e) => onChangeSearch(e.target.value)}
                  type='text'
                  placeholder='search food'
                  className='w-full dark:bg-gray-800 dark:text-white placeholder-gray-400 outline-none border p-2'
                />
              </div>
              {searchResults.length > 0 && (
                <span className='h-40 border overflow-y-scroll scrollbar flex flex-col dark:bg-midnight-800'>
                  {searchResults.map(
                    (item) =>
                      item.match == true && (
                        <button
                          key={item.food_code}
                          onClick={() => addToTempTable(item)}
                          className='flex justify-between p-2 border'
                        >
                          <span className='flex text-wrap'>{item.food_name}</span>
                          <span>{parseFloat(item.energy_kcal).toFixed(2)} kcal</span>
                        </button>
                      )
                  )}
                </span>
              )}
            </span>
            <span className='flex w-full divide-y-2 dark:divide-midnight-400 flex-col h-70 overflow-y-scroll scrollbar'>
              {tempTable &&
                tempTable.map((item) => (
                  <span key={item.food_code} className='flex flex-col gap-2 p-2  w-full'>
                    <span className='flex justify-between'>
                      <span>{item.food_name}</span>
                      <span></span>
                    </span>
                    <span className='flex justify-between'>
                      <span>{parseFloat(item.energy_kcal).toFixed(2)} kcal</span>
                      <span className='flex gap-4'>
                        <button className='text-red-500' onClick={() => removeFromTempTable(item)}>
                          <MinusSquare />
                        </button>
                      </span>
                    </span>
                  </span>
                ))}
            </span>
            <span className='flex justify-center'>
              <button className='border p-2 border-green-500'>Add</button>
            </span>
          </span>
        </span>
      )}
    </div>
  )
}

export default CalorieTracker
