import { Link } from 'react-router-dom'
import { useContext } from 'react'
import PostList from './PostList'
import AuthContext from '../../contexts/AuthContext'

const Posts = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <div className='divide-y divide-gray-200 dark:divide-gray-700 p-4'>
      <div className='space-y-2 pt-6'>
        <h1 className='font-bold leading-9 tracking-tight text-5xl sm:leading-10 md:leading-14'>
          Announcements
        </h1>
        {isAuthenticated && (
          <div className='py-2'>
            <Link
              className='btn bg-accent/95 btn-sm text-white'
              to='/posts/add'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                className='fill-white'
                viewBox='0 0 16 16'
              >
                <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0' />
              </svg>
              Add Post
            </Link>
          </div>
        )}

        <PostList />
      </div>
    </div>
  )
}

export default Posts
