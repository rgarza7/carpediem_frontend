document.addEventListener("DOMContentLoaded", function(event) {

const userUrl = 'http://localhost:3000/api/v1/users'
const loginButton = document.getElementById('loginId')
loginAttempt();
function loginAttempt() {
  loginButton.addEventListener('click', loginUser)
}


function getUsers(){
  fetch(userUrl)
  .then (res => res.json())
  .then (checkUser)
  // .then (function(e) {console.log(e)})
}

function loginUser(e){
  e.preventDefault()
  getUsers()
  }

  function checkUser(event){
    let typedEmail  = document.getElementById("email").value;
    event.forEach(function(user) {
      check(user, typedEmail) 

    })
    }

  function check(user, typedEmail) {
    if ( typedEmail === user.email) {
      alert ("Login successfully");
      window.location = "index.html"; // Redirecting to
    } else {


    }
}
})
