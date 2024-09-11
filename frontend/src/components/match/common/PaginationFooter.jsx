import { Link } from 'react-router-dom'
const PaginationFooter = ({ url, previous, next, onClick, show = true }) => {
  if (previous === null && next === null) return <></>
  const parseLink = (link) => {
    const splitString = link.split('page=')
    if (typeof splitString[1] !== 'undefined') {
      return `${url}?page=${splitString[1]}`
    }
    return ''
  }
  if (show) {
    return (
      <div className='join flex justify-center pt-2'>
        <button
          onClick={onClick}
          className={`join-item btn btn-outline ${previous === null && 'btn-disabled'}`}
        >
          <Link to={previous && `${parseLink(previous)}`}>Prev</Link>
        </button>
        <button
          onClick={onClick}
          className={`join-item btn btn-outline ${next === null && 'btn-disabled'}`}
        >
          <Link to={next && `${parseLink(next)}`}>Next</Link>
        </button>
      </div>
    )
  }
}

export default PaginationFooter
