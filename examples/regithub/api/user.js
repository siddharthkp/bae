import axios from 'axios'

const get = (username) => {
  return axios.get(`https://api.github.com/users/${username}`)
  .then(response => {
    return {
      username: response.data.login,
      name: response.data.name,
      photo: response.data.avatar_url,
      bio: response.data.bio || 'no description',
      url: response.data.html_url
    }
  })
  .catch(error => {
    return {error: error.response.data.message}
  })
}

export default get
