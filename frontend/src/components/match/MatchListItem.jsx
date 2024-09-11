import { Link } from 'react-router-dom'

const MatchListItem = ({ match }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return (
    <li className='py-5'>
      <Link to={`/matches/${match.id}`}>
        <article className='flex flex-col space-y-2 xl:space-y-0'>
          <dl>
            <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
              <time>{formatDate(match.date)}</time>
            </dd>
          </dl>
          <div className='space-y-3 '>
            <div>
              <h2 className='text-2xl font-bold leading-8 tracking-wide hover:underline'>
                <p>
                  <span className='font-semibold'>
                    {match.teams[0].school.name}
                  </span>
                  {match.teams[0].winner ? (
                    <span className='text-sm text-success truncate'> (W) </span>
                  ) : (
                    <span className='text-sm text-warning truncate'> (L) </span>
                  )}
                  vs{' '}
                  <span className='font-semibold'>
                    {match.teams[1].school.name}
                  </span>
                  {match.teams[1].winner ? (
                    <span className='text-sm text-success truncate'> (W) </span>
                  ) : (
                    <span className='text-sm text-error truncate'> (L) </span>
                  )}
                </p>
              </h2>
            </div>
            <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
              Score: {match.teams[0].score} - {match.teams[1].score}
            </div>
          </div>
        </article>
      </Link>
    </li>
  )
}

export default MatchListItem
