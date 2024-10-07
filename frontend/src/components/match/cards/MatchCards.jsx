import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllMatches, fetchMatches } from '../../../slices/matchSlice'
import MatchCardItem from './MatchCardItem'

const MatchCards = () => {
  const dispatch = useDispatch()
  const matches = useSelector(selectAllMatches)
  const matchStatus = useSelector((state) => state.match.status)

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches())
    }
  }, [matchStatus, dispatch])

  let content

  if (matchStatus === 'loading') {
    content = <div className='skeleton h-32 w-full bg-accent/95'></div>
  } else if (matchStatus === 'succeeded') {
    content = matches.map((match) => (
      <swiper-slide key={match.id}>
        <MatchCardItem match={match} />
      </swiper-slide>
    ))
  } else if (matchStatus === 'failed') {
    content = <div>Unable to load matches, please try again...</div>
  }

  return (
    <div>
      <div className='p-4 gap-4'>
        <swiper-container
          pagination='true'
          style={{
            '--swiper-pagination-color': 'white',
          }}
          breakpoints={JSON.stringify({
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },

            920: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          })}
        >
          {content}
        </swiper-container>
      </div>
    </div>
  )
}

export default MatchCards
