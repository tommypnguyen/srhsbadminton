import { Link } from 'react-router-dom'
const MatchCardItem = ({ match }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return (
    <div className='card bg-accent/90  text-primary-content shadow-md'>
      <div className='card-body'>
        <p className='text-neutral font-light text-sm'>
          {formatDate(match.date)}
        </p>
        <p className='card-title text-neutral'>
          {match.teams[0].school.abbreviation}
          {match.teams[0].winner ? (
            <span className='text-sm text-success'> (W) </span>
          ) : (
            <span className='text-sm text-red-700'> (L) </span>
          )}
          vs <span>{match.teams[1].school.abbreviation}</span>
          {match.teams[1].winner ? (
            <span className='text-sm text-success'> (W) </span>
          ) : (
            <span className='text-sm text-red-700'> (L) </span>
          )}
        </p>
        <p>
          Score: {match.teams[0].score} - {match.teams[1].score}{' '}
        </p>

        <div className='card-actions justify-start'>
          <Link to={`/matches/${match.id}`}>
            <button className='btn btn-sm'>View Match</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MatchCardItem
