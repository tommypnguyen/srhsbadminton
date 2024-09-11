const Record = ({ totalMatches, wins, losses }) => {
  const calculatePercentage = () => {
    const percentage = (wins / totalMatches) * 100

    return percentage.toFixed(0)
  }

  return (
    <div>
      <div className='flex space-x-24'>
        <span className='font-semibold tracking-wide'>Win-Loss </span>
        <span className='font-semibold tracking-wide'>
          {wins}-{losses} ({totalMatches})
        </span>
      </div>
      <progress
        className='progress w-56 progress-success'
        value={calculatePercentage()}
        max='100'
      ></progress>
    </div>
  )
}

export default Record
