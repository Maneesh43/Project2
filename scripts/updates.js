// Uses diseases.sh open api for all the data presented here.
// Covid 19 statistics from worldometer and is Updated every 10 minutes.


// Async function 
async function fetchdata(a){
    let response=await fetch(a).then(response=>response.json()).then(function(myjson){
        return myjson;
    });
    // console.log(response);
    return response;
}

// set interval 10 minutes
gettodaysdata();
vaccine_coverage();
vaccinecandidates();
setInterval(()=>{
    gettodaysdata();
},600000)


function gettodaysdata(){
// getting todays cases
    let a=fetchdata("https://disease.sh/v3/covid-19/all").then(function(value){
    console.log(value);
    document.querySelector(".cardstoday").innerHTML=`<table><caption>Covid-19 Statistics</caption><tr><td>Total covid-19 cases till date:</td><td> ${(value.cases).toLocaleString()} </td></tr>
    <tr><td>Cases Today:</td> <td>${value.todayCases}</td></tr>
    <tr><td>Cases Active: </td><td>${value.active}</td></tr>
    <tr><td>People Recovered:</td> <td>${value.recovered}</td></tr>
    <tr><td>People recovered today:</td> <td>${value.todayRecovered}</td></tr>
    <tr><td>Total number of tests till date:</td> <td>${value.tests}</td></tr>
    </table>`
})
}
// Vaccine Related info is from from RAPS (Regulatory Affairs Professional Society). Specifically published by Jeff Craven at https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker and is updated every 24hrs.

function vaccine_coverage(){
    let select =document.querySelector("#selectcountry");
    let vaccinecontainer=document.querySelector(".cardsvaccine");
    let url ="https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1"
    let a=fetchdata(url).then(function(value){
        // console.log(value);
        value.forEach(element => {
        let option=document.createElement("option");
        option.text=element.country;
        option.value=element.country;
        select.add(option);
        // console.log(option);
        });
        const paradata=document.querySelector(".pdata");
        select.addEventListener('change',function(e){
            value.forEach(element => {
                if(this.value==element.country){
                    // console.log((element.timeline));
                    for (x in element.timeline){
                        paradata.textContent=`Vaccines administered today in ${element.country} are ${element.timeline[x].toLocaleString()}`
                    }
                   
                }
            });
        })
    })
}

// Vaccine Candidates
function vaccinecandidates(){
    let container=document.querySelector(".vaccinedata");
    let select=document.querySelector("#vaccinecandidate");
    url="https://disease.sh/v3/covid-19/vaccine"
    let arrayvaccine=[];
    let a=fetchdata(url).then(function(value){
        // console.log(typeof(value.data));
        let arrayvaccine=value.data;
        arrayvaccine.forEach(item=>{
            let option=document.createElement("option")
            option.text=item.candidate;
            select.add(option);
            option.value=item.candidate;

        })
        // console.log(typeof(arrayvaccine));
        select.addEventListener("change",function(){
            // console.log(this.value);
            // if(this.value==)
            arrayvaccine.forEach(item=>{
                console.log(item);
               if(this.value==item.candidate){
                   container.innerHTML=`<table><tr><th>Candidate</th><th>Mechanism</th><th>Sponsors</th><th>Trial Phase</th></tr>
                   <tr>       <td>${item.candidate}</td>  <td>${item.mechanism}</td>  <td>${item.sponsors}</td>  <td>${item.trialPhase}</td>  </tr>
                   
                   
                   </table>`
               }
            })
})
    })
}



// Sidenav
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

