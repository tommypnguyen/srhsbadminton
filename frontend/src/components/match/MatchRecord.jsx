const MatchRecord = ({ totalMatches, wins, losses }) => {
  return (
    <div className='stats shadow'>
      <div className='stat'>
        <div className='stat-title'>Total Matches</div>
        <div className='stat-value text-primary'>{totalMatches}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Wins</div>
        <div className='stat-value text-secondary'>{wins}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Losses</div>
        <div className='stat-value'>{losses}</div>
      </div>
    </div>
  )
}

export default MatchRecord
