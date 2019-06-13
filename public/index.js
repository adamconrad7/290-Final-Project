// Gets username of favorited user and stores them in array:
var buttons = document.getElementsByClassName('fav-button');

var favoritedUsers = [' '];

var allusers = document.getElementsByClassName('users-container')[0].children;
// userName = allusers[0].innerText.trim();
// userName = userName.substring(0, userName.indexOf('\n'));
// // userName = userName.innerText;
// // userName = userName.trim();
// console.log(userName);
// userName = userName.substring(0, userName.indexOf('\n'));
// console.log(userName);
var allUsers = [];

for(var i=0; i<allusers.length-2; i++){

   userName = allusers[i].innerText.trim();
   userName = userName.substring(0, userName.indexOf('\n'));
   allUsers.push(userName);
}


var addFav = function() {
    console.log(allUsers);
    var bool = this.parentNode.getElementsByClassName('fav-bool')[0].innerText;
    console.log(bool);
    var button = this.firstChild.nextSibling;
    button.classList.add('pressed');

    var username = this.parentNode.innerText;
    // console.log(username);
    username = username.substring(0, username.indexOf('\n'));

    if(bool === 'true'){
      console.log("existing fav");
      //If user exists in favorites array, remove them and make button un pressed:
      favoritedUsers.splice(i,1);
      button.classList.remove('pressed');
      var postRequest = new XMLHttpRequest();
      var requestURL = '/removeFav';
      postRequest.open('POST', requestURL);
      // var requestBody = JSON.stringify({
      //   favsList: favoritedUsers
      // });
      var requestBody = JSON.stringify({
        favUser: username
      });

      postRequest.addEventListener('load', function(event){
        if (event.target.status === 200) {

        }
      });
      postRequest.setRequestHeader('Content-Type', 'application/json');
      postRequest.send(requestBody);
      //break;
    }else{
      console.log("new user");
      var postRequest = new XMLHttpRequest();
      var requestURL = '/addFav';
      postRequest.open('POST', requestURL);
      // var requestBody = JSON.stringify({
      //   favsList: favoritedUsers
      // });
      var requestBody = JSON.stringify({
        favUser: username
      });

      postRequest.addEventListener('load', function(event){
        if (event.target.status === 200) {

        }
      });
      postRequest.setRequestHeader('Content-Type', 'application/json');
      postRequest.send(requestBody);
    }

    // //loops over list of favorited users to ensure that no duplicates are added:
    // for(var i=0; i<allUsers.length; i++){
    //   if(allUsers[i] !== username ){
    //     if(i === favoritedUsers.length-1){
    //         favoritedUsers.push(username);
    //         console.log("new user");
    //         var postRequest = new XMLHttpRequest();
    //         var requestURL = '/addFav';
    //         postRequest.open('POST', requestURL);
    //         // var requestBody = JSON.stringify({
    //         //   favsList: favoritedUsers
    //         // });
    //         var requestBody = JSON.stringify({
    //           favUser: username
    //         });
    //
    //         postRequest.addEventListener('load', function(event){
    //           if (event.target.status === 200) {
    //
    //           }
    //         });
    //         postRequest.setRequestHeader('Content-Type', 'application/json');
    //         postRequest.send(requestBody);
    //         break;
    //     }
    //   }else{
    //     console.log("existing fav");
    //     //If user exists in favorites array, remove them and make button un pressed:
    //     favoritedUsers.splice(i,1);
    //     button.classList.remove('pressed');
    //     var postRequest = new XMLHttpRequest();
    //     var requestURL = '/removeFav';
    //     postRequest.open('POST', requestURL);
    //     // var requestBody = JSON.stringify({
    //     //   favsList: favoritedUsers
    //     // });
    //     var requestBody = JSON.stringify({
    //       favUser: username
    //     });
    //
    //     postRequest.addEventListener('load', function(event){
    //       if (event.target.status === 200) {
    //
    //       }
    //     });
    //     postRequest.setRequestHeader('Content-Type', 'application/json');
    //     postRequest.send(requestBody);
    //     break;
    //     break;
    //   }
    // }
};

for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', addFav, false);
}

//These two functions display and hide the login modal, respectively:
var displayModal1 = function(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var loginModal = document.getElementById('login-modal');
  modalBackdrop.classList.remove('hidden');
  loginModal.classList.remove('hidden');
}

var hideModal1 = function(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var loginModal = document.getElementById('login-modal');
  modalBackdrop.classList.add('hidden');
  loginModal.classList.add('hidden');
}

var displayModal2 = function(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var loginModal = document.getElementById('sign-up-modal');
  modalBackdrop.classList.remove('hidden');
  loginModal.classList.remove('hidden');
}

var hideModal2 = function(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var loginModal = document.getElementById('sign-up-modal');
  modalBackdrop.classList.add('hidden');
  loginModal.classList.add('hidden');
}

//Global array containing all users:


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
          hideModal1();
          /*displayModal2(); */     //just added
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

// var postRequest = new XMLHttpRequest();
// var requestURL = '/addFav';
// postRequest.open('POST', requestURL);
// var requestBody = JSON.stringify({
//   favsList: favoritedUsers
// });
// postRequest.addEventListener('load', function(event){
//   if (event.target.status === 200) {
//
//   }
// });
// postRequest.setRequestHeader('Content-Type', 'application/json');
// postRequest.send(requestBody);

var enterButton = document.getElementsByClassName('modal-accept-button')[0];
enterButton.addEventListener('click', getUsername);

// var loginButton = document.getElementsByClassName('login-button')[0];
// loginButton.addEventListener('click', displayModal1);

window.addEventListener('DOMContentLoaded', function () {
  //login modal is displayed upon page load:
  console.log("dom content loaded")
  // displayModal1();
});


var favButton = document.getElementsByClassName('favorite')[0];
favButton.addEventListener('click',function(){
  displayFavs();
})

var everyoneButton = document.getElementsByClassName('everyone')[0];
everyoneButton.addEventListener('click',function(){
  showAllUsers();
})

var displayFavs = function(){
  allPeople = document.getElementsByClassName('user-card');
  for(var i =0; i<allPeople.length; i++){
    var username = allPeople[i].innerText;
    username = username.substring(0, username.indexOf('\n'));
    if(!checkFavs(username)){
      // console.log(username, " is not a favorite.");
      allPeople[i].classList.add('hidden');
    }
  }
}

var checkFavs = function(name){
  for(var i=0; i<favoritedUsers.length; i++){
    if(name === favoritedUsers[i]){
      return true;
    }else{
      if(i === favoritedUsers.length-1){
        return false;
      }
    }
  }
}

// //this need to generate a request that has a name of user being favorited:
// var sendFavorite = function(){
//     var postRequest = new XMLHttpRequest();
//     var requestURL = '/favorites';
//     postRequest.open('POST', requestURL);
//     var requestBody = JSON.stringify({
//       favsList: favoritedUsers
//     });
//     postRequest.addEventListener('load', function(event){
//       if (event.target.status === 200) {
//
//       }
//     });
//     postRequest.setRequestHeader('Content-Type', 'application/json');
//     postRequest.send(requestBody);
//     break;
// }

var showAllUsers = function(){
  allPeople = document.getElementsByClassName('user-card');
  for(var i =0; i<allPeople.length; i++){
      allPeople[i].classList.remove('hidden');
  }
}



// console.log(allUsers);

//
// var setActive = function(classname){
//   classname.classList.add('active');
// }
//
// var removeActive = function(classname){
//   classname.classList.remove('active');
// }
//
// var navlink = document.getElementsByClassName
// navlink.addEventListener('click', setActive(navlink));
