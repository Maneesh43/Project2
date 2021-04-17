let sessionstoragem=window.sessionStorage;
let userinfo;
var a1=[];
is_doc=false;
var counter=0;

// If user in session storage get his data from session storage
if(sessionstoragem.getItem("loginuser")){
    let loginuser=sessionstoragem.getItem("loginuser")
    // console.log(JSON.parse(loginuser));
    userinfo=JSON.parse(loginuser);
    // console.log(userinfo);
}else{


    // If user data doesn't exist in session storage get his data from database.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        //   console.log("user signed in");
          if(user){
              sessionstoragem.setItem("loginuser",JSON.stringify(user));
              userinfo=user;
          }
        } else {
          // No user is signed in.
        //   console.log("no user");
        // User not authenticated ask him to signin.
          window.location.replace("../index.html");
        }
      });
}
if(sessionstoragem.getItem("is_doc")){
    // alert("doc exists");
    // set is_doc to true if user data exists in session storage
    is_doc=true;
}else{
    // alert("doc doesn't exist");
    // Document doesn't exist 
}


// PWA Initialization
document.addEventListener("DOMContentLoaded",()=>{
    pwainit('../sw.js');
  })
  
  // sidenav
  document.querySelector('.dropbtn').addEventListener("click",openNav);
  document.querySelector('.closebtn').addEventListener("click",closeNav); 
  
  
  var deferredPrompt; 
  
//   Before install event listener for Service worker
  window.addEventListener('beforeinstallprompt', function (e) { 
    deferredPrompt = e; 
    showAddToHomeScreen(deferredPrompt);
    // console.log(deferredPrompt);
   }); 
  
//    If users browser supports pwa and before install event fired then show install pwa option in nav bar.
   function showAddToHomeScreen() { 
     var a2hsBtn = document.querySelector(".pwabanner"); 
    //  console.log(a2hsBtn);
     a2hsBtn.style.display = "block";
    //  a2hsBtn.style.justifyContent="space-around"; 
     a2hsBtn.addEventListener("click", addToHomeScreen); 
    } 
  
    // Show install pwa prompt
    function addToHomeScreen() { 
      var a2hsBtn = document.querySelector(".pwabanner");  
      a2hsBtn.style.display = 'none'; // Show the prompt 
      deferredPrompt.prompt(); // Wait for the user to respond to the prompt 
      deferredPrompt.userChoice .then(function(choiceResult){ 
        if (choiceResult.outcome === 'accepted') { 
        //   console.log('User accepted the A2HS prompt'); 
        } 
        else 
        { 
        //   console.log('User dismissed the A2HS prompt'); 
        } 
        deferredPrompt = null; 
      }); } 
  
      // Signout
      document.querySelector('#signouthere').addEventListener('click',()=>{
        signout();
        window.sessionStorage.clear();
        
      })
  
// Back button
  document.querySelector(".backbutton i").addEventListener("click",()=>{
    window.history.back();

    // Go to previous page
  })
  


//Map js
// Map Initialization and rendering

let map;
let infoWindow;
let request;
let service;
let lat=null;
let long=null;
let markers = [];
let maploc=[];
let list = document.getElementById('list');
function initialize() {
    getlocation();
    //initial view
    function getlocation(){
        if(sessionstoragem.getItem("latitude")){
        lat=sessionstoragem.getItem("latitude");
        long=sessionstoragem.getItem("longitude");
        }else{
            lat="not available";
            // console.log(lat);
            lat="49.059676";
            long="-123.090657"
            document.querySelector("#list").innerHTML=`<li><p style="grid-column:1/-1;text-align
            :center">Not Registered for vaccine,<a href="vaccine_register.html">Register here</a>`
        }
    }
    let center = new google.maps.LatLng(lat,long);
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13,
    });

    request = {
        location: center,
        radius: 3000,
        types: ['hospital']
    };
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);


    //locate me button code
    locationButton.addEventListener('click', () => {
        list.innerHTML = "";
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat : position.coords.latitude,
                        lng : position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("You are here.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        }else{
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    //error handle
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
      }


    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);


    //code to get the list below map
    google.maps.event.addListener(map, 'click', function (event) {
        map.setCenter(event.latLng)
        clearResults(markers)

        let request = {
            
            location: event.latLng,
            radius: 3000,
            types: ['hospital']
        };
        service.nearbySearch(request, callback);
    });
}


//code to set marker
function callback(results, status) {
    var db=firebase.firestore();
    // console.log(results)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
            // console.log(results[i]);
            var lat=results[i].geometry.location.lat();
            var lng=results[i].geometry.location.lng();
            maploc.push([lat,lng]);
            list.innerHTML += `<li class="vaccinecenter"><span>${results[i].name}</span> <span><button type="button" class="button mapbutton">Book appointment</button></span><span class="center"></span><span></li>`;
          
               

            
            document.querySelectorAll(".mapbutton").forEach(function(item){
                item.addEventListener("click",(v)=>{
                    // console.log(v);
                    // console.log(v.path[2].childNodes[0].innerText);
                    vaccinecentername=v.path[2].childNodes[0].innerText;
                    // console.log(userinfo);
                    // console.log(results);
                    results.forEach(function h(item){
                        // console.log(item);
                    if(item.name==v.path[2].childNodes[0].innerText){
                        // console.log((item.name).localeCompare(v.path[2].childNodes[0].innerText));
                        // console.log(item.name);
                        // console.log(v.path[2].childNodes[0].innerText);
                            // console.log(item);
                            sessionstoragem.setItem("vaccinecenter",item.name);
                            var vaccinecenterupdate = db.collection("userdata").doc(userinfo.email);

                    return vaccinecenterupdate.update({
                        vaccinecenter:vaccinecentername,
                    })
                        .then(() => {
                            // console.log("Document successfully updated!");
                            toaster("Appointement booked!","lightgreen");
                            window.location.href="../pages/home.html";
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                            window.location.replace("vaccine_register.html");

                            
                        });
    
                        }else{
                            // console.log("item did not match");
                        }

                       
                    })
                    
                })
            })
        }
       
    }
}


// code to create marker
function createMarker(place) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });

    return marker;
}

function clearResults(markers) {
    for (let m in markers) {
        markers[m].setMap(null);
    }
    markers = [];
    list.innerHTML = "";
}

google.maps.event.addDomListener(window, 'load', initialize);
// Initializing maps 










 