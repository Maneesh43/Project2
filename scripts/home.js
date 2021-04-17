

let sessstorage = window.sessionStorage;
let userrname = document.querySelector('.username');
let vaccinecenter = document.querySelector('.vaccinecenter');
let vaccinedate = document.querySelector('.vaccinedate');
let userdata = null;
let useremail;


// Authentication event listener
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    //If user login is successfull disabling the loader and showing body content
    useremail = user.email;
    document.querySelector(".loader").classList.toggle("hide");
    document.querySelector(".wrapperhome").classList.toggle("hide");
    // console.log(user);
    // Loading user data from database
    loadinfo(user);
    is_doc_available(useremail);
  } else {
  //  If user not authenticated redirecting him to index page
    window.location.replace('../index.html');
  }
});


// Getting user data from database.

function getuserdatafromdb(userdata){
  // console.log(userdata);

  // Converting date to Dateobject
  let dt=userdata.created.toDate();
  // console.log(new Date(dt.setDate(dt.getDate()+7)));
  // Getting date after 7 days 
  let updateddate=new Date(dt.setDate(dt.getDate()+7));
  vaccinedate.innerHTML = `<b style="margin:5px 0 5px 0">Vaccination date:</b> <p style="justify-self:center;margin:5px 0 5px 0">${updateddate.toDateString()} </p>`;
}

// Signout
document.querySelector('#signouthere').addEventListener('click', () => {
  signout();
  window.sessionStorage.clear();

})

// Loads userdata into the page
function loadinfo(user) {
  // console.log(user);
  if (sessstorage.getItem("is_doc") && (sessstorage.getItem("is_doc_data"))) {

    // Parsing string to json
    userdata = JSON.parse(sessstorage.getItem("is_doc_data"));

    userrname.innerHTML = `<p style="grid-column:1/-1;justify-self:center;margin-bottom:5px";>${userdata.name}</p>`;
    vaccinecenter.innerHTML = `<b style="margin:5px 0 5px 0">Vaccine Center:</b> <p style="justify-self:center;margin:5px 0 5px 0">${userdata.vaccinecenter}<a class="navigateuser"><i class="fas fa-location-arrow direction" style="margin-left:5px;"></i></a></p>`;
    console.log(document.querySelector('.registercard'));

    // Hiding register card if user has already registered.
    document.querySelector('.registercard').classList.add("hidelabel");

     

    // Adding maps api to navigate user to his vaccination center.
    document.querySelector(".navigateuser").addEventListener("click", () => {
      let alert = window.confirm("Proceeding will take you to an external app.");
      let attributedata = document.querySelector('.navigateuser');
      // Setting attributes for anchor tag to enable navigation to the destination.
      if (alert && ((attributedata.previousSibling.textContent).split(" ").join("")).toLowerCase() !== "notselected") {
        attributedata.setAttribute("href", `https://www.google.com/maps/dir/?api=1&destination=${attributedata.previousSibling.textContent}`);
      } else {

        toaster("Location not set.")
      }
    })


  } else {
    // User has not registered.
    userrname.innerHTML = `<p style="grid-column:1/-1;justify-self:center";>${getUsernameFromEmail(user.email)}</p>`;
    vaccinedate.innerHTML = ``;


  }
}

// PWA Initialization code
document.addEventListener("DOMContentLoaded", () => {
  pwainit('../sw.js');
})


//Nav menu handler
document.querySelector('.dropbtn').addEventListener("click", openNav);
document.querySelector('.closebtn').addEventListener("click", closeNav);







// PWA Install option in nav bar

var deferredPrompt;

// Before install event 
window.addEventListener('beforeinstallprompt', function (e) {
  deferredPrompt = e;
  showAddToHomeScreen(deferredPrompt);
  // console.log(deferredPrompt);
});

// Making banner visible if user didnt install PWA and PWA is supported by the browser.
function showAddToHomeScreen() {
  var a2hsBtn = document.querySelector(".pwabanner");
  //  console.log(a2hsBtn);
  a2hsBtn.style.display = "block";
  //  a2hsBtn.style.justifyContent="space-around"; 
  a2hsBtn.addEventListener("click", addToHomeScreen);
}


// Showing PWA Install prompt
function addToHomeScreen() {
  var a2hsBtn = document.querySelector(".pwabanner");
  a2hsBtn.style.display = 'none'; // Show the prompt 
  deferredPrompt.prompt(); // Wait for the user to respond to the prompt 
  deferredPrompt.userChoice.then(function (choiceResult) {
    if (choiceResult.outcome === 'accepted') {
      // console.log('User accepted the A2HS prompt'); 
    }
    else {
      // 'User dismissed the A2HS prompt; 
    }
    deferredPrompt = null;
  });
}





