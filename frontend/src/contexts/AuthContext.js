import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null,
  )
  let [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwtDecode(localStorage.getItem('authTokens'))
      : null,
  )
  let [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  let loginUser = async (e) => {
    e.preventDefault()
    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/token/`,
      {
        username: e.target.username.value,
        password: e.target.password.value,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    )

    if (response.status === 200) {
      setAuthTokens(response.data)
      setUser(jwtDecode(response.data.access))
      localStorage.setItem('authTokens', JSON.stringify(response.data))
      navigate('/')
    } else {
      alert('Something went wrong!')
    }
  }

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  let updateToken = async () => {
    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/token/refresh/`,
      { refresh: authTokens?.refresh },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.status === 200) {
      setAuthTokens(response.data)
      setUser(jwtDecode(response.data.access))
      localStorage.setItem('authTokens', JSON.stringify(response.data))
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  }

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(() => {
    if (loading) {
      updateToken()
    }

    let fourMinutes = 1000 * 60 * 4

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export default AuthContext
