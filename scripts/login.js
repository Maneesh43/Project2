

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // alert("success");
      console.log(user);
    } else {
      // No user is signed in.
      // alert("login fail");
      console.log("login failed");
    }
  });

//Key Events

window.addEventListener('keydown',function(event){
  // console.log(event.code);
  if(event.code=="Enter"){
    loginuser();
  }
});

  // Event Listener
  document.querySelector('#log-in').addEventListener('click',loginuser);
  
  
  function loginuser(){
    let a=document.querySelector('#email-input').value;
    let a1=document.querySelector('#password-input').value;
    firebase.auth().signInWithEmailAndPassword(a, a1)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user);
    window.location.href='home.html';
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}

//Reset Password

document.querySelector('#forgot').addEventListener('click',()=>{
  let a=null;
  a=document.querySelector('#email-input').value;
  console.log(a);
  if(a!=null){

  var auth = firebase.auth();
  firebase.auth().useDeviceLanguage();
  var emailAddress = a;
  
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    console.log("email sent");
  }).catch(function(error) {
    // An error happened.
    console.log("failed to send email");
  });
  }

})