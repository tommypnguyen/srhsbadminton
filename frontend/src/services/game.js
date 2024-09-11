import axios from 'axios'

export const addGame = async (newGame) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/games/`,
      newGame,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const editGame = async (gameId, editedGame) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/games/${gameId}/`,
      editedGame,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
