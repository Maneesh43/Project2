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
      console.log(userinfo);
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
function getuserprofile() {
  console.log(userinfo.email);

  var docRef = db.collection("userdata").doc(userinfo.email);

  docRef.get().then((doc) => {
    if (doc.exists) {
      // console.log("Document data:", doc.data());
      setuserdata(doc);

    } else {
      
      // doc.data() will be undefined in this case
      console.log("No such document!");
    
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
    console.log("Error getting document:", error);
  });
}

function setuserdata(datauser) {
  console.log(datauser);
  document.querySelector('.loader').classList.add("hide");
  document.querySelector('.wrapper').classList.toggle("hide");

  // console.log(datauser.data());
  userdata = datauser.data();
  // console.log(userdata);
  console.log(userdata.created.toDate().toDateString());

  if ((userdata.priority + 1) > 0) {
    document.querySelector('.username p').textContent = userdata.name;
    document.querySelector('.useremail p').textContent = userdata.email;
    document.querySelector('.userage p').textContent = userdata.age;
    document.querySelector('.userhasregisteredforvaccine p').textContent = "Yes";
    document.querySelector('.userregistered p').textContent = userdata.created.toDate().toDateString();

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
      console.log(error);
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
    console.log('files', files[0].type); // Printing the file object to the console.
    // if(files[0].type.split("/",1))
    console.log(files[0].type);
    if((files[0].type.split("/",1)).toString()=="image"){

    uploadfile(storageRef,files);
    }else{
      toaster("Not a valid image");
    }
  });

  function uploadfile(storageRef,files){
    storageRef.put(files[0])
    .then((snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log(snapshot);
      loadprofileimage();
    }).catch((error)=>{
      console.log(error);
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
  console.log(deferredPrompt);
 }); 

 function showAddToHomeScreen() { 
   var a2hsBtn = document.querySelector(".pwabanner"); 
   console.log(a2hsBtn);
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
        console.log('User accepted the A2HS prompt'); 
      } 
      else 
      { 
        console.log('User dismissed the A2HS prompt'); 
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

document.querySelector(".chgpass").addEventListener("click",()=>{
  
})
