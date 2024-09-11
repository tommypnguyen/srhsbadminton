import axios from 'axios'

export const getYears = async () => {
  try {
    const res = await axios.get('http://localhost:8000/matches/years/')
    return res.data
  } catch (err) {
    console.log(err)
  }
}
