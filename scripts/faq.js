// backbutton
document.querySelector('.backbutton i').addEventListener("click",()=>{
    window.history.back();
})


// PWA banner


var deferredPrompt; 

window.addEventListener('beforeinstallprompt', function (e) { 
  deferredPrompt = e; 
  showAddToHomeScreen(deferredPrompt);
  console.log(deferredPrompt);
 }); 

 function showAddToHomeScreen() { 
   var a2hsBtn = document.querySelector(".pwaa"); 
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
      window.sessionStorage.clear();
      
    })


    // PWA

document.addEventListener("DOMContentLoaded",()=>{
    pwainit('../sw.js');
  })
  
  // sidenav
  document.querySelector('.dropbtn').addEventListener("click",openNav);
  document.querySelector('.closebtn').addEventListener("click",closeNav); 
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // console.log(this.childNodes);

    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {

      panel.style.maxHeight = null;
      // console.log(this.childNodes);
      this.childNodes[1].style.transform="rotate(0deg)"
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      // console.log(this.childNodes[1]);
      this.childNodes[1].style.transform="rotate(90deg)"
      // this.childNodes[1].style.color="blue";
    }
  });
}
let f=document.querySelector(".faqb");
let p=document.querySelector(".precautionsb");
let m=document.querySelector(".mythsb");

let f1=document.querySelector(".faqs");
let p1=document.querySelector(".precautions");
let m1=document.querySelector(".myths");

p.addEventListener("click",()=>{
f1.style.display="none"
m1.style.display="none"
p1.style.display="block"
})

f.addEventListener("click",()=>{
  p1.style.display="none";
  m1.style.display="none";
  f1.style.display="block";
})

m.addEventListener("click",()=>{
  f1.style.display="none";
  p1.style.display="none";
  m1.style.display="block";
})



