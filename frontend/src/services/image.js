import axios from 'axios'

export const uploadImage = async (image, title, description = '') => {
  const clientid = '8fb8e5523344512'
  const headers = {
    Authorization: `Client-ID ${clientid}`,
    'Content-type': 'application/x-www-form-urlencoded',
  }
  const form = new FormData()
  form.append('image', image)
  form.append('title', title)
  form.append('description', description)
  form.append('type', 'image')
  try {
    const res = await axios.post('https://api.imgur.com/3/image', form, {
      headers,
    })
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const addGalleryImage = async (data) => {
  try {
    const res = await axios.post('http://localhost:8000/images/', data)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const getGalleryImages = async (data = {}) => {
  try {
    const res = await axios.get(
      'http://localhost:8000/images/?category=gallery',
      { params: data },
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}
