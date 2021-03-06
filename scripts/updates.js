// Uses diseases.sh open api for all the data presented here.
// Covid 19 statistics from worldometer and is Updated every 10 minutes.



// Async function to get data from disease.sh api
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
    // console.log(value);
    document.querySelector(".cardstoday").innerHTML=`<table><caption><h2 style="font-size:1.4rem";>COVID-19 statistics (Worldwide)</h2></caption><tr><td>Total covid-19 cases:</td><td> ${(value.cases).toLocaleString()} </td></tr>
    <tr><td>Cases Today:</td> <td>${value.todayCases.toLocaleString()}</td></tr>
    <tr><td>Cases Active: </td><td>${value.active.toLocaleString()}</td></tr>
    <tr><td>People Recovered:</td> <td>${value.recovered.toLocaleString()}</td></tr>
    <tr><td>People recovered today:</td> <td>${value.todayRecovered.toLocaleString()}</td></tr>
    <tr><td>Total number of tests:</td> <td>${value.tests.toLocaleString()}</td></tr>
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
                        paradata.innerHTML=`
                        Total vaccines administered in <b>${element.country}</b>  are <b>${element.timeline[x].toLocaleString()}</b>`
                    }
                   
                }
            });
        })
    })
}

// Vaccine Candidates data
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
                // console.log(item);
               if(this.value==item.candidate){
                   container.innerHTML=`<table>
                   <tbody>
                   <tr><td><b>Candidate</b>
                   </td>
                   <td>${item.candidate}</td>
                   </tr>


                   <tr><td><b>Mechanism</b>
                   </td>
                   <td>${item.mechanism}</td>
                   </tr>


                   <tr><td><b>Sponsors</b>
                   </td>
                   <td>${item.sponsors}</td>
                   </tr>


              

                   </tbody>
                   
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
//   console.log(deferredPrompt);
 }); 

 function showAddToHomeScreen() { 
   var a2hsBtn = document.querySelector(".pwabanner"); 
//    console.log(a2hsBtn);
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


    
// signout
    document.querySelector('#signouthere').addEventListener('click',()=>{
        signout();
        
      })
    

    //   Back button
    document.querySelector('.backbutton i').addEventListener("click",()=>{
        window.history.back();
    })