import { configureStore } from '@reduxjs/toolkit'
import matchReducer from '../src/slices/matchSlice'
import postReducer from '../src/slices/postSlice'
import schoolReducer from './slices/schoolSlice'

export default configureStore({
  reducer: {
    match: matchReducer,
    post: postReducer,
    school: schoolReducer,
  },
})
