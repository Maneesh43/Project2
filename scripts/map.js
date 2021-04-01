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
  
  
  document.querySelector(".backbutton i").addEventListener("click",()=>{
    window.history.back();
  })
  


//   Map js

let map;
let infoWindow;
let request;
let service;
let markers = [];
let list = document.getElementById('list');
function initialize() {
    let center = new google.maps.LatLng(49.2578263, -123.1939441);
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
    locationButton.textContent = "Locate me";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

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
                    infoWindow.setContent("Yah! We found you");
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

    google.maps.event.addListener(map, 'rightclick', function (event) {
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

function callback(results, status) {
    console.log(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
            list.innerHTML += `<li><span> Name of centres : ${results[i].name}</span> <span><a href="#">LINK</a></span></li>`;
        }
    }
}

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

// function initAutocomplete() {
//     console.log('inside initAutocomplete');
// }