import axios from 'axios'

export const addPost = async (newPost) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts/`, newPost)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const editPost = async (postId, editedPost) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/posts/${postId}/`,
      editedPost,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
