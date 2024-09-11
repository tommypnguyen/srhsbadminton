import { useState } from 'react'

const Autocomplete = ({ possibleValues, inputValue, setInputValue }) => {
  const [suggestions, setSuggestions] = useState([])

  const handleSuggestionClick = (value) => {
    setInputValue(value)
    setSuggestions([])
  }

  const handleInputChange = (event) => {
    const value = event.target.value
    setInputValue(value)
    if (value.length > 0) {
      const filteredSuggestions = possibleValues.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase()),
      )
      setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : [])
    } else {
      setSuggestions([])
    }
  }

  return (
    <div>
      <input
        type='text'
        className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
        value={inputValue}
        onChange={handleInputChange}
        aria-autocomplete='list'
        aria-controls='autocomplete-list'
      />
      {suggestions.length > 0 && (
        <ul id='autocomplete-list' className='suggestions-list' role='listbox'>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              role='option'
              className='block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:bg-gray-300 bg-gray-100'
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Autocomplete
