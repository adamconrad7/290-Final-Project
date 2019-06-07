// Gets username of favorited user and stores them in array:
var buttons = document.getElementsByClassName('fav-button');

var favoritedUsers = [' '];

var addFav = function() {
    var username = this.parentNode.innerText;
    username = username.substring(0, username.indexOf('\n'));
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
