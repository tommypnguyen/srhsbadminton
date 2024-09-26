import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import UploadImage from '../common/UploadImage'
import { addGalleryImage } from '../../services/image'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UploadImageForm = () => {
  const navigate = useNavigate()
  const { authTokens } = useContext(AuthContext)
  const [image, setImage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('file', image)
      await addGalleryImage({
        formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      })
      navigate(0)
    } catch (err) {
      toast.error(
        'Failed to add image. Please make sure you are logged in or try again.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      )
    }
  }

  return (
    <form className='p-4' method='dialog'>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Image
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Upload an Image to the gallery
          </p>

          <div className='col-span-full'>
            <UploadImage image={image} setImage={setImage} />
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          onClick={onSubmit}
          className='rounded-md bg-accent/95 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/95'
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </form>
  )
}

export default UploadImageForm
