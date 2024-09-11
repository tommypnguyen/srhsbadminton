import MatchCards from '../match/cards/MatchCards'
import PostList from '../post/PostList'

const Home = () => {
  return (
    <div>
      <section className='bg-white'>
        <MatchCards />
      </section>
      <section className='bg-white'>
        <div className='grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl '>
              Welcome to <br />
              <span className='text-accent'>Panther Badminton</span>
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl '>
              Find the latest announcements, updates, and match history of the
              Santa Rosa High School Badminton team here.
            </p>
          </div>
          <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <img src='https://i.imgur.com/6AgKdOj.png' alt='hero image' />
          </div>
        </div>
      </section>
      <section className='bg-white'>
        <div className='divide-y divide-gray-200 dark:divide-gray-700 p-4'>
          <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
            <h1 className='font-bold leading-9 tracking-tight text-5xl sm:leading-10 md:leading-14'>
              Announcements
            </h1>
            <div>
              <PostList show={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
