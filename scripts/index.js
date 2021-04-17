let sessstorage=window.sessionStorage;

// Fire base Authentication event listener
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
  } else {
    
  }
});





// Redirect to login page
document.querySelector('#login-page').addEventListener('click',()=>{
  window.location.href='pages/login.html';
})





//Redirect to Registration page

document.querySelector('#register-page').addEventListener('click',()=>{
  window.location.href='pages/registration.html';
})



//google signin here//
document.querySelector('#google-signin').addEventListener('click',()=>{
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth()
.signInWithPopup(provider)
.then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  var credential = result.credential;
  window.sessionStorage.clear();

  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  sessstorage.setItem("is_logged_in",true);
  sessstorage.setItem("loginuser",JSON.stringify(user));

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

// Facebook sign-in
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
   
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // toaster(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // console.log(error);
  // console.log(errorMessage);

    // ...
  });

})


// PWA Initialization
document.addEventListener("DOMContentLoaded",()=>{
  pwainit('sw.js');
})



// PWA banner in nav menu
var deferredPrompt; 
// Adding before install event listener
window.addEventListener('beforeinstallprompt', function (e) { 
  deferredPrompt = e; 
  showAddToHomeScreen(deferredPrompt);
  // console.log(deferredPrompt);
 }); 
// Making banner visible if user didnt install PWA and PWA is supported by the browser.
 function showAddToHomeScreen() { 
   var a2hsBtn = document.querySelector(".pwabanner"); 
  //  console.log(a2hsBtn);
   a2hsBtn.style.display = "block";
  //  a2hsBtn.style.justifyContent="space-around"; 
   a2hsBtn.addEventListener("click", addToHomeScreen); 
  } 
// Showing PWA Install prompt
  function addToHomeScreen() { 
    var a2hsBtn = document.querySelector(".pwabanner");  
    a2hsBtn.style.display = 'none'; // Show the prompt 
    deferredPrompt.prompt(); // Wait for the user to respond to the prompt 
    deferredPrompt.userChoice .then(function(choiceResult){ 
      if (choiceResult.outcome === 'accepted') { 
        // console.log('User accepted the A2HS prompt'); 
      } 
      else 
      { 
        // 'User dismissed the A2HS prompt'; 
      } 
      deferredPrompt = null; 
    }); } 

    
