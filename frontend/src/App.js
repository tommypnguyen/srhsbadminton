import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { register } from 'swiper/element/bundle'
import AuthContext from './contexts/AuthContext'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import MatchList from './components/match/MatchList'
import Match from './components/match/Match'
import Posts from './components/post/Posts'
import Footer from './components/layout/Footer'
import Post from './components/post/Post'
import Gallery from './components/gallery/Gallery'
import PlayerList from './components/player/PlayerList'
import AddMatchForm from './components/match/AddMatchForm'
import UploadPost from './components/post/UploadPost'
import Player from './components/player/Player'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import { useState } from 'react'

register()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem('access_token') !== null,
  )
  return (
    <Router>
      <div>
        <AuthContext.Provider
          value={{
            isAuthenticated,
            setIsAuthenticated,
          }}
        >
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/matches' element={<MatchList />} />
            <Route exact path='/matches/add' element={<AddMatchForm />} />
            <Route path='/matches/:id' element={<Match />} />
            <Route path='/posts/add' element={<UploadPost />} />
            <Route path='/posts/:id' element={<Post />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/players' element={<PlayerList />} />
            <Route path='/players/:id' element={<Player />} />
            <Route
              path='/announcements'
              element={<Posts header='Announcements' />}
            />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
          <Footer />
        </AuthContext.Provider>
      </div>
    </Router>
  )
}

export default App
