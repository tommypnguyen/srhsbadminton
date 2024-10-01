import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Select from '../layout/Select'
import Result from '../match/result/Results'
import Record from '../match/Record'
import { getPlayerYears } from '../../services/player'
const Player = () => {
  const { id } = useParams()
  const [player, setPlayer] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const [year, setYear] = useState('')
  const [years, setYears] = useState([])

  const onYearChange = (e) => {
    setYear(e.target.value)
    searchParams.set('year', e.target.value)
    setSearchParams(searchParams)
  }

  const onResetFiltersClick = (e) => {
    e.preventDefault()
    setYear('')
    setSearchParams({})
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/players/${id}`, {
        params: searchParams,
      })
      .then((response) => {
        setPlayer(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id, searchParams])

  useEffect(() => {
    const getAsyncYears = async () => {
      const data = await getPlayerYears(id)
      const formattedYears = data.map((year) => ({
        content: year,
        value: year,
      }))
      setYears(formattedYears)
    }
    getAsyncYears()
  }, [id])

  if (Object.keys(player).length === 0) {
    return <div>Loading...</div>
  }
  return (
    <div className='p-4 mx-auto'>
      <main>
        <article className='relative pt-10'>
          <div className='mb-4'>
            <div className='p-4 card text-lg text-slate-900 md:text-2xl font-bold flex flex-col md:flex-row justify-between'>
              <div className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 fill-secondary mr-2'
                  viewBox='0 0 16 16'
                >
                  <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
                  <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z' />
                </svg>
                <Link
                  className='link link-accent  text-black no-underline'
                  to={`/player/${player.id}`}
                >
                  {player.name}
                  <div className='ml-2 badge badge-primary badge-sm'>
                    {player.school.name}
                  </div>
                </Link>
              </div>
              <div className='prose prose-slate text-base pt-4'>
                <Record
                  wins={player.wins}
                  losses={player.losses}
                  totalMatches={player.games.length}
                />
              </div>
            </div>
          </div>

          <div className='mt-6 prose prose-slate p-4'>
            <div>
              <h1 className='text-xl font-semibold'>Matches</h1>
            </div>
            <div className='divider'></div>
            <div className='flex md:flex-row flex-col gap-4 mb-4'>
              <Select
                htmlFor={'year'}
                onChange={onYearChange}
                description={'Filter by year'}
                value={year}
                options={years}
              />

              <button className='btn bg-primary' onClick={onResetFiltersClick}>
                Clear Filter
              </button>
            </div>

            {player.games.length !== 0 ? (
              player.games.map((s, idx) => {
                return (
                  <div className='px-4 py-2 text-sm' key={idx}>
                    <p className='text-light font-semi'>
                      <Link
                        className='link font-bold text-secondary hover:text-primary'
                        to={`/matches/${s.match_id}`}
                      >
                        <span>
                          vs. {s.results[1].player_one.school.name} (
                          {formatDate(s.date)})
                        </span>
                      </Link>
                      <span className='flex lg:flex-row mt-1 tracking-wide font-semibold'>
                        {s.discipline} {s.rank}
                      </span>
                    </p>
                    <Result results={s.results} />
                  </div>
                )
              })
            ) : (
              <div>No matches found</div>
            )}
          </div>
        </article>
      </main>
    </div>
  )
}

export default Player
