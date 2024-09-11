import axios from 'axios'

export const getYears = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/matches/years/`,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
