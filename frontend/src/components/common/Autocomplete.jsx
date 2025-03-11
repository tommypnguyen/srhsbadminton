import CreatableSelect from 'react-select/creatable'

const Autocomplete = ({ possibleValues, setInputValue, inputValue }) => {
  const handleSuggestionClick = (value) => {
    setInputValue(value.value)
  }

  return (
    <div>
      <CreatableSelect
        onChange={handleSuggestionClick}
        defaultInputValue={inputValue}
        options={possibleValues}
      />
    </div>
  )
}

export default Autocomplete
