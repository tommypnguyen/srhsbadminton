import axios from 'axios'

export const addGame = async (newGame) => {
  try {
    const res = await axios.post(`http://localhost:8000/games/`, newGame)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const editGame = async (gameId, editedGame) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/games/${gameId}/`,
      editedGame,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
