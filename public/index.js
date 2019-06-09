// Gets username of favorited user and stores them in array:
var buttons = document.getElementsByClassName('fav-button');

var favoritedUsers = [' '];

var addFav = function() {
    var username = this.parentNode.innerText;
    username = username.substring(0, username.indexOf('\n'));
    //loops over list of favorited users to ensure that no duplicates are added:
    for(var i=0; i<favoritedUsers.length; i++){
      if(favoritedUsers[i] !== username && i === favoritedUsers.length-1){
          favoritedUsers.push(username);
          break;
      }
    }
  console.log(favoritedUsers);
};

for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', addFav, false);
}
//
// //Sending back to server (un-implemented):
// var request = new XMLHttpRequest();
// var requestURL = '/' + personId + '/addFavs';
// request.open('POST', requestURL);
//
// var userObj = {
//   favsList: favoritedUsers;
// };
//
// var requestBody = JSON.stringify(userObj);
//
// request.setRequestHeader(
//   'Content-Type', 'application/json'
// );
//
// request.addEventListener('load', function (event) {
//   if (event.target.status !== 200) {
//     var message = event.target.response;
//     alert("Error storing favorites array in database: " + message);
//   } else {
//     /*
//      * Update UI to indicate that photo was successfully
//      * stored.
//      */
//   }
// });
//
// request.send(requestBody);

//These two functions display and hide the login modal, respectively:
var displayLogin = function(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var loginModal = document.getElementById('login-modal');
  modalBackdrop.classList.remove('hidden');
  loginModal.classList.remove('hidden');
}

var hideLogin = function(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var loginModal = document.getElementById('login-modal');
  modalBackdrop.classList.add('hidden');
  loginModal.classList.add('hidden');
}

//Global array containing all users:
var allUsers = [''];

//Gets username from login:
var getUsername = function(){
  var currentUsername = document.getElementById('login-text-input').value;
  console.log(currentUsername);
  //Make sure user entered name:
  if(currentUsername){
    //loop over all stored names:
    for(var i=0; i<allUsers.length; i++){
      //if user name doesnt match any stored ones, store it:
      if(allUsers[i] !== currentUsername ){
        if(i === allUsers.length-1){
          //Here we need to bring the new user to a create profile modal where they fill in bio fields, add photos, etc
          allUsers.push(currentUsername);
          hideLogin();
          break;
        }
      }else {
        //Here we need to load existing user's data such as profile fields and favortied users list.
        alert('Username is taken.');
        break;
      }
    }
  }else{
    alert("Please specify a username.");
  }
}

var enterButton = document.getElementsByClassName('modal-accept-button')[0];
enterButton.addEventListener('click', getUsername);

var loginButton = document.getElementsByClassName('login-button')[0];
loginButton.addEventListener('click', displayLogin);

window.addEventListener('DOMContentLoaded', function () {
  //login modal is displayed upon page load:
  displayLogin();
});
