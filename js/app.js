// class-GitHub
class GitHub {
  constructor() {
    this.client_id = 'Iv1.70f6e0ee2baf2c85';
    this.client_secret = 'db7a0c7412ab98126c2cf60de1eeced0304bd1ab';
    this.base = "https://api.github.com/users/";
  }

  async ajaxUser(userValue) {
    // user url.
    const userURL = `${this.base}${userValue}?client_id='${this.client_id}'&client_secret='${this.client_secret}'`;

    // repos url.
    const reposURL = `${this.base}${userValue}/repos?client_id='${this.client_id}'&client_secret='${this.client_secret}'`;
    // get users.
    const userData = await fetch(userURL);
    const user = await userData.json();
    // get repos.log
    const reposData = await fetch(reposURL);
    const repos = await reposData.json();
    return {
      user,
      repos
    }
  }
}

// ..........................
// ..........................
// ..........................

// class- UI
class UI {
  constructor() {

  }
  // show feedback
  showFeedback(text) {
    const feedback = document.querySelector('.feedback');
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`;
    setTimeout(() => {
      feedback.classList.remove('showItem');
    }, 3000)
  }

  // get user
  getUser(user) {
    const {
      avatar_url: image,
      html_url: link,
      public_repos: repos,
      name,
      login,
      message
    } = user;

    if (message === 'Not Found') {
      this.showFeedback('No Such User Exist, Please Double Check On Your Data.');
    } else {
      this.displayUser(image, link, repos, name, login);
      const searchUser = document.getElementById('searchUser');
      searchUser.value = '';
    }
  }

  // display user
  displayUser(image, link, repos, name, login) {
    const userList = document.getElementById('github-users');
    const div = document.createElement('div');
    div.classList.add('row', 'single-user', 'my-3');
    div.innerHTML = `
     <div class=" col-sm-6 col-md-4 user-photo my-2">
       <img src="${image}" class="img-fluid" alt="">
      </div>
      <div class="col-sm-6 col-md-4 user-info text-capitalize my-2">
       <h6>name : <span>${name}</span></h6>
       <h6 > github: <a href = "${link}" target = "_blank" class = "badge badge-primary" > link </a> </h6>
       <h6>public repos : <span class="badge badge-success">${repos}</span> </h6>
      </div>
      <div class=" col-sm-6 col-md-4 user-repos my-2">
       <button type="button" data-id='${login}' id="getRepos" class="btn reposBtn text-capitalize mt-3">
        get repos
       </button>
      </div>
  `
    userList.appendChild(div);
  }

  displayRepos(userID, repos) {
    const reposBtn = document.querySelectorAll('[data-id]');
    reposBtn.forEach(btn => {
      if (btn.dataset.id === userID) {
        const parent = btn.parentNode;

        repos.forEach(repo => {
          const p = document.createElement('p');
          p.innerHTML = `<p><a href="${repo.html_url}" target='_blank'>${repo.name}</a></p>`
          parent.appendChild(p);
        })
      }
    })
  }
}

// ..........................
// ..........................
// ..........................

// invoiced function
(function () {
  const ui = new UI();
  const gitHub = new GitHub();

  const searchForm = document.getElementById('searchForm');
  const searchUser = document.getElementById('searchUser');
  const userList = document.getElementById('github-users');

  // users 
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const textValue = searchUser.value;
    if (textValue === '') {
      ui.showFeedback('Please, Double Check On Your Data.')
    } else {
      gitHub
        .ajaxUser(textValue)
        .then(data => ui.getUser(data.user))
        .catch(error => console.log(error))
    }
  });

  // repos
  userList.addEventListener('click', (e) => {
    if (e.target.classList.contains('reposBtn')) {
      const userID = e.target.dataset.id;
      gitHub
        .ajaxUser(userID)
        .then(data => ui.displayRepos(userID, data.repos))
        .catch(error => console.log(error));
    }
  })
})();