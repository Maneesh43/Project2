// Creating a sessionstorage instance
sessionstorages = window.sessionStorage;






// Toaster code
function toaster(errormsg, bgcolor, fgcolor) {
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";
  // When called setting toaster visibility status to show. 

  // After 3 seconds, remove the show class from DIV
  x.textContent = errormsg;
  x.style.backgroundColor = bgcolor;
  x.style.color = fgcolor;
  // Auto dismiss toaster after 3 seconds.
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

// Username extractor
// Extracts username from e-mail address
function getUsernameFromEmail(email) {
  var domainArray = email.split('@')
  var domain = domainArray[domainArray.length - 1]
  var reverseEmail = email.split('').reverse().join('');
  var reverseDomain = domain.split('').reverse().join('');
  var backwardUsername = reverseEmail.replace(reverseDomain + '@', '')
  var username = backwardUsername.split('').reverse().join('');
  return username;
}



// Validator
// Validates email and converts to lowercase.

function is_email(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // console.log(re.test(String(email)));
  // console.log(email);

  return re.test(String(email).toLowerCase());

}


// Returns true if given string length is <= 0
function is_empty(length) {


  if ((length.toString()).length >= 1) {

    return false;
  } else {
    return true;
  }

}


// checking if valid image
// Validates image
// Checks if image is valid

function validateAndUpload(input) {


  var image = new Image();

  image.onload = function () {
    if (this.width) {
      /
    };

   
  }
}

// Signout
function signout() {
  window.sessionStorage.clear();
  firebase.auth().signOut().then(() => {
    // alert("signed out");
    toaster("Signed Out!", "lightgreen");
    window.location.replace("../index.html");
  
    var deletingAll = browser.history.deleteAll()
  // Deleting all session storage entries
    window.sessionStorage.clear();
  }).catch((error) => {
    
    toaster("Failed to signout");
  });
}


// PWA Initialization code
// Registers PWA

function pwainit(a) {
  // does the browser support service workers?
  if ('serviceWorker' in navigator) {
    // fires when the service worker is ready
    navigator.serviceWorker.ready.then(reg => {
      // we have an active service worker working for us
    

    });
    // then register our service worker
    navigator.serviceWorker.register(a, { scope: '/' })
      .then(function (reg) {
        // display a success message
        // console.log(`Service Worker Registration (Scope: ${reg.scope})`);
      })
      .catch(function (error) {
        // display an error message
        // console.log(`Service Worker Error (${error})`);
      });
  } else {
    // happens when the app isn't served over a TLS connection (HTTPS)
    console.warn('Service Worker not available');
  }
}

// DOC exists in table.

// Checks if user has already registered
// if yes,writing his data into session storage 
function is_doc_available(a) {
  var db = firebase.firestore();

  let docRef = db.collection("userdata").doc(a);
  // console.log("hi");
  docRef.get().then((doc) => {
    if (doc.exists) {
      is_doc_updated(a);
      sessionstorages.setItem("is_doc", true);
      sessionstorages.setItem("is_doc_data", JSON.stringify(doc.data()));
      sessionstorages.setItem("latitude", doc.data().userlocationlatitude);
      sessionstorages.setItem("longitude", doc.data().userlocationlongitude);
      // console.log(doc);
    }
  }, (error) => {
    // console.log(error);
    // console.log("doc not available");
  });
}


//Nav menu handler
function openNav() {
  document.getElementById("mysidenav").style.width = "72%";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mysidenav").style.width = "0";
}


// Geocoding Address to lat and longitudes


// Reverse Geocoding lat and longitudes to address.
async function reverse_geocode(latitude, longitude) {
  const KEY = "AIzaSyD8wMTakMDfBHIHwKunjPkRV5D1Yzmsjhs";
  // const LAT = "49.2742";
  // const LNG = "-123.1547";

  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;
  let resp = await fetch(url).then(response => response.json()).then((data) => {
    // console.log(data);
    return data;
  })
  // return resp;
  // console.log(resp);
  // console.log(resp);
  return resp;


}

// Function which converts address to latitudes and longitudes
async function geocode(location) {
  let response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: 'AIzaSyD8wMTakMDfBHIHwKunjPkRV5D1Yzmsjhs',
    }
  })
    .then(function (response) {
      let lat = response.data.results[0].geometry.location;
      //     console.log(response);
      return lat;

    }).catch((error) => {
      // console.log(error);
    })

  // console.log(response);
  return response;
}


// Snapshot listener to check if userdata has changed.
// If changed notify and update /set that data in the sessionstorage.
function is_doc_updated(a) {
  // console.log(a);
  var db = firebase.firestore();
  db.collection("userdata").doc(a)
    .onSnapshot((doc) => {

      // console.log("Current data: ", doc.data());
      sessionstorages.setItem("is_doc_data", JSON.stringify(doc.data()));
      sessionstorages.setItem("time_created", doc.data().created.toDate().toLocaleDateString())
      sessionstorages.setItem("latitude", doc.data().userlocationlatitude);
      sessionstorages.setItem("longitude", doc.data().userlocationlongitude);
      sessionstorages.setItem("user_registered_date", doc.data().created.toDate().toDateString());
      loadinfo();
      getuserdatafromdb((doc.data()));
    });
}

