let objectadata={};
let latitude=0;
let longitude=0;
let userpriority=0;
let useremail=null;


// check if user is logged in

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // alert("success");
      console.log(user.email);
      useremail=user.email;
    } else {
      // No user is signed in.
      alert("user not logged in");
      window.location.replace('../pages/login.html');
    }
  });

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
        alert("You have denied access to location!");

    }

    if (!navigator.geolocation) {
        alert("Geolocation API not supported");
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





class Objectdata{
    constructor(useremail,username,userage,usersex,latitude,longitude,userischronic,userhasprevious){
        this.useremail=useremail,
        this.username=username;
        this.userage=userage;
        this.usersex=usersex;
        this.userlocationlatitude=latitude;
        this.userlocationlongitude=longitude;
        this.userischronic=userischronic;
        this.userhasprevious=userhasprevious;
    }
}


document.querySelector('.vaccine_register_button').addEventListener('click', () => {

    var db = firebase.firestore();

    let username=document.querySelector('#name').value;
    let userage=document.querySelector('#age').value;
    let usersex=document.querySelector('#sex').value;
    let userischronic=document.querySelector('#diseaseinfo').value;
    let userhasprevious=document.querySelector('#diseaseinfoprevious').value;

    let userdataobject=new Objectdata(username,userage,usersex,latitude,longitude,userischronic,userhasprevious);
    console.log(userdataobject);

    //  let inputs = document.querySelectorAll('.input');
    //   console.log(inputs);
    //  inputs.forEach(element => {
    //      console.log(element.value);
    //      a['username']=element.value
    //  });




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
     alert("success")
     })
     .catch((error) => {
     console.error("Error writing document: ", error);
     });

    function prioritycalc(){

    if(userdataobject.userage>=55){
        userpriority+=1;
    }else if (userdataobject.usersex==="Female"){
        userpriority+=1;
    }else if(userdataobject.userischronic=="Yes"){
        userpriority+=1;
    }else if(userdataobject.userhasprevious=="Yes"){
        userpriority+=1;
    }
    console.log(userpriority);
return userpriority/4;
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
      alert("signed out");
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      alert("sign-out failed");
    });
    
  })