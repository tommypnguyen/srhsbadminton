import { Link, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostListItem from './PostListItem'
import {
  fetchPosts,
  selectAllPosts,
  setPostStatus,
} from '../../slices/postSlice'
import PaginationFooter from '../match/common/PaginationFooter'

const PostList = ({ show }) => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector((state) => state.post.status)
  const error = useSelector((state) => state.post.error)

  const onPaginationClick = (e) => {
    e.preventDefault()
    dispatch(setPostStatus('idle'))
  }

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(
        fetchPosts({
          page: searchParams.get('page'),
        }),
      )
    }
  }, [postStatus, dispatch, searchParams])

  let content

  if (postStatus === 'loading') {
    content = <div className='skeleton h-32 w-full bg-accent/95'></div>
  } else if (postStatus === 'succeeded') {
    content = posts.map((post) => {
      return (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`} key={post.id}>
            <PostListItem
              date={post.date}
              title={post.title}
              summary={post.body}
            />
          </Link>
          <hr />
        </div>
      )
    })
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  if (postStatus === 'succeeded') {
    return (
      <div>
        {content}
        <PaginationFooter
          url={'/announcements/'}
          previous={posts.previous}
          next={posts.next}
          onClick={onPaginationClick}
          show={show}
        />
      </div>
    )
  }

  return content
}

export default PostList
