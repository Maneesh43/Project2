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
  pwainit('.././sw.js');
})