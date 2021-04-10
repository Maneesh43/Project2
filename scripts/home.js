

let sessstorage=window.sessionStorage;
let userrname=document.querySelector('.username');
let vaccinecenter=document.querySelector('.vaccinecenter');
let vaccinedate=document.querySelector('.vaccinedate');
let userdata=null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // alert("success");
    // console.log(user.email);
    useremail=user.email;
    document.querySelector(".loader").classList.toggle("hide");
    document.querySelector(".wrapperhome").classList.toggle("hide");
    // console.log(user);
    loadinfo(user);
    is_doc_available(useremail);
  } else {
    // No user is signed in.
    // alert("user not logged in");
    console.log("User not signed in")
    window.location.replace('../index.html');
  }
});
// Signout
document.querySelector('#signouthere').addEventListener('click',()=>{
  signout();
  window.sessionStorage.clear();
  
})
function loadinfo(user){
  console.log(user);
 if(sessstorage.getItem("is_doc") && (sessstorage.getItem("is_doc_data"))){
  let a=sessionstorages.getItem("time_created");
  var date =new Date(a);    
  var newDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()+7);
  console.log(newDate);
  userdata=JSON.parse(sessstorage.getItem("is_doc_data"));
  // userrname.textContent=user.name;
  console.log(userdata);
  userrname.innerHTML=`<p style="grid-column:1/-1;justify-self:center;margin-bottom:5px";>${userdata.name}</p>`;
  vaccinecenter.innerHTML=`<b style="margin:5px 0 5px 0">Vaccine Center:</b> <p style="justify-self:flex-start;margin:5px 0 5px 0">${userdata.vaccinecenter}</p>`;
  vaccinedate.innerHTML=`<b style="margin:5px 0 5px 0">Vaccination date:</b> <p style="justify-self:flex-start;margin:5px 0 5px 0">${newDate.toDateString()}</p>`;
  console.log(userdata);

}else{
  // console.log(getUsernameFromEmail(authuser));
  console.log(user);
  userrname.innerHTML=`<p style="grid-column:1/-1;justify-self:center";>${getUsernameFromEmail(user.email)}</p>`;
  vaccinedate.innerHTML=``;


}
}
// PWA

document.addEventListener("DOMContentLoaded",()=>{
  pwainit('../sw.js');
})


 //Nav menu handler
 document.querySelector('.dropbtn').addEventListener("click",openNav);
 document.querySelector('.closebtn').addEventListener("click",closeNav);   







// document.querySelector('.ad2hs-prompt p').addEventListener("click",()=>{
//   document.querySelector('.ad2hs-prompt').style.display="none";
// })
// setTimeout(function(){
// document.querySelector('.ad2hs-prompt').style.display="none";
// },(5*1000));

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



    