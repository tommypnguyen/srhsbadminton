import { useState } from 'react'
import UploadImage from '../common/UploadImage'
import { addGalleryImage, uploadImage } from '../../services/image'

const UploadImageForm = () => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')

  const onSubmit = async () => {
    const res = await uploadImage(image, title)
    const data = res.data
    const imagePayload = {
      url: data.link,
      title: data.title,
      category: 'gallery',
    }
    await addGalleryImage(imagePayload)
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
          <div className='pt-2'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='image-title'
            >
              Title
            </label>
            <input
              className='appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='image-title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='col-span-full'>
            <UploadImage
              label={'Gallery Image'}
              image={image}
              setImage={setImage}
            />
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
    </form>
  )
}

export default UploadImageForm
