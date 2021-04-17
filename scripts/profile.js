let userdata = null;
var db = firebase.firestore();
const fileUploader = document.getElementById('fileupload');
var storage = firebase.storage();


// var gsReference = storage.refFromURL('gs://bucket/user-images/thouti.maneesh43@gmail.com.png');
// Loading image data 
document.addEventListener('DOMContentLoaded', () => {
 
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // alert("success");
      //   console.log(user);
      userinfo = user;
      // console.log(userinfo);
      getuserprofile();
      loadprofileimage();
    } else {
      // No user is signed in.
      // alert("user not logged in");
      toaster("User not logged in");
      window.location.replace('../pages/login.html');
    }
  });
})


// User Profile data
// Setting user data in the page when he did not register.
function getuserprofile() {
  // console.log(userinfo.email);

  var docRef = db.collection("userdata").doc(userinfo.email);

  docRef.get().then((doc) => {
    if (doc.exists) {
      // console.log("Document data:", doc.data());
      setuserdata(doc);

    } else {
      
      // doc.data() will be undefined in this case
      // console.log("No such document!");
    
      document.querySelector('.loader').classList.add("hide");
      document.querySelector('.wrapper').classList.toggle("hide");
      if(userinfo.displayName==null){
        document.querySelector('.username p').textContent = getUsernameFromEmail(userinfo.email);
      }else{
        document.querySelector('.username p').textContent = userinfo.displayName;
      }
      document.querySelector('.useremail p').textContent = userinfo.email;
      document.querySelector('.userhasregisteredforvaccine p').textContent = "No";
      document.querySelector('.userage').style.display="none";
      document.querySelector('.userregistered ').style.display="none";




    }
  }).catch((error) => {
    // console.log("Error getting document:", error);
  });
}


// Setting user data if he has registered.
function setuserdata(datauser) {
  // console.log(datauser);
  document.querySelector('.loader').classList.add("hide");
  document.querySelector('.wrapper').classList.toggle("hide");

  // console.log(datauser.data());
  userdata = datauser.data();
  // console.log(userdata);
  // console.log(userdata.created.toDate().toDateString());

  if ((userdata.priority + 1) > 0) {
    document.querySelector('.username p').textContent = userdata.name;
    document.querySelector('.useremail p').textContent = userdata.email;
    document.querySelector('.userage p').textContent = userdata.age;
    document.querySelector('.userhasregisteredforvaccine p').textContent = "Yes";
    // console.log(userdata);
    document.querySelector('.userregistered p').textContent =userdata.created.toDate().toDateString();

  }
}


// Setting profile photo

function loadprofileimage(){

//   if(userinfo.providerData[0].providerId=="google.com"){
// document.querySelector(".imageholder img").src = userinfo.photoURL;
//   }
    const storageRef = storage.ref('user-images/'+userinfo.email);
    storageRef.getDownloadURL()
    .then((url) => { 
      document.querySelector(".imageholder img").src = url;
    })
    .catch((error) => {
      // Handle any errors
      // console.log(error);
      if(userinfo.providerData[0].providerId=="google.com"){
        document.querySelector(".imageholder img").src = userinfo.photoURL;
          }

    });

  }


document.querySelector("#send").addEventListener('click',()=>{
if(fileUploader!=null){
fileUploader.click();
}
})

 

  fileUploader.addEventListener('change', (event) => {
    const files = event.target.files;
   
    // console.log(storage);
  
    // Create a storage reference from our storage service
    var storageRef = storage.ref('user-images/'+userinfo.email);
    // console.log('files', files[0].type); // Printing the file object to the console.
    // if(files[0].type.split("/",1))
    // console.log(files[0].type);
    if((files[0].type.split("/",1)).toString()=="image"){

    uploadfile(storageRef,files);
    }else{
      toaster("Not a valid image");
    }
  });

  function uploadfile(storageRef,files){
    storageRef.put(files[0])
    .then((snapshot) => {
      // console.log('Uploaded a blob or file!');
      // console.log(snapshot);
      loadprofileimage();
    }).catch((error)=>{
      // console.log(error);
    })
 
  }


  // getting file from storage

// PWA

document.addEventListener("DOMContentLoaded",()=>{
  pwainit('../sw.js');
})

// sidenav
document.querySelector('.dropbtn').addEventListener("click",openNav);
document.querySelector('.closebtn').addEventListener("click",closeNav); 


// PWA banner


var deferredPrompt; 

window.addEventListener('beforeinstallprompt', function (e) { 
  deferredPrompt = e; 
  showAddToHomeScreen(deferredPrompt);
  // console.log(deferredPrompt);
 }); 

 function showAddToHomeScreen() { 
   var a2hsBtn = document.querySelector(".pwabanner"); 
  //  console.log(a2hsBtn);
   a2hsBtn.style.display = "block";
  //  a2hsBtn.style.justifyContent="space-around"; 
   a2hsBtn.addEventListener("click", addToHomeScreen); 
  } 

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

    // Signout
    document.querySelector('#signouthere').addEventListener('click',()=>{
      signout();
      
    })

// Go back button
document.querySelector(".backbutton i").addEventListener("click",()=>{
  window.history.back();
})

// Change Password of user


// Prompt the user to re-provide their sign-in credentials
// console.log(reauthenticateWithCredential(credential));




// user.updatePassword(newPassword).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });


let popupps=document.querySelector(".chgpass");
popupps.addEventListener("click",()=>{
  document.querySelector(".passwordchangepopup").style.display="flex";

})

document.querySelector(".clsbuttons").addEventListener("click",()=>{
  document.querySelector(".passwordchangepopup").style.display="none";
})


// Password update button
document.querySelector(".updatepass").addEventListener("click",()=>{
  is_valid=false;
  var cpassword=document.querySelector(".cpassword").value;
  var newpassword=document.querySelector(".newpassword").value;
  var newpasswordretype=document.querySelector(".newpasswordretype").value;
  if(is_empty(cpassword)){
    toaster("current password cannot be empty");
    is_valid=false;
  }else{
is_valid=true;
  }
  if(is_empty(newpassword) || is_empty(newpasswordretype)){
    toaster("password field cannot be empty");
    is_valid=false;

  }else{
    is_valid=true;
  }
  if(is_valid && (newpassword===newpasswordretype)){
    is_valid=true
  }else{
    is_valid=false;
  }
  // console.log(is_valid);
if(is_valid){
var credential = firebase.auth.EmailAuthProvider.credential(userinfo.email, cpassword);


console.log(credential);
reauthenticateuser();

function reauthenticateuser(){
  userinfo.reauthenticateWithCredential(credential).then(function() {
    // User re-authenticated.
    // console.log("Reauthenticated");
    changepasswordnow();
  }).catch(function(error) {
    // An error happened.
    // console.log("failed");
    toaster("Failed to reauthenticate,pls check your current password");
  });

  }

function changepasswordnow(){
  userinfo.updatePassword(newpassword).then(function() {
    // Update successful.
    // console.log("updated ");
    toaster("Your password has updated")
    toaster("please login");
    window.location.replace("../index.html");
  }).catch(function(error) {
    // An error happened.
    toaster("Failed to update password");
  });
}
}
})


// Checkbox allow notifications
document.querySelector('#switch-1').addEventListener("change",function(event){

  if(event.target.checked){
    displayNotification();
    
}else{
  disablenotifications();
}


})