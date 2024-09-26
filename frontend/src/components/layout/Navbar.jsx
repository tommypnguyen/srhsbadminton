import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const [menuDisplay, setmenuDisplay] = useState(true)
  const [displayMenuStyle, setdisplayMenuStyle] = useState('')

  const showMenu = () => {
    setmenuDisplay(!menuDisplay)
    if (menuDisplay) {
      setdisplayMenuStyle('')
    } else {
      setdisplayMenuStyle('none')
    }
  }

  return (
    <div className='navbar bg-base-100 '>
      <div className='navbar-start'>
        <div className='dropdown' onClick={showMenu}>
          <div tabIndex={0} role='button' className='btn btn-ghost xl:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            style={{ display: displayMenuStyle }}
            className='menu menu-md dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/announcements'>Announcements</Link>
            </li>
            <li>
              <Link to='/matches'>Matches</Link>
            </li>
            <li>
              <Link to='/players'>Players</Link>
            </li>
            <li>
              <Link to='/gallery'>Gallery</Link>
            </li>
            <li>
              {user !== null ? (
                <Link to='/logout'>Logout</Link>
              ) : (
                <Link to='/login'>Admin Login</Link>
              )}
            </li>
          </ul>
        </div>
        <Link to='/' className='btn btn-ghost text-xl hover:bg-base-100'>
          <div className='avatar'>
            <div className='w-16 rounded'>
              <img src='https://i.imgur.com/6AgKdOj.png' />
            </div>
          </div>
          Panther Badminton
        </Link>
      </div>
      <div className='navbar-end hidden xl:flex'>
        <ul className='menu menu-horizontal px-1 text-lg'>
          <li>
            <Link to='/announcements'>Announcements</Link>
          </li>
          <li>
            <Link to='/matches'>Matches</Link>
          </li>
          <li>
            <Link to='/players'>Players</Link>
          </li>
          <li>
            <Link to='/gallery'>Gallery</Link>
          </li>
          <li>
            {user ? (
              <p onClick={logoutUser}>Logout</p>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
