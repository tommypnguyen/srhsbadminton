import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllSchools, fetchSchools } from '../../../slices/schoolSlice'
import Error from '../../layout/Error'

const OpponentSelect = ({
  value,
  onChange,
  htmlFor,
  description,
  disabled = false,
}) => {
  const dispatch = useDispatch()
  const schools = useSelector(selectAllSchools)
  const schoolStatus = useSelector((state) => state.school.status)
  const error = useSelector((state) => state.school.error)

  useEffect(() => {
    if (schoolStatus === 'idle') {
      dispatch(fetchSchools())
    }
  }, [dispatch, schoolStatus])

  let content

  if (schoolStatus === 'loading') {
    content = <div className='skeleton h-32 w-full'></div>
  } else if (schoolStatus === 'succeeded') {
    let schoolsWithoutSantaRosa = schools.filter(
      (school) => school.name !== 'Santa Rosa High School',
    )
    let filteredSchools = schoolsWithoutSantaRosa.map((school) => ({
      content: school.name,
      value: school.id,
    }))
    content = (
      <select
        id={htmlFor}
        className='select w-full max-w-xs  border border-gray-300 invalid:border-pink-500'
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value={''}>{description}</option>
        {filteredSchools.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.content}
            </option>
          )
        })}
      </select>
    )
  } else if (schoolStatus === 'failed') {
    content = <Error message={error} />
  }

  return <>{content}</>
}

export default OpponentSelect
