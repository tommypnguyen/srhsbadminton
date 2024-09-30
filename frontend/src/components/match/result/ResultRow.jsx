import { Link } from 'react-router-dom'

const ResultRow = ({ result }) => {
  const players =
    'player_two' in result ? (
      <span>
        <Link
          className='link link-hover hover:text-primary'
          to={`/players/${result.player_one.id}`}
        >
          {result.player_one.name}{' '}
          <div className='font-light ml-1'>
            ({result.player_one.school.abbreviation})
          </div>
        </Link>{' '}
        <br />{' '}
        <Link
          className='link link-hover  hover:text-primary'
          to={`/players/${result.player_two.id}`}
        >
          {result.player_two.name}{' '}
          <div className='font-light'>
            ({result.player_two.school.abbreviation})
          </div>
        </Link>
      </span>
    ) : (
      <span className='link link-hover  hover:text-primary'>
        {' '}
        <Link to={`/players/${result.player_one.id}`}>
          {result.player_one.name}
          <div className='font-light'>
            ({result.player_one.school.abbreviation})
          </div>
        </Link>
      </span>
    )
  return (
    <tbody
      className={`font-semibold ${result.winner && result.player_one.school.name === 'Santa Rosa High School' && 'bg-green-200'}`}
    >
      <tr>
        <th>{players}</th>
        <td>{result.first_set}</td>
        <td>{result.second_set}</td>
        <td>{'third_set' in result ? result.third_set : ''}</td>
      </tr>
    </tbody>
  )
}

export default ResultRow
