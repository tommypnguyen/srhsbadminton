const Select = ({
  htmlFor,
  description,
  options,
  onChange,
  value,
  showDefault = true,
  required = false,
}) => {
  return (
    <span>
      <select
        id={htmlFor}
        className='select w-full max-w-xs  border border-gray-300'
        value={value}
        onChange={onChange}
        required={required}
      >
        {showDefault && <option value={''}>{description}</option>}
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.content}
            </option>
          )
        })}
      </select>
    </span>
  )
}

export default Select
