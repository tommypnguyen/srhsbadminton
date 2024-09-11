const UploadImage = ({ image, setImage, label }) => {
  let content
  if (image) {
    if (image['url']) {
      content = (
        <div>
          <a className='link text-blue-600' href={image.url} alt={image.title}>
            {image.title}
          </a>
        </div>
      )
    } else {
      content = <div className='text-success'>Image ready to upload</div>
    }
  }
  return (
    <>
      <label
        className='block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2'
        htmlFor='cover-photo'
      >
        {label}
      </label>
      {content}
      <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-4'>
        <div className='text-center'>
          <div className='flex text-sm leading-6 text-gray-600'>
            <label
              htmlFor='file-upload'
              className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
            >
              <p>Upload a file</p>
              <input
                id='file-upload'
                name='file-upload'
                type='file'
                className='sr-only'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadImage
