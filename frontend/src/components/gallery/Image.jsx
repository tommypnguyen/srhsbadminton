import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import { deleteGalleryImage } from '../../services/image'
const Image = ({ image }) => {
  const navigate = useNavigate()
  const { user, authTokens } = useContext(AuthContext)
  const onDeleteClick = async () => {
    const id = image.id
    if (confirm(`Are you sure you want to delete this image?`) === true) {
      await deleteGalleryImage({
        id,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      })
      navigate(0)
    }
  }
  return (
    <>
      {user && (
        <div
          className='btn btn-error btn-sm mt-2 md:ml-2'
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
          Delete Image
        </div>
      )}
      <img
        className='h-auto max-w-full rounded-lg'
        src={image.url}
        alt={image.title ? image.title : 'Gallery image'}
      />
    </>
  )
}

export default Image
