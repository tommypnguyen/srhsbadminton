import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    current: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setPostStatus(state, action) {
      state.status = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        let newPosts = state.posts.map((post) =>
          post.id !== action.payload.id ? post : action.payload,
        )
        newPosts.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
        })
        state.posts = newPosts
        state.status = 'idle'
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.id !== parseInt(action.payload),
        )
        state.status = 'idle'
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        let newPosts = state.posts.map((post) =>
          post.id !== action.payload.id ? post : action.payload,
        )
        newPosts.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
        })

        state.posts = newPosts
        state.status = 'idle'
      })
  },
})

export const { setPostStatus } = postSlice.actions

export default postSlice.reducer

export const selectAllPosts = (state) => state.post.posts

export const selectPostById = (state, postId) =>
  state.post.posts.find((post) => post.id === postId)

export const fetchPosts = createAsyncThunk('post/fetchPosts', async (data) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/`, {
    params: data,
  })
  return response.data
})

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}/`)
  return id
})

export const updatePost = createAsyncThunk('post/updatePost', async (data) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_API_URL}/posts/${data.postId}/`,
    data.formData,
  )

  return response.data
})

export const addNewPost = createAsyncThunk(
  'post/addNewPost',
  async (initialPost) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/posts/`,
      initialPost,
    )
    return response.data
  },
)
