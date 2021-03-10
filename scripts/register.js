


document.querySelector('#register').addEventListener('click',()=>{

let useremail=document.querySelector('#useremail').value;
console.log(useremail);

let userpassword=document.querySelector("#userpassword").value;
firebase.auth().createUserWithEmailAndPassword(useremail, userpassword)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log("User Registered successfully");
    alert("registration successfull");
    window.location.href="home.html";
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    console.log(errorCode);
    if(errorCode){
        alert(error.message);
    }
    console.log(error);
    // ..
  });
})