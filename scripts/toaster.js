function toaster(errormsg){
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    x.textContent=errormsg;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }