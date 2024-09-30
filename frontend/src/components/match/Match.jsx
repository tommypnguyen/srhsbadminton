import Game from './game/Game'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Error from '../layout/Error'
import AddGameForm from './game/AddGameForm'
import { deleteMatch } from '../../slices/matchSlice'
import EditMatchForm from './EditMatchForm'
import AuthContext from '../../contexts/AuthContext'
import Select from '../layout/Select'

const Match = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, authTokens } = useContext(AuthContext)
  const { id } = useParams()
  const [match, setMatch] = useState({})
  const [games, setGames] = useState([])
  const [category, setCategory] = useState('MS')
  const [filteredGames, setFilteredGames] = useState([])
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  const categories = [
    {
      value: "Men's Singles",
      content: 'MS',
    },
    {
      value: "Women's Singles",
      content: 'WS',
    },
    {
      value: "Men's Doubles",
      content: 'MD',
    },
    {
      value: "Women's Doubles",
      content: 'WD',
    },
    {
      value: 'Mixed Doubles',
      content: 'MX',
    },
  ]

  const compareGames = (a, b) => {
    if (a.rank > b.rank) {
      return -1
    }
    if (a.rank < b.rank) {
      return 1
    }
    return 0
  }

  const filterGames = (category) => {
    const categoryGames = games.filter((game) => game.discipline === category)
    categoryGames.sort(compareGames)
    setFilteredGames(categoryGames)
  }

  const onCategoryChange = (e) => {
    setCategory(e.target.value)
    filterGames(e.target.value)
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/matches/${id}/`)
      .then((response) => {
        setMatch(response.data)
        setGames(response.data.games.sort(compareGames))
        setFilteredGames(response.data.games.sort(compareGames))
      })
      .catch((error) => {
        console.error(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (Object.keys(match).length === 0) {
    return <div>Loading...</div>
  }

  const onDeleteClick = async () => {
    if (confirm(`Are you sure you want to delete this match?`) === true) {
      dispatch(
        deleteMatch({
          id,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        }),
      )
      navigate('/matches/')
    }
  }

  return (
    <div className='p-4'>
      <div className='text-md'>
        <dl>
          <dt className='sr-only'>Date</dt>
        </dl>
        <dd className=' text-slate-700'>
          <time>{formatDate(match.date)}</time>
        </dd>
      </div>
      <h1 className='text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl pt-5'>
        {match.teams[0].school.name} vs. {match.teams[1].school.name}
      </h1>
      <p className='text-md font-medium text-slate-600'>
        Score: {match.teams[0].score} - {match.teams[1].score}{' '}
      </p>
      {user && (
        <div
          className='btn bg-green-400 btn-sm mt-2'
          onClick={() => document.getElementById('my_modal').showModal()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
          >
            <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z' />
            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' />
          </svg>
          Add Game
        </div>
      )}
      {user && (
        <div
          className='btn btn-primary btn-sm mt-2 ml-2'
          onClick={() =>
            document.getElementById('edit_match_modal').showModal()
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
          >
            <path d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z' />
          </svg>
          Edit Match
        </div>
      )}
      {user && (
        <div
          className='btn btn-error btn-sm mt-2 md:ml-2'
          onClick={onDeleteClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
          >
            <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
            <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
          </svg>
          Delete Match
        </div>
      )}
      <dialog id='edit_match_modal' className='modal'>
        <div className='modal-box'>
          <EditMatchForm match={match} />
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
      <dialog id='my_modal' className='modal'>
        <div className='modal-box'>
          <AddGameForm
            matchId={id}
            santaRosaId={match.teams[0].school.id}
            opponentId={match.teams[1].school.id}
          />
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
      {match.scoresheet && (
        <div>
          <div className='divider divider-neutral'></div>
          <img src={match.scoresheet.url} alt='Scoresheet' />
        </div>
      )}

      <div className='divider divider-neutral'></div>
      {match.games.length !== 0 && (
        <div className='flex pb-4'>
          <Select
            htmlFor={'category'}
            onChange={onCategoryChange}
            description={'Filter by category'}
            value={category}
            options={categories}
          />
          {/* <span className='flex flex-row justify-end font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              className='fill-accent/75'
              viewBox='0 0 20 20'
            >
              <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
            </svg>
            SRHS Players
          </span> */}
        </div>
      )}
      {filteredGames.length === 0 && (
        <Error message={"Couldn't find any games!"} statusCode={404} />
      )}

      {filteredGames.map((game) => (
        <Game key={game.id} game={game} editMatch={user} />
      ))}
    </div>
  )
}

export default Match
