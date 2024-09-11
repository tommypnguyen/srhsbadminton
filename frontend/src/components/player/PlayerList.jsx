import { useEffect, useState } from 'react'

import { getPlayersByFilter } from '../../services/player'
import PlayerRowItem from './PlayerRowItem'

const PlayerList = () => {
  const [sortedPlayers, setSortedPlayers] = useState({
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  })
  const [playerSearch, setPlayerSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAsyncPlayers = async () => {
      setIsLoading(true)
      const data = await getPlayersByFilter(1, playerSearch)
      let newSortedPlayers = {
        a: [],
        b: [],
        c: [],
        d: [],
        e: [],
        f: [],
        g: [],
        h: [],
        i: [],
        j: [],
        k: [],
        l: [],
        m: [],
        n: [],
        o: [],
        p: [],
        q: [],
        r: [],
        s: [],
        t: [],
        u: [],
        v: [],
        w: [],
        x: [],
        y: [],
        z: [],
      }
      data.forEach((player) => {
        newSortedPlayers[player.name[0].toLowerCase()].push(player)
      })
      setSortedPlayers(newSortedPlayers)
      setIsLoading(false)
    }
    getAsyncPlayers()
  }, [playerSearch])

  const handleInputChange = (event) => {
    const value = event.target.value
    setPlayerSearch(value)
  }

  return (
    <div className='p-4 overflow-x-auto'>
      <article className='relative pt-10'>
        <div className='flex flex-row'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 fill-black'
            viewBox='0 0 16 16'
          >
            <path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4' />
          </svg>
          <h1 className='pl-2 text-2xl font-semibold tracking-tight text-secondary md:text-3xl'>
            Players
          </h1>
        </div>

        <div className='divider'></div>

        <input
          type='text'
          className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          value={playerSearch}
          onChange={handleInputChange}
          placeholder={'Search for a player'}
          aria-autocomplete='list'
          aria-controls='autocomplete-list'
        />
        {isLoading ? (
          <span className='loading loading-spinner text-secondary'></span>
        ) : (
          <table className='table table-pin-rows'>
            {Object.entries(sortedPlayers).map(
              ([key, value]) =>
                value.length > 0 && (
                  <>
                    <thead key={key}>
                      <tr>
                        <th>{key.toUpperCase()}</th>
                      </tr>
                    </thead>
                    {value.map((player) => (
                      <PlayerRowItem player={player} key={player.id} />
                    ))}
                  </>
                ),
            )}
          </table>
        )}
      </article>
    </div>
  )
}

export default PlayerList
