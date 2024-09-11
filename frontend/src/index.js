import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import store from './store'
import App from './App'
import { Provider } from 'react-redux'
import './interceptors/axios'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
