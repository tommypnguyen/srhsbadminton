import ResultRow from './ResultRow'

const Result = ({ results }) => {
  return (
    <table className='table table-zebra w-2/3'>
      <thead className='text-sm uppercase'>
        <tr>
          <th scope='col' className='px-4 py-2'>
            Players
          </th>

          <th scope='col' className='px-4 py-2'>
            1st Set
          </th>
          <th scope='col' className='px-4 py-2'>
            2nd Set
          </th>
          <th scope='col' className='px-4 py-2'>
            3rd Set
          </th>
        </tr>
      </thead>
      {results.map((result) => (
        <ResultRow key={result.player_one.id} result={result} />
      ))}
    </table>
  )
}

export default Result
