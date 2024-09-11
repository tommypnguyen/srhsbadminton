import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../contexts/AuthContext'

const Logout = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext)
  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/logout/',
        {
          refresh_token: localStorage.getItem('refresh_token'),
        },
        { headers: { 'Content-Type': 'application/json' } },
        { withCredentials: true },
      )
      localStorage.clear()
      setIsAuthenticated(false)
      axios.defaults.headers.common['Authorization'] = null
      navigate('/')
    } catch (e) {
      navigate('/')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      navigate('/login')
    }
    logout()
  })
  return <div>Logged out</div>
}

export default Logout
