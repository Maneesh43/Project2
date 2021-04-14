// let radiovalue;


// Back button
document.querySelector(".backbutton i").addEventListener("click",()=>{
  window.history.back();
})

// Sidenav
document.querySelector('.dropbtn').addEventListener("click",openNav);
document.querySelector('.closebtn').addEventListener("click",closeNav); 


// PWA banner


var deferredPrompt; 

window.addEventListener('beforeinstallprompt', function (e) { 
  deferredPrompt = e; 
  showAddToHomeScreen(deferredPrompt);
  // console.log(deferredPrompt);
 }); 

 function showAddToHomeScreen() { 
   var a2hsBtn = document.querySelector(".pwabanner"); 
  //  console.log(a2hsBtn);
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
        // console.log('User accepted the A2HS prompt'); 
      } 
      else 
      { 
        // console.log('User dismissed the A2HS prompt'); 
      } 
      deferredPrompt = null; 
    }); } 

    // Radiobox code
    // document.querySelectorAll(" input[type=radio] ").forEach(function(item){
    //   item.addEventListener("change",(item)=>{

    //     console.log(item.value);

    //   })
    // })
    // let ullist=document.querySelector(".selfassesslist");
    // let radios=document.querySelectorAll(' input[type=radio][name="assesment"] ');
    // radios.forEach(radio => radio.addEventListener('change', function(){
    //   if(radio.value=="yes"){
    //     radiovalue="yes";
    //   }else{
    // radiovalue="no";
    //   }
    // }
    //   ));

    //   document.querySelector("#btnassess").addEventListener("click",()=>{
    //     if(radiovalue=="yes"){
    //       console.log("yes");
    //     }else{
          
    //     }
    //   })