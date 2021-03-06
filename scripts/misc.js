

sessionstorages = window.sessionStorage;




// Toaster code
function toaster(errormsg, bgcolor, fgcolor) {
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  x.textContent = errormsg;
  x.style.backgroundColor = bgcolor;
  x.style.color = fgcolor;
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

// Username extractor
function getUsernameFromEmail(email) {
  var domainArray = email.split('@')
  var domain = domainArray[domainArray.length - 1]
  var reverseEmail = email.split('').reverse().join('');
  var reverseDomain = domain.split('').reverse().join('');
  var backwardUsername = reverseEmail.replace(reverseDomain + '@', '')
  var username = backwardUsername.split('').reverse().join('');
  return username;
}



// Email address Validator

function is_email(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // console.log(re.test(String(email)));
  // console.log(email);

  return re.test(String(email).toLowerCase());

}


// Checks if string is empty.
function is_empty(length) {


  if ((length.toString()).length >= 1) {

    return false;
  } else {
    return true;
  }

}


// checking if valid image
function validateAndUpload(input) {
  // var URL = window.URL || window.webkitURL;
  // var file = input.files[0];

  var image = new Image();

  image.onload = function () {
    if (this.width) {
      //  console.log('Image has width, I think it is real image');
      //TODO: upload to backend
    };

    // image.src = URL.createObjectURL(file);
  }
}

// Signout
function signout() {
  window.sessionStorage.clear();
  firebase.auth().signOut().then(() => {
    // alert("signed out");
    toaster("Signed Out!", "lightgreen");
    // Sign-out successful.
    window.location.replace("../index.html");
    // alert("sign out");
    var deletingAll = browser.history.deleteAll()
    // console.log(browser.history());
    window.sessionStorage.clear();
  }).catch((error) => {
    // An error happened.
    // alert("sign-out failed");
    toaster("Failed to signout");
  });
}


// PWA initialization
function pwainit(a) {
  // does the browser support service workers?
  if ('serviceWorker' in navigator) {
    // fires when the service worker is ready
    navigator.serviceWorker.ready.then(reg => {
      // we have an active service worker working for us
      // console.log(`Service Worker ready (Scope: ${reg.scope})`);
      // do something interesting, if you want...

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
// Converting address to latitudes and longitudes
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
      // hello(lat);

    }).catch((error) => {
      // console.log(error);
    })

  // console.log(response);
  return response;
}


// Snapshot listener to check if user data is updated.
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

