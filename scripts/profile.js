let userdata = null;
var db = firebase.firestore();
const fileUploader = document.getElementById('fileupload');
var storage = firebase.storage();

var gsReference = storage.refFromURL('gs://bucket/user-images/thouti.maneesh43@gmail.com.png');
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
      alert("user not logged in");
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
      if(userinfo.displayName!=null){
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
  document.querySelector('.loader').classList.add("hide");
  document.querySelector('.wrapper').classList.toggle("hide");

  // console.log(datauser.data());
  userdata = datauser.data();
  console.log(userdata);
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

  if(userinfo.providerData[0].providerId=="google.com"){
document.querySelector(".imageholder img").src = userinfo.photoURL;
  }else{

    const storageRef = storage.ref('user-images/'+userinfo.email);
    storageRef.getDownloadURL()
    .then((url) => { 
      document.querySelector(".imageholder img").src = url;
    })
    .catch((error) => {
      // Handle any errors
    });

  }
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
    console.log('files', files[0]); // Printing the file object to the console.
    uploadfile(storageRef,files);
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

