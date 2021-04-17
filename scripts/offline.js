
// JS for offline page
function toaster(errormsg,bgcolor,fgcolor){
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  x.textContent=errormsg;
  x.style.backgroundColor=bgcolor;
  x.style.color=fgcolor;
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}



// Checking if browser is online
document.querySelector("#retry").addEventListener("click",()=>{

  // window.location.replace("home.html");
  // console.log(navigator.onLine);
(navigator.onLine)? window.location.replace("../index.html") : toaster("you are offline");

})