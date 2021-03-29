
// Global variables
let sessstorage = window.sessionStorage;





firebase.auth().onAuthStateChanged(function (user) {
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

window.addEventListener('keydown', function (event) {
  // console.log(event.code);
  if (event.code == "Enter") {
    loginuser();
  }
});

// Event Listener
document.querySelector('#log-in').addEventListener('click', loginuser);


function loginuser() {
  let a = document.querySelector('#email-input').value;
  let a1 = document.querySelector('#password-input').value;

  console.log(a);
  if (is_email(a) && !(is_empty(a1))) {
    firebase.auth().signInWithEmailAndPassword(a, a1)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        window.location.href = 'home.html';
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // alert(errorMessage);
        toaster("User login failed", "darkred");
        console.log(errorMessage);
      });
  } else {
    console.log("email Validation failed");
    toaster("Email or password incorrect!");
    document.querySelector("#email-input").style.borderColor = "red"

  }
}




//Reset Password

document.querySelector('#forgot').addEventListener('click', () => {
  let a = null;
  a = document.querySelector('#email-input').value;
  console.log(a);


  //reauthenticate incase of user password change
  //   const user = firebase.auth().currentUser;
  //   console.log(user);
  // //   const credential = firebase.auth.EmailAuthProvider.credential(
  // //     user.email, 
  // //     userProvidedPassword
  // // );
  // // // Now you can use that to reauthenticate
  // // user.reauthenticateWithCredential(credential);
  if (a != null) {

    var auth = firebase.auth();
    firebase.auth().useDeviceLanguage();
    var emailAddress = a;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
      // Email sent.
      console.log("email sent");
      toaster("Reset Email has been sent.!");
    }).catch(function (error) {
      // An error happened.
      console.log("failed to send email");
      toaster("Make sure you entered email addess! ");
      document.querySelector("#email-input").focus();
    });
  }

})

//Setting session storage



let emailfield = document.querySelector('#email-input');
let passwordfield = document.querySelector('#password-input');



if(sessstorage.getItem("email") && sessstorage.getItem("password")){
  emailfield.value=sessstorage.getItem("email");
  passwordfield.value=sessstorage.getItem("password");
}

[emailfield, passwordfield].forEach(function(item){
  item.addEventListener("change",()=>{
    sessstorage.setItem("email",emailfield.value);
    sessstorage.setItem("password",passwordfield.value);
  })
}

)


document.addEventListener("DOMContentLoaded",()=>{
  pwainit('.././sw.js');
})
