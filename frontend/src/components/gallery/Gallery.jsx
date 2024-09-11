import { useContext, useEffect, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import UploadImageForm from './UploadImageForm'
import { getGalleryImages } from '../../services/image'
import AuthContext from '../../contexts/AuthContext'
import PaginationFooter from '../match/common/PaginationFooter'

const ImageColumn = ({ images }) => {
  return (
    <div className='grid gap-4'>
      {images &&
        images.map((image) => (
          <img
            className='h-auto max-w-full rounded-lg'
            src={image.url}
            alt={image.title ? image.title : 'Gallery image'}
            key={image.id}
          />
        ))}
    </div>
  )
}

const Gallery = () => {
  const [images, setImages] = useState([])
  const [previous, setPrevious] = useState('')
  const [next, setNext] = useState('')
  const [searchParams] = useSearchParams()
  const { search } = useLocation()
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const getImages = async () => {
      const res = await getGalleryImages({ page: searchParams.get('page') })
      let data = res.results
      setPrevious(res.previous)
      setNext(res.next)
      let groupedImages = [],
        size = 2
      for (let i = 0; i < data.length; i += size) {
        groupedImages.push(data.slice(i, i + size))
      }
      setImages(groupedImages)
    }
    getImages()
  }, [searchParams, search])

  return (
    <>
      {isAuthenticated && (
        <div className='flex justify-items-center'>
          <div
            className='btn bg-accent/95 m-4 btn-sm text-white'
            onClick={() =>
              document.getElementById('upload_image_modal').showModal()
            }
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
            Upload image
          </div>
        </div>
      )}
      <dialog id='upload_image_modal' className='modal'>
        <div className='modal-box'>
          <UploadImageForm />
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
      <div className='grid grid-cols sm:grid-cols-2 md:grid-cols-4 gap-4 p-4'>
        {images &&
          Object.keys(images).map((key, i) => {
            return <ImageColumn key={i} images={images[key]} />
          })}
      </div>
      <PaginationFooter url={'/gallery/'} previous={previous} next={next} />
    </>
  )
}

export default Gallery
