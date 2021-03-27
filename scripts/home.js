firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // alert("success");
    console.log(user.email);
    useremail=user.email;
  } else {
    // No user is signed in.
    // alert("user not logged in");
    console.log("User not signed in")
    window.location.replace('../index.html');
  }
});

// Signout
document.querySelector('#signouthere').addEventListener('click',()=>{
  firebase.auth().signOut().then(() => {
    // alert("signed out");
    toaster("Signed Out!","lightgreen");
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    // alert("sign-out failed");
    toaster("Failed to signout","darkred");
  });
  
})


  //dropdown
//Event Handler for menu

//From W3 Schools Dropdown with click


document.querySelector('.dropbtn i').addEventListener('click',()=>{

  document.getElementById("myDropdown").classList.toggle("show");



})


//Window Event Handlers


window.addEventListener('click',(event)=>{

  if (!event.target.matches('.dropbtn i')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }



})
