import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../../contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setIsAuthenticated } = useContext(AuthContext)

  const [error, setError] = useState(false)

  const submit = async (e) => {
    e.preventDefault()

    const user = {
      username,
      password,
    }

    try {
      const { data } = await axios.post('http://localhost:8000/token/', user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      localStorage.clear()
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${data['access']}`
      setError(false)
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      setError(true)
    }
  }
  return (
    <section className='bg-gray-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        {error && (
          <div
            role='alert'
            className='alert alert-error flex items-center mb-6 lg:w-1/4'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 shrink-0 stroke-current'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>Incorrect username or password</span>
          </div>
        )}
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900'
        >
          Panther Badminton
        </a>
        <form className='space-y-4 md:space-y-6' onSubmit={submit}>
          <div>
            <label className='input input-bordered flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
              </svg>
              <input
                placeholder='Enter Username'
                className='grow'
                name='username'
                value={username}
                required
                type='text'
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className='input input-bordered flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
              </svg>
              <input
                placeholder='Enter Password'
                name='password'
                value={password}
                required
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button
              type='submit'
              className='btn btn-primary w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none ont-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
