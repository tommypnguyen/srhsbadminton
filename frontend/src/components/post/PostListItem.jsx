const PostItem = ({ date, title }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  const formattedDate = formatDate(date)
  return (
    <>
      <div className='py-5'>
        <article className='flex flex-col space-y-2 xl:space-y-0'>
          <div className='flex flex-row'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              className='fill-current'
              viewBox='0 0 24 24'
            >
              <path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z' />
            </svg>
            <dl>
              <dt className='sr-only'>Published on</dt>
              <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                <time>{formattedDate}</time>
              </dd>
            </dl>
          </div>

          <div className='pt-2 hover:underline'>
            <div>
              <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                <span className='text-gray-900'>{title}</span>
              </h2>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}

export default PostItem
