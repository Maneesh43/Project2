
signout();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.displayName);
    console.log("user signedin");

  } else {
    // No user is signed in.
    // alert("login fail");
    console.log("login failed");
  }
});






document.querySelector('#login-page').addEventListener('click',()=>{
  window.location.href='pages/login.html';
})





//redirect page redirect here//

document.querySelector('#register-page').addEventListener('click',()=>{
  window.location.href='pages/register.html';
})



//google signin here//
document.querySelector('#google-signin').addEventListener('click',()=>{
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth()
.signInWithPopup(provider)
.then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  var credential = result.credential;

  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  window.location.href='../pages/home.html';
  // ...
}).catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  // alert(errorMessage);
  toaster("Google signin failed","darkred");
});


})

// Facebook siggnin
document.querySelector("#fblogin").addEventListener("click",()=>{



var provider = new firebase.auth.FacebookAuthProvider();
firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    console.log(result);
    console.log(user);
    console.log(credential);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(error);
  console.log(errorMessage);

    // ...
  });

})


// PWA Initialization
document.addEventListener("DOMContentLoaded",()=>{
  pwainit('sw.js');
})


//signout

// document.querySelector('#sign-out').addEventListener('click',()=>{
//   firebase.auth().signOut().then(() => {
//     alert("signed out");
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//     alert("sign-out failed");
//   });
  
// })




// document.querySelector('#forgot').addEventListener('click',()=>{

//   var auth = firebase.auth();
//   var emailAddress = "thouti.maneesh43@gmail.com";
  
//   auth.sendPasswordResetEmail(emailAddress).then(function() {
//     // Email sent.
//     console.log("email sent");
//   }).catch(function(error) {
//     // An error happened.
//   });


// })
