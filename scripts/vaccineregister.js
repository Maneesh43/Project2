// Geolocation api
let locatevalue=document.querySelector("#locationtext");
document.querySelector('#locateme').addEventListener('click',getLocation);

function getLocation(){
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
        locatevalue.value="lat:"+latitude+"lon"+longitude;
    
        // status.textContent = '';
        // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      }
    
      function error() {
          alert("You have denied access to location!");

      }
    
      if(!navigator.geolocation) {
          alert("Geolocation API not supported");
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    
    }

document.querySelector('#chckbox').addEventListener('checked',()=>{
    alert("checked");
})






// document.querySelector('.buttonregister').addEventListener('click',()=>{

// var db = firebase.firestore();


// let user=document.querySelector('#username').value;
// let age=document.querySelector('#age').value;
// console.log(user);

// let priorityvalue=prioritycalc();

// db.collection("userdata").doc(user).set({
// name: user,
// age:age,
// priority:priorityvalue,
// },{merge:true})
// .then(() => {
// console.log("Document successfully written!");
// alert("success")
// })
// .catch((error) => {
// console.error("Error writing document: ", error);
// });

// })
// function prioritycalc(){
//     return "something for now"
// }