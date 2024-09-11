import { Link } from 'react-router-dom'

const ResultRow = ({ result }) => {
  const players =
    'player_two' in result ? (
      <span>
        <Link
          className='link link-hover hover:text-primary'
          to={`/players/${result.player_one.id}`}
        >
          {result.player_one.name}
        </Link>{' '}
        <br />{' '}
        <Link
          className='link link-hover  hover:text-primary'
          to={`/players/${result.player_two.id}`}
        >
          {result.player_two.name}
        </Link>
      </span>
    ) : (
      <span className='link link-hover  hover:text-primary'>
        {' '}
        <Link to={`/players/${result.player_one.id}`}>
          {result.player_one.name}
        </Link>
      </span>
    )
  return (
    <tbody className='font-semibold'>
      <tr>
        <th
          className={
            result.player_one.school === 'Santa Rosa High School'
              ? 'text-accent/75'
              : ''
          }
        >
          {players}
          {result.winner ? (
            <span className='text-sm text-success truncate'> (W) </span>
          ) : (
            <span className='text-sm text-error/75 truncate'> (L) </span>
          )}
        </th>
        <td>{result.first_set}</td>
        <td>{result.second_set}</td>
        <td>{'third_set' in result ? result.third_set : ''}</td>
      </tr>
    </tbody>
  )
}

export default ResultRow
