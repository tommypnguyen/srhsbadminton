import axios from 'axios'

export const getPlayersByFilter = async (id, name = '') => {
  try {
    const res = await axios.get(
      `http://localhost:8000/players/?school=${id}&name=${name}`,
    )
    return res.data.results
  } catch (err) {
    console.log(err)
  }
}
