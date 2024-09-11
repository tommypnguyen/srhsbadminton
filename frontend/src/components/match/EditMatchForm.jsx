import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { updateMatch } from '../../slices/matchSlice'
import OpponentSelect from './common/OpponentSelect'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { selectSchoolByName } from '../../slices/schoolSlice'
import { uploadImage } from '../../services/image'
import UploadImage from '../common/UploadImage'

const EditMatchForm = ({ match }) => {
  const dispatch = useDispatch()
  const home = match.teams[0].school.name === 'Santa Rosa High School' ? 0 : 1
  const away = home === 0 ? 1 : 0
  const [opponent, setOpponent] = useState(match.teams[away].school.id)
  const [homeWin, setHomeWin] = useState(match.teams[0].winner)
  const [date, setDate] = useState(new Date(match.date))
  const [score, setScore] = useState({
    home: match.teams[home].score,
    away: match.teams[away].score,
  })
  const [scoresheet, setScoresheet] = useState(
    match.scoresheet ? match.scoresheet : null,
  )
  const [editRequestStatus, setEditRequestStatus] = useState('idle')
  const navigate = useNavigate()
  const srhs = useSelector((state) =>
    selectSchoolByName(state, 'Santa Rosa High School'),
  )
  const canSave = [opponent].every(Boolean) && editRequestStatus === 'idle'

  const onSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setEditRequestStatus('pending')
        let scoresheetPayload
        if (scoresheet) {
          const image = await uploadImage(
            scoresheet,
            `${match.teams[home].school.abbreviation}_vs_opponent_id_${opponent}_${date.toLocaleDateString('en-CA')}_scoresheet`,
          )
          scoresheetPayload = {
            url: image.data.link,
            title: image.data.title,
            category: 'post',
          }
        }
        const updatedMatch = {
          date: date.toLocaleDateString('en-CA'),
          teams: [
            {
              school_id: srhs.id,
              winner: homeWin,
              score: score.home,
            },
            {
              school_id: parseInt(opponent),
              winner: !homeWin,
              score: score.away,
            },
          ],
        }
        if (scoresheetPayload) {
          updatedMatch['scoresheet'] = scoresheetPayload
        }
        await dispatch(
          updateMatch({ updatedMatch, matchId: match.id }),
        ).unwrap()
        navigate('/matches')
      } catch (err) {
        console.error('Failed to add the match: ', err)
      } finally {
        setEditRequestStatus('idle')
      }
    }
  }

  return (
    <form className='p-4'>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Match
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Add details about the Match here
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='col-span-full'>
              <label
                htmlFor='opponent'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Opponent
              </label>

              <div className='mt-2'>
                <OpponentSelect
                  htmlFor={'opponent'}
                  value={opponent}
                  description={'Select opponent'}
                  onChange={(e) => setOpponent(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='date'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Date
              </label>
              <div className='mt-2 flex items-center gap-x-3'>
                <DatePicker
                  id='date'
                  showIcon
                  className='border'
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </div>
            </div>

            <div className='col-span-full'>
              <fieldset>
                <legend className='text-sm font-semibold leading-6 text-gray-900'>
                  Winner
                </legend>
                <div className='mt-6 space-y-6'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='santa-rosa-win'
                      name='winner'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      onChange={() => setHomeWin(true)}
                      checked={homeWin}
                    />
                    <label
                      htmlFor='santa-rosa-win'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Santa Rosa
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='opponent-win'
                      name='winner'
                      type='radio'
                      onChange={() => setHomeWin(false)}
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      checked={!homeWin}
                    />
                    <label
                      htmlFor='opponent-win'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Opponent
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className='sm:col-span-4'>
              <label
                htmlFor='santa-rosa-score'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                SRHS Score
              </label>
              <div className='mt-2'>
                <input
                  id='santa-rosa-score'
                  name='santa-rosa-score'
                  className='block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  value={score.home}
                  onChange={(e) => setScore({ ...score, home: e.target.value })}
                />
              </div>
              <label
                htmlFor='opponent-score'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Opponent Score
              </label>
              <div className='mt-2'>
                <input
                  id='opponent-score'
                  name='opponent-score'
                  value={score.away}
                  onChange={(e) => setScore({ ...score, away: e.target.value })}
                  className='block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='col-span-full'>
              <UploadImage
                label={'Scoresheet'}
                image={scoresheet}
                setImage={setScoresheet}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          className='text-md font-semibold leading-6 text-gray-900'
        >
          Go Back
        </button>
        <button
          type='button'
          onClick={onSubmit}
          className='rounded-md bg-accent/95 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/95'
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default EditMatchForm
