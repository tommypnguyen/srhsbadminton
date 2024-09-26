import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../../../contexts/AuthContext'
import Result from '../result/Results'
import EditGameForm from './EditGameForm'
import { deleteGame } from '../../../services/game'

const Game = ({ game }) => {
  const navigate = useNavigate()
  const { user, authTokens } = useContext(AuthContext)
  const onDeleteClick = async () => {
    const id = game.id
    if (confirm('Are you sure you want to delete this game?') === true) {
      await deleteGame(id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      })
      navigate(0)
    }
  }
  return (
    <div className='flex flex-col py-2'>
      <p className='text-md font-semibold'>
        {game.discipline} {game.rank}
      </p>
      {user && (
        <>
          <div className='flex justify-end mt-2'>
            <div
              className='btn btn-accent btn-sm'
              onClick={() =>
                document.getElementById(`edit_game_modal${game.id}`).showModal()
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
              Edit Game
            </div>
            <div className='btn btn-error btn-sm ml-2' onClick={onDeleteClick}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 16 16'
              >
                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
                <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
              </svg>
              Delete Game
            </div>
          </div>
          <dialog id={`edit_game_modal${game.id}`} className='modal'>
            <div className='modal-box'>
              <EditGameForm game={game} />
            </div>
            <form method='dialog' className='modal-backdrop'>
              <button>close</button>
            </form>
          </dialog>
        </>
      )}

      <div className='relative overflow-x-auto'>
        <Result results={game.results} />
      </div>
    </div>
  )
}

export default Game
