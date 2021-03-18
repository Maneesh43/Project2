let useremail=null;
var db = firebase.firestore();




document.addEventListener('DOMContentLoaded',()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          // alert("success");
        //   console.log(user);
          useremail=user.email;
          getuserprofile();
        } else {
          // No user is signed in.
          alert("user not logged in");
          window.location.replace('../pages/login.html');
        }
      });
    })



function getuserprofile(){

var docRef = db.collection("userdata").doc(useremail);

docRef.get().then((doc) => {
    if (doc.exists) {
        // console.log("Document data:", doc.data());
        setuserdata(doc);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
}

function setuserdata(datauser){
document.querySelector('.loader').classList.add("hide");
document.querySelector('.wrapper').classList.toggle("hide");

console.log(datauser.data());
userdata=datauser.data();
console.log(userdata.created.toDate().toDateString());

if((userdata.priority+1)>0){
    document.querySelector('.username p').textContent=userdata.name;
    document.querySelector('.useremail p').textContent=userdata.email;
    document.querySelector('.userage p').textContent=userdata.age;
    document.querySelector('.userhasregisteredforvaccine p').textContent="Yes";
    document.querySelector('.userregistered p').textContent=userdata.created.toDate().toDateString();

}
}