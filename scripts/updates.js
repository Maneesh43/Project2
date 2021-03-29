// Uses diseases.sh open api for all the data presented here.
// Updated every 10 minutes.
dropdownfunc();

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
setInterval(()=>{
    gettodaysdata();
},600000)


function gettodaysdata(){
// getting todays cases
    let a=fetchdata("https://disease.sh/v3/covid-19/all").then(function(value){
    console.log(value);
    document.querySelector(".cardstoday").innerHTML=`<p>Total covid-19 cases till date: ${(value.cases).toLocaleString()} </p>
    <p>Cases Today: ${value.todayCases}</p>
    <p>Cases Active: ${value.active}</p>
    <p>People Recovered: ${value.recovered}</p>
    <p>People recovered today: ${value.todayRecovered}</p>
    <p>Total number of tests till date: ${value.tests}</p>`
})
}

function vaccine_coverage(){
    let select =document.querySelector("#selectcountry");
    let vaccinecontainer=document.querySelector(".cardsvaccine");
    let url ="https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1"
    let a=fetchdata(url).then(function(value){
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

// Drop down function


