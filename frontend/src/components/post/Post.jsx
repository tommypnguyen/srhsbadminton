import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useContext, useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import axios from 'axios'

import { deletePost } from '../../slices/postSlice'
import EditPostForm from './EditPostForm'
import AuthContext from '../../contexts/AuthContext'

const Post = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)

  const { id } = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
      .then((response) => {
        setPost(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  if (Object.keys(post).length === 0) {
    return <div>No post</div>
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const onDeleteClick = async () => {
    dispatch(deletePost(id))
    navigate('/announcements/')
  }

  const date = formatDate(post.date)
  return (
    <div className='p-4 mx-auto'>
      <main>
        {isAuthenticated ?? (
          <div className='flex justify-end'>
            <div
              className='btn btn-primary btn-sm mt-2 mr-2'
              onClick={() =>
                document.getElementById('edit_post_modal').showModal()
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 16 16'
              >
                <path d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z' />
              </svg>
              Edit Post
            </div>
            <div
              className='btn btn-error btn-sm mt-2 mb-2'
              onClick={onDeleteClick}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 16 16'
              >
                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
                <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
              </svg>
              Delete Post
            </div>
          </div>
        )}

        <dialog id='edit_post_modal' className='modal'>
          <div className='modal-box'>
            <EditPostForm post={post} />
          </div>
          <form method='dialog' className='modal-backdrop'>
            <button>close</button>
          </form>
        </dialog>
        <article className='relative pt-10'>
          <h1 className='text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl'>
            {post.title}
          </h1>
          <div className='text-sm leading-6'>
            <dl>
              <dt className='sr-only'>Date</dt>
            </dl>
            <dd className='absolute top-0 inset-x-0 text-slate-700'>
              <time dateTime={post.date}>{date}</time>
            </dd>
          </div>
          <div className='mt-6 prose prose-slate'>
            <Markdown className='mb-5'>{post.body}</Markdown>
            {post.images &&
              post.images.map((s, idx) => (
                <img
                  className='max-h-auto w-full overflow-hidden mt-6'
                  src={s}
                  key={idx}
                />
              ))}
          </div>
        </article>
      </main>
    </div>
  )
}

export default Post
