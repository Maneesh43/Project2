firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      alert("success");
    } else {
      // No user is signed in.
      alert("login fail");
    }
  });
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