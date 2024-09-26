import { useContext, useState } from 'react'
import MarkdownEditor, { commands } from '@uiw/react-md-editor'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Link, useNavigate } from 'react-router-dom'

import { addNewPost } from '../../slices/postSlice'
import AuthContext from '../../contexts/AuthContext'
const MAX_COUNT = 10

const UploadPost = () => {
  const dispatch = useDispatch()
  const { user, authTokens } = useContext(AuthContext)

  const [title, setTitle] = useState('')
  const [images, setImages] = useState([])
  const [value, setValue] = useState('')
  const [fileLimit, setFileLimit] = useState(false)

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', title)
      formData.append('body', value)
      for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i])
      }

      await dispatch(
        addNewPost({
          formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        }),
      ).unwrap()
      navigate('/announcements')
    } catch (err) {
      toast.error(`Failed to add the post.`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  const removeImage = (imageName) => {
    const newImages = images.filter((image) => image.name !== imageName)
    setImages(newImages)
  }

  const handleUploadFiles = (files) => {
    const uploaded = [...images]
    let limitExceeded = false
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
      if (uploaded.length === MAX_COUNT) setFileLimit(true)
      if (uploaded.length > MAX_COUNT) {
        toast.error(`You can only add a maximum of ${MAX_COUNT} files`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setFileLimit(false)
        limitExceeded = true
        return true
      }
    })
    if (!limitExceeded) setImages(uploaded)
  }

  const handleFileEvent = (e) => {
    const files = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(files)
  }

  if (!user) {
    navigate('/login')
  }
  return (
    <form className='p-4' method='dialog'>
      <div className='space-y-12'>
        <div>
          <h2 className='text-2xl font-semibold leading-7 text-gray-900'>
            Create a new Post
          </h2>
          <div className='pt-6'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2'
              htmlFor='post-title'
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
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2'
            htmlFor='post-content'
          >
            Content
          </label>
          <MarkdownEditor
            id='post-content'
            value={value}
            onChange={setValue}
            preview='edit'
            data-color-mode='light'
            commands={[
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.divider,
              commands.title,
              commands.hr,
              commands.divider,
              commands.unorderedListCommand,
              commands.orderedListCommand,
              commands.divider,
              commands.link,
              commands.image,
            ]}
          />
          <div className='mt-2'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2'
              htmlFor='cover-photo'
            >
              Upload images
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-4'>
              <div className='text-center'>
                <div className='flex text-sm leading-6 text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                  >
                    <p>Upload images</p>
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      multiple
                      className='sr-only'
                      onChange={handleFileEvent}
                      disabled={fileLimit}
                    />
                  </label>
                </div>
              </div>
            </div>
            {images.length !== 0 && (
              <div className='mt-2'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2'>
                  Uploaded images
                </label>
                <div>
                  {images.map((image) => (
                    <div
                      className='flex text-sm justify-between'
                      key={image.name}
                    >
                      <span className='truncat'>{image.name}</span>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          className='text-red-400 fill-current hover:text-red-600'
                          viewBox='0 0 24 24'
                          onClick={() => removeImage(image.name)}
                        >
                          <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
                          <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Link to='/announcements/'>
              <button
                type='button'
                className='text-md font-semibold leading-6 text-gray-900'
              >
                Go Back
              </button>
            </Link>
            <button
              type='submit'
              onClick={onSubmit}
              className='rounded-md bg-accent/95 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/95'
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  )
}

export default UploadPost
