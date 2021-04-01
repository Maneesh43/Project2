let sessstorage=window.sessionStorage;


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
  sessstorage.setItem("is_logged_in",true);

  window.location.replace("pages/home.html");
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
  toaster("Google signin failed");
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

// PWA banner


var deferredPrompt; 

window.addEventListener('beforeinstallprompt', function (e) { 
  deferredPrompt = e; 
  showAddToHomeScreen(deferredPrompt);
  console.log(deferredPrompt);
 }); 

 function showAddToHomeScreen() { 
   var a2hsBtn = document.querySelector(".pwabanner"); 
   console.log(a2hsBtn);
   a2hsBtn.style.display = "block";
  //  a2hsBtn.style.justifyContent="space-around"; 
   a2hsBtn.addEventListener("click", addToHomeScreen); 
  } 

  function addToHomeScreen() { 
    var a2hsBtn = document.querySelector(".pwabanner");  
    a2hsBtn.style.display = 'none'; // Show the prompt 
    deferredPrompt.prompt(); // Wait for the user to respond to the prompt 
    deferredPrompt.userChoice .then(function(choiceResult){ 
      if (choiceResult.outcome === 'accepted') { 
        console.log('User accepted the A2HS prompt'); 
      } 
      else 
      { 
        console.log('User dismissed the A2HS prompt'); 
      } 
      deferredPrompt = null; 
    }); } 

    
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
