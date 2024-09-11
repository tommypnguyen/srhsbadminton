import { Link } from 'react-router-dom'
const PlayerRowItem = ({ player }) => {
  return (
    <tr key={player.id}>
      <td>
        <Link
          to={`/players/${player.id}`}
          className='link link-hover font-semibold underline p-2 text-blue-400 visited:text-purple-600 hover:text-blue-800'
        >
          {player.name}
        </Link>
      </td>
    </tr>
  )
}

export default PlayerRowItem
