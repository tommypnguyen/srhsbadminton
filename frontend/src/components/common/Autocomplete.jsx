import CreatableSelect from 'react-select/creatable'

const Autocomplete = ({ possibleValues, setInputValue }) => {
  const handleSuggestionClick = (value) => {
    setInputValue(value.value)
  }

  return (
    <div>
      <CreatableSelect
        onChange={handleSuggestionClick}
        options={possibleValues}
      />
    </div>
  )
}

export default Autocomplete
