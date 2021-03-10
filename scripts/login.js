firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // alert("success");
      console.log(user);
    } else {
      // No user is signed in.
      alert("login fail");
    }
  });



  // Event Listener
  document.querySelector('#log-in').addEventListener('click',()=>{
    let a=document.querySelector('#email-input').value;
    let a1=document.querySelector('#password-input').value;
    firebase.auth().signInWithEmailAndPassword(a, a1)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert(user);
    window.location.href='pages/home.html';
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
  })
