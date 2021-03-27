
// Toaster 

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



  // Validator
  
function is_email(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(re.test(String(email)));
 
  return re.test(String(email).toLowerCase());

}

function is_empty(length){


  if((length.toString()).length>=1){

      return false;
  }else{
      return true;
  }

}


// checking if valid image
function validateAndUpload(input){
  // var URL = window.URL || window.webkitURL;
  // var file = input.files[0];

      var image = new Image();

      image.onload = function() {
          if (this.width) {
               console.log('Image has width, I think it is real image');
               //TODO: upload to backend
      };

      // image.src = URL.createObjectURL(file);
  }
}