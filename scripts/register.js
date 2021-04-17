


document.querySelector('#register').addEventListener('click',()=>{

let useremail=document.querySelector('#useremail').value;
// console.log(useremail);
// Authentication event handler
let userpassword=document.querySelector("#userpassword").value;
firebase.auth().createUserWithEmailAndPassword(useremail, userpassword)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // console.log("User Registered successfully");
    // alert("registration successfull");
    toaster("Registered Successfully","lightgreen");
    window.location.href="home.html";
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // console.log(errorMessage);
    // console.log(errorCode);
    if(errorCode){
        // alert(error.message);
        toaster(errorMessage);
    }
    // console.log(error);
    // ..
  });
})



// PWA banner


var deferredPrompt; 
// Before install event listener
window.addEventListener('beforeinstallprompt', function (e) { 
  deferredPrompt = e; 
  showAddToHomeScreen(deferredPrompt);
  // console.log(deferredPrompt);
 }); 

// ADding install pwa option if users browser suppports it 
 function showAddToHomeScreen() { 
   var a2hsBtn = document.querySelector(".pwabanner"); 
  //  console.log(a2hsBtn);
   a2hsBtn.style.display = "block";
  //  a2hsBtn.style.justifyContent="space-around"; 
   a2hsBtn.addEventListener("click", addToHomeScreen); 
  } 

  // Showing PWA install prompt
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
        // console.log('User dismissed the A2HS prompt'); 
      } 
      deferredPrompt = null; 
    }); } 