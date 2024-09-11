import MatchListItem from './MatchListItem'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllMatches,
  fetchMatches,
  setMatchStatus,
  setRecordStatus,
} from '../../slices/matchSlice'
import Select from '../layout/Select'
import Error from '../layout/Error'
import MatchRecord from './MatchRecord'
import { Link } from 'react-router-dom'
import { selectRecord, fetchRecord } from '../../slices/matchSlice'
import OpponentSelect from './common/OpponentSelect'
import { getYears } from '../../services/year'
import AuthContext from '../../contexts/AuthContext'
import PaginationFooter from './common/PaginationFooter'

const MatchList = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const matches = useSelector(selectAllMatches)
  const record = useSelector(selectRecord)
  const matchStatus = useSelector((state) => state.match.status)
  const recordStatus = useSelector((state) => state.match.recordStatus)
  const error = useSelector((state) => state.match.error)
  const [years, setYears] = useState([])
  const [year, setYear] = useState('')
  const [opponent, setOpponent] = useState('')

  const onYearChange = (e) => {
    setYear(e.target.value)
    searchParams.set('year', e.target.value)
    setSearchParams(searchParams)
  }

  const onOpponentChange = (e) => {
    setOpponent(e.target.value)
    searchParams.set('opponent', e.target.value)
    setSearchParams(searchParams)
  }

  const onResetFiltersClick = (e) => {
    e.preventDefault()
    setYear('')
    setOpponent('')
    setSearchParams({})
    dispatch(setMatchStatus('idle'))
    dispatch(setRecordStatus('idle'))
  }

  const onFilterClick = (e) => {
    e.preventDefault()
    dispatch(setMatchStatus('idle'))
    dispatch(setRecordStatus('idle'))
  }

  const onPaginationClick = (e) => {
    e.preventDefault()
    dispatch(setMatchStatus('idle'))
  }

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(
        fetchMatches({
          year: searchParams.get('year'),
          opponent: searchParams.get('opponent'),
          page: searchParams.get('page'),
        }),
      )
    }
  }, [matchStatus, dispatch, searchParams])

  useEffect(() => {
    if (recordStatus === 'idle') {
      dispatch(
        fetchRecord({
          year: searchParams.get('year'),
          opponent: searchParams.get('opponent'),
        }),
      )
    }
  }, [recordStatus, dispatch, searchParams])

  useEffect(() => {
    const getAsyncYears = async () => {
      const data = await getYears()
      const formattedYears = data.map((year) => ({
        content: year,
        value: year,
      }))
      setYears(formattedYears)
    }
    getAsyncYears()
  }, [])

  let content

  if (matchStatus === 'loading') {
    content = <div className='skeleton h-32 w-full'></div>
  } else if (matchStatus === 'succeeded') {
    if (matches.results.length === 0) {
      content = (
        <Error
          message={"Couldn't find any related matches!"}
          statusCode={404}
        />
      )
    } else {
      content = matches.results.map((match) => (
        <MatchListItem match={match} key={match.id} />
      ))
    }
  } else if (matchStatus === 'failed') {
    content = <Error message={error} />
  }
  return (
    <>
      <div className='flex flex-col gap-4 p-4'>
        <h1 className='font-bold leading-9 tracking-tight text-5xl sm:leading-10 md:leading-14'>
          Matches
        </h1>
        {isAuthenticated && (
          <div>
            <Link
              className='btn bg-accent/95 btn-sm text-white'
              to='/matches/add'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                className='fill-white'
                viewBox='0 0 16 16'
              >
                <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0' />
              </svg>
              Add Match
            </Link>
          </div>
        )}
        <MatchRecord
          wins={record.wins}
          losses={record.losses}
          totalMatches={record.totalMatches}
        />
        <div className='divider divider-neutral'></div>
        <div className='flex md:flex-row flex-col gap-4 md:items-center'>
          <OpponentSelect
            htmlFor={'opponent'}
            value={opponent}
            description={'Filter by opponent'}
            onChange={onOpponentChange}
          />
          <Select
            htmlFor={'year'}
            onChange={onYearChange}
            description={'Filter by year'}
            value={year}
            options={years}
          />
          <button
            className='btn bg-secondary text-white'
            onClick={onFilterClick}
          >
            Filter Matches
          </button>
          <button className='btn bg-transparent' onClick={onResetFiltersClick}>
            Clear Filter
          </button>
        </div>
        <ul className=' divide-y divide-gray-400 dark:divide-gray-700 p-4'>
          {content}
        </ul>
        <PaginationFooter
          url={'/matches/'}
          previous={matches.previous}
          next={matches.next}
          onClick={onPaginationClick}
        />
      </div>
    </>
  )
}

export default MatchList
