import Game from './game/Game'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import AddGameForm from './game/AddGameForm'
import { deleteMatch } from '../../slices/matchSlice'
import EditMatchForm from './EditMatchForm'
import AuthContext from '../../contexts/AuthContext'

const Match = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)
  const { id } = useParams()
  const [match, setMatch] = useState({})
  // const [editMatch, setEditMatch] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/matches/${id}/`)
      .then((response) => {
        setMatch(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])
  if (Object.keys(match).length === 0) {
    return <div>No Match</div>
  }

  const onDeleteClick = async () => {
    dispatch(deleteMatch(id))
    navigate('/matches/')
  }

  return (
    <div className='p-4'>
      <div className='text-md'>
        <dl>
          <dt className='sr-only'>Date</dt>
        </dl>
        <dd className=' text-slate-700'>
          <time dateTime='2024-03-19T18:00:00.000Z'>
            Tuesday, March 19, 2024
          </time>
        </dd>
      </div>
      <h1 className='text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl pt-5'>
        {match.teams[0].school.name} vs. {match.teams[1].school.name}
      </h1>
      <p className='text-md font-medium text-slate-600'>
        Score: {match.teams[0].score} - {match.teams[1].score}{' '}
      </p>
      {isAuthenticated && (
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
      {isAuthenticated && (
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
      {isAuthenticated && (
        <div className='btn btn-error btn-sm mt-2 ml-2' onClick={onDeleteClick}>
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
      <div className='divider divider-neutral'></div>
      <span className='flex flex-row justify-end font-medium'>
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
      </span>

      {/* <div>
        <p>Scoresheet</p>
        <img src='https://i.imgur.com/VbvEwAx.png' alt='Scoresheet image' />
      </div> */}
      {match.games.map((game) => (
        <Game key={game.id} game={game} editMatch={isAuthenticated} />
      ))}
    </div>
  )
}

export default Match
