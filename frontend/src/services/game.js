import axios from 'axios'

export const addGame = async (newGame, headers) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/games/`,
      newGame,
      headers,
    )
    if (res.status !== 201) {
      throw Error('Unable to add game')
    }
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const editGame = async (gameId, editedGame, headers) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/games/${gameId}/`,
      editedGame,
      headers,
    )
    if (res.status !== 200) {
      throw Error('Unable to edit game')
    }
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const deleteGame = async (gameId, headers) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/games/${gameId}/`,
      headers,
    )
    if (res.status !== 200) {
      throw Error('Unable to delete game')
    }
    return res.data
  } catch (err) {
    console.log(err)
  }
}
