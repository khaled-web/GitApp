// 
class GitHub {
 constructor() {
  this.client_id = 'Iv1.70f6e0ee2baf2c85';
  this.client_secret = 'db7a0c7412ab98126c2cf60de1eeced0304bd1ab';
  this.base = "https://api.github.com/users/";
 }

 async ajaxUser(userValue) {
  // user url
  const userURL = `${this.base}${userValue}?client_id='${this.client_id}'&client_secret='${this.client_secret}'`;

  // repos url
  const userData = await fetch(userURL);
  const user = await userData.json();
  return {
   user
  }
 }
}

class UI {}

(function () {
 const ui = new UI();
 const gitHub = new GitHub();

 const searchForm = document.getElementById('searchForm');
 const searchUser = document.getElementById('searchUser');
 const userList = document.getElementById('userList');

 searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const textValue = searchUser.value;
  if (textValue === '') {
   console.log('not this time')
  } else {
   gitHub.ajaxUser(textValue).then(data => console.log(data));
  }
 })


})();