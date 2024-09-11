import axios from 'axios'

export const addPost = async (newPost) => {
  try {
    const res = await axios.post(`http://localhost:8000/posts/`, newPost)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const editPost = async (postId, editedPost) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/posts/${postId}/`,
      editedPost,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
