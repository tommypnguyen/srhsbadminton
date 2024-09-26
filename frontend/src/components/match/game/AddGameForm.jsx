import { useContext, useEffect, useState } from 'react'
import { addGame } from '../../../services/game'
import Autocomplete from '../../common/Autocomplete'
import AuthContext from '../../../contexts/AuthContext'
import { getPlayersByFilter } from '../../../services/player'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddGameForm = ({ matchId, santaRosaId, opponentId }) => {
  const { authTokens } = useContext(AuthContext)
  const [discipline, setDiscipline] = useState("Men's Singles")
  const [rank, setRank] = useState(1)
  const [homePlayers, setHomePlayers] = useState({
    firstPlayer: '',
    secondPlayer: '',
  })
  const [awayPlayers, setAwayPlayers] = useState({
    firstPlayer: '',
    secondPlayer: '',
  })
  const [srhsWin, setSrhsWin] = useState(true)
  const [firstSet, setFirstSet] = useState({ homeScore: '0', awayScore: '0' })
  const [secondSet, setSecondSet] = useState({ homeScore: '0', awayScore: '0' })
  const [thirdSet, setThirdSet] = useState({ homeScore: '0', awayScore: '0' })
  const [showThirdSet, setShowThirdSet] = useState(false)
  const [possibleHomePlayers, setPossibleHomePlayers] = useState([])
  const [possibleAwayPlayers, setPossibleAwayPlayers] = useState([])

  const doubles = ["Men's Doubles", "Women's Doubles", 'Mixed Doubles']
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onCloseModal = () => {
    setDiscipline("Men's Singles")
    setRank(1)
    setHomePlayers({
      firstPlayer: '',
      secondPlayer: '',
    })
    setAwayPlayers({
      firstPlayer: '',
      secondPlayer: '',
    })
    setSrhsWin(true)
    setFirstSet({ homeScore: '0', awayScore: '0' })
    setSecondSet({ homeScore: '0', awayScore: '0' })
    setThirdSet({ homeScore: '0', awayScore: '0' })
    setShowThirdSet(false)
  }
  const onSubmit = async () => {
    if (addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending')
        if (
          homePlayers.firstPlayer.length === 0 ||
          awayPlayers.firstPlayer.length === 0
        ) {
          console.log('Missing player names')
          return false
        }
        let homeResult = {
          first_set: parseInt(firstSet.homeScore),
          second_set: parseInt(secondSet.homeScore),
          player_one: { name: homePlayers.firstPlayer, school_id: santaRosaId },
          winner: srhsWin,
        }
        let awayResult = {
          first_set: parseInt(firstSet.awayScore),
          second_set: parseInt(secondSet.awayScore),
          player_one: { name: awayPlayers.firstPlayer, school_id: opponentId },
          winner: !srhsWin,
        }
        if (doubles.includes(discipline)) {
          if (
            homePlayers.secondPlayer.length !== 0 &&
            awayPlayers.secondPlayer.length !== 0
          ) {
            homeResult.player_two = {
              name: homePlayers.secondPlayer,
              school_id: santaRosaId,
            }
            awayResult.player_two = {
              name: awayPlayers.secondPlayer,
              school_id: opponentId,
            }
          } else {
            console.log('Missing second player naems')
            return false
          }
        }

        if (showThirdSet) {
          homeResult.third_set = parseInt(thirdSet.homeScore)
          awayResult.third_set = parseInt(thirdSet.awayScore)
        }

        const game = {
          discipline,
          rank,
          results: [homeResult, awayResult],
          match_id: matchId,
        }
        console.log(game)
        setDiscipline("Men's Singles")
        setRank(1)
        setHomePlayers({
          firstPlayer: '',
          secondPlayer: '',
        })
        setAwayPlayers({
          firstPlayer: '',
          secondPlayer: '',
        })
        setSrhsWin(false)
        setFirstSet({ homeScore: '0', awayScore: '0' })
        setSecondSet({ homeScore: '0', awayScore: '0' })
        setThirdSet({ homeScore: '0', awayScore: '0' })
        setShowThirdSet(false)
        await addGame(game, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        })
        // navigate(0)
      } catch (err) {
        toast.error(
          'Failed to add game. Please make sure you are logged in or all fields are filled.',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          },
        )
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  useEffect(() => {
    const getAsyncPlayers = async () => {
      const players = await getPlayersByFilter(santaRosaId)
      const playerNames = players.map((player) => player.name)
      setPossibleHomePlayers(playerNames)
    }
    getAsyncPlayers()
  }, [santaRosaId])

  useEffect(() => {
    const getAsyncPlayers = async () => {
      const players = await getPlayersByFilter(opponentId)
      const playerNames = players.map((player) => player.name)
      setPossibleAwayPlayers(playerNames)
    }
    getAsyncPlayers()
  }, [opponentId])

  return (
    <form className='w-full max-w-lg'>
      <div className='flex flex-wrap -mx-3 mb-2'>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-state'
          >
            Discipline
          </label>
          <div className='relative'>
            <select
              className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-state'
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
            >
              <option value="Men's Singles">Boy&apos;s singles</option>
              <option value="Men's Doubles">Boy&apos;s doubles</option>
              <option value="Women's Singles">Girl&apos;s singles</option>
              <option value="Women's Doubles">Girl&apos;s doubles</option>
              <option value='Mixed Doubles'>Mixed Doubles</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-state'
          >
            Rank
          </label>
          <div className='relative'>
            <select
              className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-state'
              value={rank}
              onChange={(e) => setRank(e.target.value)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className='mb-2 divider divider-start'>Players</div>

      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-first-name'
          >
            SRHS Player
          </label>
          <Autocomplete
            possibleValues={possibleHomePlayers}
            inputValue={homePlayers.firstPlayer}
            setInputValue={(value) =>
              setHomePlayers({ ...homePlayers, firstPlayer: value })
            }
          />
          {doubles.includes(discipline) && (
            <>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-first-name'
              >
                SRHS Player 2
              </label>

              <Autocomplete
                possibleValues={possibleHomePlayers}
                inputValue={homePlayers.secondPlayer}
                setInputValue={(value) =>
                  setHomePlayers({ ...homePlayers, secondPlayer: value })
                }
              />
            </>
          )}
        </div>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-first-name'
          >
            Opponent
          </label>
          <Autocomplete
            possibleValues={possibleAwayPlayers}
            inputValue={awayPlayers.firstPlayer}
            setInputValue={(value) =>
              setAwayPlayers({ ...awayPlayers, firstPlayer: value })
            }
          />
          {doubles.includes(discipline) && (
            <>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-first-name'
              >
                Opponent 2
              </label>
              <Autocomplete
                possibleValues={possibleAwayPlayers}
                inputValue={awayPlayers.secondPlayer}
                setInputValue={(value) =>
                  setAwayPlayers({ ...awayPlayers, secondPlayer: value })
                }
              />
            </>
          )}
        </div>
      </div>

      <div className='divider divider-start'>Scores</div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-password'
          >
            SRHS 1st set
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='number'
            value={firstSet.homeScore}
            onChange={(e) =>
              setFirstSet({
                ...firstSet,
                homeScore: e.target.value,
              })
            }
          />
        </div>
        <div className='w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-password'
          >
            Opponent 1st set
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='number'
            value={firstSet.awayScore}
            onChange={(e) =>
              setFirstSet({
                ...firstSet,
                awayScore: e.target.value,
              })
            }
          />
        </div>
        <div className='w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-password'
          >
            2nd set
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='number'
            value={secondSet.homeScore}
            onChange={(e) =>
              setSecondSet({
                ...secondSet,
                homeScore: e.target.value,
              })
            }
          />
        </div>
        <div className='w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-password'
          >
            2nd set
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='number'
            value={secondSet.awayScore}
            onChange={(e) =>
              setSecondSet({
                ...secondSet,
                awayScore: e.target.value,
              })
            }
          />
        </div>
        {showThirdSet ? (
          <>
            <div className='w-1/2 px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-password'
              >
                3rd set
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-password'
                type='number'
                value={thirdSet.homeScore}
                onChange={(e) =>
                  setThirdSet({
                    ...thirdSet,
                    homeScore: e.target.value,
                  })
                }
              />
            </div>
            <div className='w-1/2 px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-password'
              >
                3rd set
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-password'
                type='number'
                value={thirdSet.awayScore}
                onChange={(e) =>
                  setThirdSet({
                    ...thirdSet,
                    awayScore: e.target.value,
                  })
                }
              />
            </div>
            <div className='w-full px-3'>
              <button
                className='btn btn-sm items-center bg-red-400'
                onClick={() => setShowThirdSet(false)}
              >
                Remove third set
              </button>
            </div>
          </>
        ) : (
          <div className='w-full px-3'>
            <button
              className='btn btn-sm items-center bg-green-300'
              onClick={() => setShowThirdSet(true)}
            >
              Add third set
            </button>
          </div>
        )}
      </div>
      <div className='mb-2 divider divider-start'>Winner</div>
      <fieldset className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-1/3 px-3'>
          <input
            id='santa-rosa-win'
            name='winner'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
            checked={srhsWin}
            onChange={() => setSrhsWin(true)}
          />
          <label
            htmlFor='santa-rosa-win'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            SRHS
          </label>
        </div>
        <div className='w-1/3 px-3'>
          <input
            id='opponent-win'
            name='winner'
            type='radio'
            checked={!srhsWin}
            onChange={() => setSrhsWin(false)}
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
          />
          <label
            htmlFor='opponent-win'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Opponent
          </label>
        </div>
      </fieldset>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          formMethod='dialog'
          onClick={onCloseModal}
          className='text-md font-semibold leading-6 text-gray-900'
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className='rounded-md bg-accent/95 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/95'
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </form>
  )
}

export default AddGameForm
