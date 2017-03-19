import axios from 'axios'

const get = (username) => {
  return axios.get(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then(response => {
    let repos = response.data.map(repo => {
      return {
        name: repo.name,
        stars: repo.stargazers_count,
        description: repo.description,
        url: repo.html_url
      }
    })
    repos = repos.sort((a, b) => b.stars - a.stars).slice(0, 5)
    return repos
  })
  .catch(error => {
    /* Error handling */
    return {
      error: error.response.data.message
    }
  })
}

export default get
