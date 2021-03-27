let objectadata={};
let latitude=0;
let longitude=0;
let userpriority=0;
let useremail=null;
let userdataobject;



// check if user is logged in

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // alert("success");
      console.log(user);
      useremail=user.email;
    } else {
      // No user is signed in.
    //   alert("user not logged in");
    toaster("USer not logged in","darkred");
      window.location.replace('../index.html');
    }
  });

  console.log(useremail);

//   var db = firebase.firestore();
//   var docRef = db.collection("userdata").doc(useremail);
//   docRef.get().then((doc) => {
//     if (doc.exists) {
//       // console.log("Document data:", doc.data());
//       setuserdata(doc);
//     } else {
      
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }});


//  Geolocation api
let locatevalue = document.querySelector("#locationtext");
document.querySelector('#locateme').addEventListener('click', getLocation);

function getLocation() {
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
        locatevalue.value = "lat:" + latitude + "lon" + longitude;

        //  status.textContent = '';
        //  mapLink.href = `https:www.openstreetmap.org#map=18${latitude}${longitude}`;
        //  mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
        // alert("You have denied access to location!");
        toaster("Location denied by the user","darkred");

    }

    if (!navigator.geolocation) {
        // alert("Geolocation API not supported");
        toaster("Geolocation API not supported by the browser");
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

}
document.querySelector('#diseaseinfoprevious').addEventListener('change', () => {
    let confirmdec = window.confirm("do you want to track your second dose");
    if (confirmdec == true) {
        console.log(confirmdec);
    }
})





class Userobjectdata{
    constructor(username,useremail,userage,usersex,userischronic,userhasprevious,latitude,longitude){
        this.username=username,
        this.useremail=useremail,
        this.userage=userage,
        this.usersex=usersex,
        this.userischronic=userischronic,
        this.userhasprevious=userhasprevious,
        this.latitude=latitude,
        this.longitude=longitude
    }
}


document.querySelector('.vaccine_register_button').addEventListener('click', () => {

    var db = firebase.firestore();





    let username=document.querySelector('#name').value;
    let userage=document.querySelector('#age').value;
    console.log(userage);

    let usersex=document.querySelector('#sex').value;
    let userischronic=document.querySelector('#diseaseinfo').value;
    let userhasprevious=document.querySelector('#diseaseinfoprevious').value;



    //  let inputs = document.querySelectorAll('.input');
    //   console.log(inputs);
    //  inputs.forEach(element => {
    //      console.log(element.value);
    //      a['username']=element.value
    //  });


if((is_empty(username)) && is_empty(userage)){

toaster("All fields must be filled to complete registration.","darkred")
}else{
let userdataobject=new Userobjectdata(username,useremail,userage,usersex,userischronic,userhasprevious,latitude,longitude);
    let priorityvalue=prioritycalc();
    console.log(priorityvalue);

     db.collection("userdata").doc(useremail).set({
     email:useremail,    
     name: username,
     age:userage,
     sex:usersex,
     userlocationlatitude:latitude,
     userlocationlongitude:longitude,
     userischronic:userischronic,
     userhasprevious:userhasprevious,
     priority:priorityvalue,
     isadmin:"false",
     created:firebase.firestore.FieldValue.serverTimestamp()
     },{merge:true})
     .then(() => {
     console.log("Document successfully written!");
    //  alert("success")
    toaster("Registered Succesfully","lightgreen");
     })
     .catch((error) => {
     console.error("Error writing document: ", error);
     });

    function prioritycalc(){
        console.log("update")
        console.log(userdataobject);
    if(userdataobject.userage>=55){
        userpriority+=1;

        console.log(userpriority);
    }if(userdataobject.usersex==="Female"){
        userpriority+=1;
    }if(userdataobject.userischronic==="yes"){
        userpriority+=1;
    }if(userdataobject.userhasprevious==="yes"){
        userpriority+=1;
    }
    console.log(userpriority);
return userpriority/4;
console.log(userpriority);
}
}
});



//Event Handler for menu

//From W3 Schools Dropdown with click


document.querySelector('.dropbtn i').addEventListener('click',()=>{

    document.getElementById("myDropdown").classList.toggle("show");



})


//Window Event Handlers


window.addEventListener('click',(event)=>{

    if (!event.target.matches('.dropbtn i')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }



})


// Signout

document.querySelector('#signouthere').addEventListener('click',()=>{
    firebase.auth().signOut().then(() => {
    //   alert("signed out");
    toaster("signed out successfully");
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    //   alert("sign-out failed");
    toaster("Failed to signout");
    });
    
  })