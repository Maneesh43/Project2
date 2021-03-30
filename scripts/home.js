firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // alert("success");
    // console.log(user.email);
    document.querySelector(".loader").classList.toggle("hide");
    document.querySelector(".wrapperhome").classList.toggle("hide");
    useremail=user.email;
    is_doc_available(useremail);
  } else {
    // No user is signed in.
    // alert("user not logged in");
    console.log("User not signed in")
    window.location.replace('../index.html');
  }
});

// Signout
document.querySelector('#signouthere').addEventListener('click',()=>{
  signout();
  
})


  //dropdown
//Event Handler for menu

//From W3 Schools Dropdown with click





//Window Event Handlers
// Drop Down

dropdownfunc();




// PWA

document.addEventListener("DOMContentLoaded",()=>{
  pwainit('../sw.js');
})


// document.querySelector('.ad2hs-prompt p').addEventListener("click",()=>{
//   document.querySelector('.ad2hs-prompt').style.display="none";
// })
// setTimeout(function(){
// document.querySelector('.ad2hs-prompt').style.display="none";
// },(5*1000));

// var deferredPrompt; 

// window.addEventListener('beforeinstallprompt', function (e) { 
//   deferredPrompt = e; 
//   showAddToHomeScreen();
//  }); 

//  function showAddToHomeScreen() { 
//    var a2hsBtn = document.querySelector(".ad2hs-prompt"); 
//    console.log(a2hsBtn);
//    a2hsBtn.style.display = "flex";
//    a2hsBtn.style.justifyContent="space-around"; 
//    a2hsBtn.addEventListener("click", addToHomeScreen); 
//   } 

//   function addToHomeScreen() { 
//     var a2hsBtn = document.querySelector(".ad2hs-prompt");  
//     a2hsBtn.style.display = 'none'; // Show the prompt 
//     deferredPrompt.prompt(); // Wait for the user to respond to the prompt 
//     deferredPrompt.userChoice .then(function(choiceResult){ 
//       if (choiceResult.outcome === 'accepted') { 
//         console.log('User accepted the A2HS prompt'); 
//       } else 
//       { 
//         console.log('User dismissed the A2HS prompt'); 
//       } 
//       deferredPrompt = null; }); } 