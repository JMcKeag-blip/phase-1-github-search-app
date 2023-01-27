function init(){
  document.getElementById('github-form')
  .addEventListener('submit', (e) => {
      e.preventDefault()
      let text = e.target.children[0].value
      githubSearchFetch(text)
  })

  function githubSearchFetch(userName){
      return fetch(`https://api.github.com/search/users?q=${userName}`)
      .then(resp => resp.json())
      .then(data => {
          const dataArray = [...data.items]
          dataArray.forEach(user => createUserCard(user))
      })
  }

  function createUserCard(user){
      let h2 = document.createElement('h2')
      h2.innerText = `${user.login}`
      
      let img = document.createElement('img')
      img.src = `${user.avatar_url}`

      let p = document.createElement('p')
      p.innerText = `${user.html_url}`

      let button = document.createElement('button')
      button.innerText = 'Repositories'
      button.addEventListener('click', (e) => {
          repoFetch(`${user.login}`)
      })

      let list = document.getElementById('user-list')
      let listElement = document.createElement('li')

      listElement.append(h2, img, p, button)
      list.appendChild(listElement)
  }

  function repoFetch(userLogin){
      return fetch(`https://api.github.com/users/${userLogin}/repos`)
      .then(resp => resp.json())
      .then(data => {
          const repoArray = [...data]
          repoArray.forEach(repo => createRepoList(repo))
      })
  }

  function createRepoList(repos){
      let li = document.createElement('li')
      let ul = document.getElementById('repos-list')

      li.innerText = `${repos.name}`
      ul.appendChild(li)
  }

}

document.addEventListener("DOMContentLoaded", init)