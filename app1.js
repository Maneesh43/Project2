firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      alert("success");
    } else {
      // No user is signed in.
      alert("login fail");
    }
  });
  document.querySelector('#b2').addEventListener('click',()=>{
    let a=document.querySelector('.form1 input:nth-of-type(1)').value;
    let a1=document.querySelector('.form1 input:nth-of-type(2)').value;
    firebase.auth().createUserWithEmailAndPassword(a, a1)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
  })
document.querySelector('#b1').addEventListener('click',()=>{
    let a=document.querySelector('.form1 input:nth-of-type(1)').value;
    let a1=document.querySelector('.form1 input:nth-of-type(2)').value;
    firebase.auth().signInWithEmailAndPassword(a, a1)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert(user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
})
document.querySelector('#b3').addEventListener('click',()=>{
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
    alert(errorMessage);
  });


})