let objectadata = {};
let latitude = 0;
let longitude = 0;
let userpriority = 0;
let useremail = null;
let userdataobject;
let sessstorage = window.sessionStorage;
is_doc = sessstorage.getItem("is_doc");
var db = firebase.firestore();

// console.log(sessstorage.getItem("email"));

// check if user is logged in

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // alert("success");
        console.log(user);
        useremail = user.email;
    } else {
        // No user is signed in.
        //   alert("user not logged in");
        toaster("User not logged in");
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
        // locatevalue.value = "lat:" + latitude + "lon" + longitude;
        let location = reverse_geocode(latitude, longitude).then((values) => {
            locatevalue.value = values.results[0].formatted_address;
            console.log(values);
        });
        // console.log(reverse_geocode(latitude,longitude).then(function(value){
        //     console.log(value);
        // }));

        //  status.textContent = '';
        //  mapLink.href = `https:www.openstreetmap.org#map=18${latitude}${longitude}`;
        //  mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
        // alert("You have denied access to location!");
        toaster("Location denied by the user");

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


console.log(latitude);


class Userobjectdata {
    constructor(username, useremail, userage, usersex, userischronic, userhasprevious, latitude, longitude) {
        this.username = username,
            this.useremail = useremail,
            this.userage = userage,
            this.usersex = usersex,
            this.userischronic = userischronic,
            this.userhasprevious = userhasprevious,
            this.latitude = latitude,
            this.longitude = longitude
    }
}


document.querySelector('.vaccine_register_button').addEventListener('click', () => {



    if (ss6.value != null) {
        function geolocate() {
            let a = geocode((ss6.value.toString())).then((value) => {
                latitude = value.lat;
                console.log(latitude);
                longitude = value.lng;
                console.log(value);
                var locationupdate = db.collection("userdata").doc(useremail);

                // Set the "capital" field of the city 'DC'
                return locationupdate.update({
                    userlocationlatitude: latitude,
                    userlocationlongitude:longitude
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });


            });

        }
        geolocate();

    }






    let username = document.querySelector('#name').value;
    let userage = document.querySelector('#age').value;
    console.log(userage);

    let usersex = document.querySelector('#sex').value;
    let userischronic = document.querySelector('#diseaseinfo').value;
    let userhasprevious = document.querySelector('#diseaseinfoprevious').value;



    //  let inputs = document.querySelectorAll('.input');
    //   console.log(inputs);
    //  inputs.forEach(element => {
    //      console.log(element.value);
    //      a['username']=element.value
    //  });
    let confirmreg;
    let register_stat
    if ((is_empty(username)) && is_empty(userage)) {

        toaster("All fields must be filled to complete registration.")
        register_stat = false;
    } else {
        register_stat = true
    }
    if (is_doc) {
        confirmreg = window.confirm("Proceeding will rewrite your registration data");
    }
    if (is_doc == false) {
        confirmreg = true;
    }
    if (latitude == 0 && longitude == 0 && ss6.value == 0) {
        toaster("Please enter your location");
        register_stat = false;
    }

    if (confirmreg == true && register_stat == true) {
        let userdataobject = new Userobjectdata(username, useremail, userage, usersex, userischronic, userhasprevious, latitude, longitude);
        let priorityvalue = prioritycalc();
        console.log(priorityvalue);

        console.log(latitude);

        //////////////////////////////



        ///////////////////////////////////////////////////




        db.collection("userdata").doc(useremail).set({
            email: useremail,
            name: username,
            age: userage,
            sex: usersex,
            userlocationlatitude: latitude,
            userlocationlongitude: longitude,
            userischronic: userischronic,
            userhasprevious: userhasprevious,
            priority: priorityvalue,
            isadmin: "false",
            created: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })
            .then(() => {
                console.log("Document successfully written!");
                //  alert("success")
                toaster("Registered successfully", "lightgreen");
                setTimeout(() => {
                    // window.location.assign("/pages/home.html");
                }, 800)

            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        function prioritycalc() {
            console.log("update")
            console.log(userdataobject);
            if (userdataobject.userage >= 55) {
                userpriority += 1;

                console.log(userpriority);
            } if (userdataobject.usersex === "Female") {
                userpriority += 1;
            } if (userdataobject.userischronic === "yes") {
                userpriority += 1;
            } if (userdataobject.userhasprevious === "yes") {
                userpriority += 1;
            }
            console.log(userpriority);
            return userpriority / 4;
            console.log(userpriority);
        }
    }
    else if (confirmreg == false) {
        window.location.href = "../pages/home.html";
    }
});



//Event Handler for menu

//From W3 Schools sidenav
document.querySelector('.dropbtn').addEventListener("click", openNav);
document.querySelector('.closebtn').addEventListener("click", closeNav);



// Signout

document.querySelector('#signouthere').addEventListener('click', () => {

    signout();
})

// Autocomplete

const inputField = document.getElementById("locationtext");

const options = {
    componentRestrictions: { country: "ca" },
    fields: ["address_components", "geometry", "icon", "name"],
    // origin: center,
    // strictBounds: false,
    types: ["address"],
};
const autocomplete = new google.maps.places.Autocomplete(inputField, options);

// geocoding api



// PWA init
document.addEventListener("DOMContentLoaded", () => {
    pwainit('../sw.js');
})



// Session storage;
let ss1 = document.querySelector('#name');
let ss2 = document.querySelector('#age');
let ss3 = document.querySelector('#sex');
let ss4 = document.querySelector('#diseaseinfo');
let ss5 = document.querySelector('#diseaseinfoprevious');
let ss6 = document.querySelector('#locationtext')

if ((sessstorage.getItem("username")) || (sessstorage.getItem("userage")) || (sessstorage.getItem("usersex")) || (sessstorage.getItem("userdiseaseinfo")) || (sessstorage.getItem("userdiseaseinfoprevious")) || (sessstorage.getItem("usergeolocation"))) {
    ss1.value = sessstorage.getItem("username");
    ss2.value = sessstorage.getItem("userage");
    ss3.value = sessstorage.getItem("usersex");
    ss4.value = sessstorage.getItem("userdiseaseinfo");
    ss5.value = sessstorage.getItem("userdiseaseinfoprevious");
    ss6.value = sessstorage.getItem("usergeolocation");
}





[ss1, ss2, ss3, ss4, ss5, ss6].forEach(item => {
    item.addEventListener("change", () => {


        sessstorage.setItem("username", ss1.value);
        sessstorage.setItem("userage", ss2.value);
        sessstorage.setItem("usersex", ss3.value);
        sessstorage.setItem("userdiseaseinfo", ss4.value);
        sessstorage.setItem("userdiseaseinfoprevious", ss5.value);
        sessstorage.setItem("usergeolocation", ss6.value);

    })
})


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
    deferredPrompt.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        }
        else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
}

// Back button
document.querySelector('.backbutton i').addEventListener("click",()=>{
    window.history.back();
})
