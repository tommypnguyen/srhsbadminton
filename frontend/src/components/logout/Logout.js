import { useContext, useEffect } from 'react'
import AuthContext from '../../contexts/AuthContext'

const Logout = () => {
  const { logoutUser } = useContext(AuthContext)

  useEffect(() => {
    logoutUser()
  })
  return <div>Logged out</div>
}

export default Logout
