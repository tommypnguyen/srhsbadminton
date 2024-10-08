import axios from 'axios'

export const getPlayersByFilter = async (id, name = '') => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/players/?school=${id}&name=${name}`,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const getPlayerYears = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/players/${id}/years`,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
